import type { CodegenConfig } from "@graphql-codegen/cli";
import * as dotenv from "dotenv";
// import { type TypedDocumentNode } from "@graphql-typed-document-node/core";

dotenv.config();

const apiVersion = "2026-04";
const schemaKey =
  process.env.NODE_ENV === "development"
    ? `${process.env.SHOPIFY_STOREFRONT_DOMAIN}/api/${apiVersion}/graphql`
    : // `http://localhost:${process.env.PORT}/graphql`
      `${process.env.VERCEL_URL}/graphql`;
const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [schemaKey]: {
        headers: {
          "X-Shopify-Storefront-Access-Token": `${process.env.SHOPIFY_STOREFRONT_PUBLIC_ACCESS_TOKEN}`,
        },
      },
    },
  ],
  config: {
    useTypeImports: true,
    skipTypeNameForRoot: true,
  },
  documents: [
    "src/**/*.{ts,tsx}",
    "!.next/**/*",
    "!node_modules/**/*",
    "!public/**/*",
    "!**/gql/**/*",
  ],
  generates: {
    "./src/types/gql/": {
      preset: "client",
      // config: { debug: true },
      config: {
        dedupeFragments: true,
      },
      plugins: [],
    },
  },
};
export default config;
