import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string().url(),
    SHOPIFY_STOREFRONT_DOMAIN: z.string(),
    SHOPIFY_STOREFRONT_PUBLIC_ACCESS_TOKEN: z.string(),
    SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN: z.string(),
    PORT: z.coerce.number(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    // NEXT_PUBLIC_SHOPIFY_STORE_NAME: z.string(),
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_DOMAIN: z.string(),
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_PUBLIC_ACCESS_TOKEN: z.string(),
    // NEXT_PUBLIC_SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN:
    //   process.env.SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN,
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    SHOPIFY_STOREFRONT_DOMAIN: process.env.SHOPIFY_STOREFRONT_DOMAIN,
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_DOMAIN:
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_DOMAIN,
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_PUBLIC_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_PUBLIC_ACCESS_TOKEN,
    // NEXT_PUBLIC_SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN:
    //   process.env.SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN,
    SHOPIFY_STOREFRONT_PUBLIC_ACCESS_TOKEN:
      process.env.SHOPIFY_STOREFRONT_PUBLIC_ACCESS_TOKEN,
    SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN:
      process.env.SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
