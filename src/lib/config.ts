const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

const productionApiUrl = "https://kredo-backend.omnisuiteai.com/api";

export function getApiBaseUrl(): string {
  if (configuredApiUrl) return configuredApiUrl.replace(/\/+$/, "");
  return productionApiUrl;
}
