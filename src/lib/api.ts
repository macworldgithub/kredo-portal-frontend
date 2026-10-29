import { getApiBaseUrl } from "@/lib/config";

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

export interface DiaryNote {
  id: string;
  author: string;
  content: string;
  nextSteps?: string;
  isInternal: boolean;
  createdAt: string;
}

export interface Deal {
  id: string;
  name: string;
  applicant: string;
  amount: string;
  type: string;
  status:
    | "Lead received"
    | "Customer invited"
    | "Application submitted"
    | "Waiting on customer"
    | "In assessment"
    | "Approved"
    | "Docs / settlement"
    | "Settled"
    | "Declined"
    | "Closed Lost"
    | "Application received"
    | "Declined / withdrawn";
  lastActivity: string;
  commission: string;
  commissionStatus: "Estimated" | "Confirmed" | "Paid";
  code: string;
  submittedDate: string;
  lostReason?: string;
  diaryNotes?: DiaryNote[];
}

export interface DashboardData {
  partner: import("@/data/mockData").PartnerProfile;
  stats: {
    referredThisMonth: number;
    inFlight: number;
    settled: number;
    closedLost: number;
    totalCommissionsEarned: string;
    estimatedCommission: string;
  };
  deals: Deal[];
  referralCode: string;
  referralLink: string;
}

export interface MasterOverviewData {
  stats: {
    activePartners: number;
    inFlightDeals: number;
    settledThisMonth: number;
    closedLostDeals: number;
    commissionAccrued: string;
  };
  funnel: {
    referred: number;
    received: number;
    approved: number;
    settled: number;
    lost: number;
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
    lostReason?: string;
  }[];
}

export interface MasterPipelineDeal {
  id: string;
  name: string;
  applicant?: string;
  partner: string;
  partnerCode: string;
  submitted: string;
  stage: string;
  amountBand: string;
  commission: string;
  lostReason?: string;
  diaryNotes?: DiaryNote[];
}

export interface PipelineStageCounts {
  leadReceived: number;
  customerInvited: number;
  applicationSubmitted: number;
  waitingOnCustomer: number;
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
  const apiUrl = `${getApiBaseUrl()}${path}`;
  const headers = new Headers(options.headers);
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const token = authenticated ? getAccessToken() : null;
  if (token) headers.set("Authorization", `Bearer ${token}`);

  let response: Response;
  try {
    response = await fetch(apiUrl, { ...options, headers });
  } catch {
    throw new Error(
      `Cannot reach the backend at ${apiUrl}. Make sure the backend is running, the URL is reachable from this device, and its CORS settings allow this website.`,
    );
  }
  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as
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
