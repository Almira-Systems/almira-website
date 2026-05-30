import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const shopName = process.env.SHOPIFY_STORE_NAME;
    const apiVersion = "2026-04";

    // Forward the query directly to Shopify
    const response = await fetch(
      `http://localhost:${process.env.PORT}/graphql`,
      // `${process.env.SHOPIFY_STOREFRONT_DOMAIN}/api/${apiVersion}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token":
            process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? "",
        },
        body: JSON.stringify(body),
        // Ensures you get real-time schema updates from Shopify without caching
        cache: "no-store",
      },
    );

    const data = (await response.json()) as Record<string, unknown>;
    return NextResponse.json(data);
  } catch (error) {
    console.error("GraphQL Proxy Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Shopify schema" },
      { status: 500 },
    );
  }
}
