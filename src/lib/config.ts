const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

export const API_BASE_URL = configuredApiUrl
  ? configuredApiUrl.replace(/\/+$/, "")
  : process.env.NODE_ENV === "production"
    ? null
    : "http://localhost:5000/api";
