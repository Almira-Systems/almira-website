/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      {
        hostname: "cdn.shopify.com",
      },
      {
        hostname: "placehold.in",
      },
      {
        hostname: "www.ameriwater.com",
      },
    ],
  },
};

export default config;
