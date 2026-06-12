import { promises as fsPromises } from "fs";
import { z } from "zod";
import Papa from "papaparse";
import exceljs from "exceljs";
import { useFragment, graphql } from "../types/gql";
import { shopifyFetch } from "./shopify";
import dotenv from "dotenv";
import type { ProductCardFieldsFragment } from "@/types/gql/graphql";
import { generateString } from "./utils";
import { ProductCardFields } from "./queries";

dotenv.config({ path: ".env" });

const CURRENT_DIR = process.cwd();
const CSV_DIR = `${CURRENT_DIR}/public/shopify_csv_data`;

const toHandle = (val: string) => {
  return val
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

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

const ProductImportSchema = z.object({
  "Part #": z.string(),
  Description: z.string(),
  "Device Model #(s)": z.string(),
  "Related Parts": z.string(),
  "Related Devices": z.string(),
});

const modelMFKey =
  "Metafield: custom.models [list.metaobject_reference][handle]";
const relatedModelMFKey =
  "Metafield: custom.related_models [list.metaobject_reference][handle]";
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

  [modelMFKey]: z.string().optional(),
  [relatedModelMFKey]: z.string().optional(),

  "Image Src": z.string().url().or(z.literal("")).optional(),
  "Image position": shopifyNumber,
  "Image alt text": z.string().optional(),

  Status: z.enum(["active", "draft", "archived"]).default("active"),
});

const getRelatedDevicesQuery = graphql(/* gql */ `
  query RelatedDevices($modelFilters: [ProductFilter!]) {
    collection(handle: "all") {
      products(first: 20, filters: $modelFilters) {
        nodes {
          id
          title
          ...ProductCardFields
        }
      }
    }
  }
`);

async function parsePartsImportData(workbook: exceljs.Workbook) {
  const partsFile = await fsPromises.readFile(`${CSV_DIR}/parts.csv`, "utf-8");

  const partsData = Papa.parse(partsFile, {
    header: true,
    skipEmptyLines: true,
  });

  const parsedParts = ProductImportSchema.array().safeParse(partsData.data);

  if (!parsedParts.success) {
    console.error(parsedParts.error);
    throw new Error(parsedParts.error as any);
  }
  const partsSheet =
    workbook.getWorksheet("Products") || workbook.addWorksheet("Products");

  partsSheet.columns = Object.entries(ShopifyProductCsvSchema.shape).map(
    ([key]) => ({
      header: key,
      key,
    }),
  );

  const relatedDevices: {
    devNums: string[];
    partNum: string;
  }[] = [];
  const descSlice = 24;
  for await (const part of parsedParts.data) {
    const newObj = await ShopifyProductCsvSchema.safeParseAsync({
      Title: `Part #${part["Part #"]} - ${part.Description.slice(0, descSlice)}`,
      "URL handle": toHandle(
        `Part #${part["Part #"]} - ${part.Description.slice(0, descSlice)}`,
      ),
      "Body (HTML)": part.Description,
      "Product Category": "Business & Industrial > Medical",
      Type: "Part",
      Tags: "parts",
      "Image Src": `https://picsum.photos/seed/${encodeURIComponent(part["Part #"])}/800/800.jpg`,
      Status: "active",
      [modelMFKey]: part["Device Model #(s)"]
        .split(",")
        .map((s) => `${toHandle(s.trim())}`)
        .join("; "),
      [relatedModelMFKey]: part["Related Devices"]
        .split(",")
        .map((s) => `${toHandle(s.trim())}`)
        .join("; "),
    });
    if (!newObj.success) {
      console.error(newObj.error);
      continue;
    }
    partsSheet.addRow(newObj.data);
    relatedDevices.push({
      devNums: part["Related Devices"].split(",").map((s) => s.trim()),
      partNum: part["Part #"],
      // type: 'PART'
    });
  }

  const relatedDevNums = new Set<string>(
    relatedDevices.map((r) => r.devNums).flat(),
  );

  const nums = Array.from(relatedDevNums);
  const devicesRes = await shopifyFetch({
    query: getRelatedDevicesQuery,
    variables: {
      modelFilters: (nums.map((devNum) => ({
        productMetafield: {
          namespace: "custom",
          key: "models",
          value: devNum,
        },
      })) ?? []) as any,
    },
  });

  const devices = useFragment(
    ProductCardFields,
    devicesRes.collection?.products.nodes,
  );

  return devices ?? [];
}

