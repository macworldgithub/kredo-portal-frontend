const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

if (process.env.VERCEL === "1" && !configuredApiUrl) {
  throw new Error("Set NEXT_PUBLIC_API_URL in the Vercel project environment.");
}

export const API_BASE_URL = (
  configuredApiUrl || "http://localhost:5000/api"
).replace(/\/+$/, "");
