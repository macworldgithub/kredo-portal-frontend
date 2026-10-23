import { API_BASE_URL } from "@/lib/config";

const TOKEN_KEY = "kredo.accessToken";
const USER_KEY = "kredo.currentUser";
export const PASSWORD_PATTERN = /^[A-Za-z0-9]{6}$/;

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: "master" | "partner";
  partnerCode: string | null;
}

export interface DashboardData {
  partner: import("@/data/mockData").PartnerProfile;
  stats: {
    referredThisMonth: number;
    inFlight: number;
    settled: number;
    estimatedCommission: string;
  };
  deals: import("@/data/mockData").Deal[];
  referralCode: string;
  referralLink: string;
}

export interface MasterOverviewData {
  stats: {
    activePartners: number;
    inFlightDeals: number;
    settledThisMonth: number;
    commissionAccrued: string;
  };
  funnel: {
    referred: number;
    received: number;
    approved: number;
    settled: number;
  };
  topPartners: { rank: number; name: string; code: string; deals: number; volume: string }[];
  network: {
    ref: string;
    name: string;
    partner: string;
    submitted: string;
    stage: string;
    amountBand: string;
    commission: string;
  }[];
}

export interface MasterPipelineDeal {
  id: string;
  name: string;
  partner: string;
  partnerCode: string;
  submitted: string;
  stage: string;
  amountBand: string;
  commission: string;
}

export interface PartnerDirectoryItem {
  id: string;
  name: string;
  badge: "Hero" | "Standard";
  contact: string;
  email: string;
  code: string;
  deals: number;
  settled: string;
  status: "Active" | "Paused";
  avatar: string;
}

export interface MasterReportData {
  sourceMix: { label: string; value: number; color: string }[];
  partnerPerformance: { name: string; volume: string; percent: number }[];
}

export interface MasterPreferences {
  weeklyReportsEnabled: boolean;
}

export interface ApiCommission {
  id: string;
  dealName: string;
  client: string;
  settledAmount: string;
  rate: string;
  commissionAmount: string;
  status: "Confirmed" | "Paid" | "Processing";
  paidDate?: string;
  dealId: string;
  partnerCode?: string;
}

export function getAccessToken(): string | null {
  return typeof window === "undefined" ? null : window.localStorage.getItem(TOKEN_KEY);
}

export function setAccessToken(token: string): void {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function getCurrentUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(USER_KEY);
  if (!value) return null;
  try {
    return JSON.parse(value) as AuthUser;
  } catch {
    window.localStorage.removeItem(USER_KEY);
    return null;
  }
}

export function setCurrentUser(user: AuthUser): void {
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAccessToken(): void {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
  authenticated = true,
): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const token = authenticated ? getAccessToken() : null;
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  if (!response.ok) {
    const payload = await response.json().catch(() => null) as
      | { message?: string | string[] }
      | null;
    const message = Array.isArray(payload?.message)
      ? payload.message.join(", ")
      : payload?.message || `${response.status} ${response.statusText}`;
    throw new Error(message);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
