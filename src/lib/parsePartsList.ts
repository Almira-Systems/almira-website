// import { parse } from "csv-parse";
import fs, { promises as fsPromises } from "fs";
import { z } from "zod";
import Papa from "papaparse";
import exceljs from "exceljs";

const CURRENT_DIR = process.cwd();
const CSV_DIR = `${CURRENT_DIR}/public/shopify_csv_data`;

const shopifyBoolean = z
  .preprocess((val) => {
    if (typeof val === "string") {
      const trimmed = val.trim().toLowerCase();
      if (trimmed === "true") return true;
      if (trimmed === "false") return false;
      if (trimmed === "") return undefined;
    }
    return val;
  }, z.boolean().optional())
  .default(false);

// Helper to handle numbers that arrive as empty strings or dirty text from CSVs
const shopifyNumber = z.preprocess((val) => {
  if (typeof val === "string" && val.trim() === "") return undefined;
  return val;
}, z.coerce.number().optional());

const DataSchema = z.object({
  "Part #": z.string(),
  Description: z.string(),
  "Device Model #(s)": z.string(),
});

const metafieldKey =
  "Metafield: custom.models [list.metaobject_reference][handle]";
const ShopifyProductCsvSchema = z.object({
  // Product Identity & Core details
  Title: z.string().optional(), // Can be empty on variant rows
  "URL handle": z.string().optional(),
  "Body (HTML)": z.string().optional(),
  Description: z.string().optional(),
  Collection: z.string().optional(),
  Vendor: z.string().optional(),
  Type: z.string().optional(),
  Tags: z.string().optional(),
  Published: shopifyBoolean.default(true),
  "Product category": z.string().optional(),

  [metafieldKey]: z.string().optional(),

  "Image Src": z.string().url().or(z.literal("")).optional(),
  "Image position": shopifyNumber,
  "Image alt text": z.string().optional(),

  Status: z.enum(["active", "draft", "archived"]).default("active"),
});

async function parseCSVToData() {
  const partsFile = await fsPromises.readFile(`${CSV_DIR}/parts.csv`, "utf-8");

  const partsData = Papa.parse(partsFile, {
    header: true,
    skipEmptyLines: true,
  });

  const parsedParts = DataSchema.array().safeParse(partsData.data);

  if (!parsedParts.success) {
    console.error(parsedParts.error);
    throw new Error(parsedParts.error as any);
  }

  const workbook = new exceljs.Workbook();
  const partsSheet = workbook.addWorksheet("Parts");
  const metaSheet = workbook.addWorksheet("Metaobjects");

  partsSheet.columns = Object.entries(ShopifyProductCsvSchema.shape).map(
    ([key]) => ({
      header: key,
      key,
    }),
  );

  metaSheet.columns = [
    { header: "Command", key: "command" },
    { header: "Type", key: "type" },
    { header: "Name", key: "name" },
    { header: "Handle", key: "handle" },
    { header: "Field", key: "field" },
    { header: "Value", key: "value" },
    // { header: "Field: name", key: "name_field" },
    // { header: "Field: model_number", key: "field_model_number" },
    { header: "Definition: Handle", key: "defHandle" },
  ];

  const modelNums = new Set();
  for await (const part of parsedParts.data) {
    let add = false;
    const newObj = await ShopifyProductCsvSchema.safeParseAsync({
      Title: `Part #${part["Part #"]} - ${part.Description}`,
      "Body (HTML)": part.Description,
      "Product Category": "Business & Industrial > Medical",
      Type: "Part",
      Tags: "parts",
      "Image Src": `https://picsum.photos/seed/${encodeURIComponent(part["Part #"])}/800/800.jpg`,
      Status: "active",
      [metafieldKey]: part["Device Model #(s)"]
        .split(",")
        .map((s) => `${s.trim()}`)
        .join("; "),
    });

    if (newObj.success) {
      if (newObj.data[metafieldKey]?.includes("AWRO")) {
        add = true;
      }

      if (!add) {
        continue;
      }
      partsSheet.addRow(newObj.data);
      if (newObj.data[metafieldKey]) {
        const metaParts = newObj.data[metafieldKey].split("; ");
        for await (const model_number of metaParts) {
          if (modelNums.has(model_number)) {
            continue;
          }
          modelNums.add(model_number);
          metaSheet.addRow({
            command: "MERGE",
            type: "model",
            handle: `${model_number}`,
            defHandle: `model`,
            field: "name",
            value: model_number,
          });
        }
      }
      partsSheet.addRow(newObj.data);
    } else {
      console.error(newObj.error);
    }
  }

  return workbook;
}

async function writeShopifyCSV() {
  const workbook = await parseCSVToData();
  await workbook.xlsx.writeFile(`${CSV_DIR}/shopify_parts.xlsx`);
}

async function main(): Promise<void> {
  await writeShopifyCSV();
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
