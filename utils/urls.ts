export const isProduction = process.env.NODE_ENV === "production";
export const isDevelopment = process.env.NODE_ENV === "development";

export const webSiteUrl = isProduction
  ? "https://sust-cse-ner-annotation.vercel.app/"
  : "http://localhost:3000";