const DeviceImportSchema = z.object({
  "Device Name": z.string(),
  Description: z.string(),
  "Model #(s)": z.string(),
});

async function parseDevicesImportData(workbook: exceljs.Workbook) {
  const devicesFile = await fsPromises.readFile(
    `${CSV_DIR}/devices.csv`,
    "utf-8",
  );

  const devicesData = Papa.parse(devicesFile, {
    header: true,
    skipEmptyLines: true,
  });

  const parsedDevices = DeviceImportSchema.array().safeParse(devicesData.data);

  if (!parsedDevices.success) {
    throw new Error(parsedDevices.error as any);
  }

  const productSheet =
    workbook.getWorksheet("Products") || workbook.addWorksheet("Products");

  productSheet.columns = Object.entries(ShopifyProductCsvSchema.shape).map(
    ([key]) => ({
      header: key,
      key,
    }),
  );

  const titleSlice = 24;
  const modelsToAdd = new Set<string>();
  for await (const device of parsedDevices.data) {
    const newObj = await ShopifyProductCsvSchema.safeParseAsync({
      Title: device["Device Name"],
      "URL handle": toHandle(device["Device Name"].slice(0, titleSlice)),
      "Body (HTML)": device.Description,
      "Product Category": "Business & Industrial > Medical",
      Type: "Device",
      Tags: "devices",
      "Image Src": `https://picsum.photos/seed/${encodeURIComponent(device["Device Name"])}/800/800.jpg`,
      Status: "active",
      [modelMFKey]: device["Model #(s)"]
        .split(",")
        .map((s) => {
          const trimmed = s.trim();
          modelsToAdd.add(trimmed);
          return `${toHandle(trimmed)}`;
        })
        .join("; "),
    });
    if (!newObj.success) {
      console.error(newObj.error);
      continue;
    }
    productSheet.addRow(newObj.data);
  }

  return modelsToAdd;
}

const GetDevicesByModelsQuery = graphql(/* gql */ `
  query GetDevicesByModels($modelNumbers: [String!]!) {
    products(first: 100, query: "product_type:Device") {
      nodes {
        id
        title
        handle
      }
    }
  }
`);

async function defineMetaobjects(
  modelsToAdd: Set<string>,
  relatedDevices: ProductCardFieldsFragment[],
  w: exceljs.Workbook,
) {
  // models
  // related models
  const metaSheet =
    w.getWorksheet("Metaobjects") || w.addWorksheet("Metaobjects");
  metaSheet.columns = [
    { header: "Command", key: "command" },
    { header: "Type", key: "type" },
    { header: "Name", key: "name" },
    { header: "Handle", key: "handle" },
    { header: "Field", key: "field" },
    { header: "Value", key: "value" },
    { header: "Definition: Handle", key: "defHandle" },
    { header: "Definition: Name", key: "defName" },
  ];

  for (const model of modelsToAdd) {
    metaSheet.addRow({
      command: "MERGE",
      handle: `${toHandle(model)}`,
      defHandle: `model`,
      defName: "Model",
      field: "name",
      value: model,
    });
  }

  for (const device of relatedDevices) {
    const handleSuffix = generateString(6);
    const handle = `${toHandle(`model-relation-${handleSuffix}`)}`;
    metaSheet.addRow({
      command: "MERGE",
      type: "model_relation",
      handle,
      defHandle: `model_relation`,
      defName: "Model Relation",
      field: "model",
      value: `model.${device.handle}`,
    });
    metaSheet.addRow({
      command: "MERGE",
      type: "model_relation",
      handle,
      defHandle: `model_relation`,
      defName: "Model Relation",
      field: "type",
      value: "DEVICE",
    });
  }
}

async function main(): Promise<void> {
  const workbook = new exceljs.Workbook();
  const relatedDevices = await parsePartsImportData(workbook);
  const modelsToAdd = await parseDevicesImportData(workbook);
  await defineMetaobjects(modelsToAdd, relatedDevices, workbook);

  await workbook.xlsx.writeFile(`${CSV_DIR}/shopify_parts.xlsx`);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
