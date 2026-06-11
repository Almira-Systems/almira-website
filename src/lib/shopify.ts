import { env } from "@/env";
import type { TypedDocumentNode } from "@apollo/client";
import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import { print } from "graphql";

const shopifyClient = createStorefrontApiClient({
  storeDomain:
    typeof window !== "undefined"
      ? env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_DOMAIN
      : env.SHOPIFY_STOREFRONT_DOMAIN,
  apiVersion: "2026-04",
  publicAccessToken:
    typeof window !== "undefined"
      ? env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_PUBLIC_ACCESS_TOKEN
      : env.SHOPIFY_STOREFRONT_PUBLIC_ACCESS_TOKEN,
  // publicAccessToken: env.SHOPIFY_STOREFRONT_PUBLIC_ACCESS_TOKEN,
});

export async function shopifyFetch<
  TData,
  TVariables = Record<string, unknown>,
>({
  query,
  variables,
}: {
  query: TypedDocumentNode<TData, TVariables>;
  variables?: TVariables;
}): Promise<TData> {
  const domain = `${process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_DOMAIN}/api/2026-04/graphql`;
  const response = await fetch(domain, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": `${process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_PUBLIC_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      query: print(query),
      variables,
    }),
    cache: "no-store",
  });
  const json = (await response.json()) as { data?: TData; errors?: unknown[] };
  if (json.errors) {
    console.error(json.errors);
    throw new Error("failed to fetch from shopify");
  }

  return json.data!;
}

export default shopifyClient;
