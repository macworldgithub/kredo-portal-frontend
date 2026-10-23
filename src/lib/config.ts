const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

const productionApiUrl = "https://kredo-portal-backend.vercel.app/api";

export function getApiBaseUrl(): string {
  if (configuredApiUrl) return configuredApiUrl.replace(/\/+$/, "");
  if (process.env.NODE_ENV === "production") return productionApiUrl;

  if (typeof window !== "undefined") {
    const { hostname } = window.location;
    if (hostname !== "localhost" && hostname !== "127.0.0.1") {
      return `http://${hostname}:5000/api`;
    }
  }

  return "http://localhost:5000/api";
}
