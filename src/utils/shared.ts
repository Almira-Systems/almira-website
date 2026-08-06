export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.env.NODE_ENV === "development") return "http://localhost:3000";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.PROD_URL) return `https://${process.env.PROD_URL}`;
};
