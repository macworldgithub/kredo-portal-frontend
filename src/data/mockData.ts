export interface Deal {
  id: string;
  name: string;
  applicant: string;
  amount: string;
  type: string;
  status: 'Lead received' | 'Customer invited' | 'Application submitted' | 'Waiting on customer' | 'Application received' | 'In assessment' | 'Approved' | 'Docs / settlement' | 'Settled' | 'Declined' | 'Closed Lost' | 'Declined / withdrawn';
  lastActivity: string;
  commission: string;
  commissionStatus: 'Estimated' | 'Confirmed' | 'Paid';
  code: string;
  submittedDate: string;
  lostReason?: string;
  diaryNotes?: { id: string; author: string; content: string; nextSteps?: string; isInternal: boolean; createdAt: string }[];
}

export interface CommissionItem {
  id: string;
  dealName: string;
  client: string;
  settledAmount: string;
  rate: string;
  commissionAmount: string;
  status: 'Confirmed' | 'Paid' | 'Processing';
  paidDate?: string;
  dealId: string;
}

export interface PartnerProfile {
  name: string;
  code: string;
  partnerType: string;
  contactEmail: string;
  phone: string;
  bankAccount: string;
  bsb: string;
  abn: string;
  referralLink: string;
  notificationsEnabled: boolean;
  settlementAlerts: boolean;
  marketingEmails: boolean;
}

export const INITIAL_PARTNER: PartnerProfile = {
  name: "Hayes Partners",
  code: "HAYES01",
  partnerType: "Commercial & Business Broking",
  contactEmail: "admin@hayespartners.com.au",
  phone: "+61 412 849 201",
  bankAccount: "1098 4421",
  bsb: "062-000",
  abn: "48 192 847 219",
  referralLink: "kredo.au/apply?ref=HAYES01",
  notificationsEnabled: true,
  settlementAlerts: true,
  marketingEmails: false,
};

export const INITIAL_DEALS: Deal[] = [
  {
    id: "KRD-2841",
    name: "Oak & Reed Landscaping",
    applicant: "Marcus Vance",
    amount: "$180,000",
    type: "Asset & Equipment",
    status: "In assessment",
    lastActivity: "18 minutes ago",
    commission: "$1,800",
    commissionStatus: "Estimated",
    code: "HAYES01",
    submittedDate: "16 Sep 2026",
  },
  {
    id: "KRD-2832",
    name: "Harbour Health Group",
    applicant: "Dr. Evelyn Wei",
    amount: "$420,000",
    type: "Working Capital",
    status: "Approved",
    lastActivity: "2 hours ago",
    commission: "$3,100",
    commissionStatus: "Confirmed",
    code: "HAYES01",
    submittedDate: "15 Sep 2026",
  },
  {
    id: "KRD-2819",
    name: "Pilbara Civil Works",
    applicant: "Brett Johnstone",
    amount: "$650,000",
    type: "Commercial Term Facility",
    status: "Docs / settlement",
    lastActivity: "Yesterday",
    commission: "$4,550",
    commissionStatus: "Estimated",
    code: "HAYES01",
    submittedDate: "14 Sep 2026",
  },
  {
    id: "KRD-2788",
    name: "Northbank Hospitality",
    applicant: "Sofia Rossi",
    amount: "$310,000",
    type: "Refinance & Expansion",
    status: "Settled",
    lastActivity: "12 Sep, 3:12pm",
    commission: "$3,100",
    commissionStatus: "Confirmed",
    code: "HAYES01",
    submittedDate: "10 Sep 2026",
  },
  {
    id: "KRD-2760",
    name: "Bayside Logistics Fleet",
    applicant: "Trevor Smith",
    amount: "$540,000",
    type: "Heavy Vehicle Asset",
    status: "Settled",
    lastActivity: "08 Sep, 11:30am",
    commission: "$3,780",
    commissionStatus: "Paid",
    code: "HAYES01",
    submittedDate: "05 Sep 2026",
  },
  {
    id: "KRD-2715",
    name: "Apex Precision Engineering",
    applicant: "Damian Lee",
    amount: "$225,000",
    type: "Machinery Line",
    status: "Settled",
    lastActivity: "02 Sep, 4:15pm",
    commission: "$1,795",
    commissionStatus: "Paid",
    code: "HAYES01",
    submittedDate: "28 Aug 2026",
  },
];

export const INITIAL_COMMISSIONS: CommissionItem[] = [
  {
    id: "COM-901",
    dealName: "Harbour Health Group",
    client: "Dr. Evelyn Wei",
    settledAmount: "$420,000",
    rate: "0.74%",
    commissionAmount: "$3,100",
    status: "Confirmed",
    dealId: "KRD-2832",
  },
  {
    id: "COM-882",
    dealName: "Northbank Hospitality",
    client: "Sofia Rossi",
    settledAmount: "$310,000",
    rate: "1.00%",
    commissionAmount: "$3,100",
    status: "Confirmed",
    dealId: "KRD-2788",
  },
  {
    id: "COM-854",
    dealName: "Bayside Logistics Fleet",
    client: "Trevor Smith",
    settledAmount: "$540,000",
    rate: "0.70%",
    commissionAmount: "$3,780",
    status: "Paid",
    paidDate: "10 Sep 2026",
    dealId: "KRD-2760",
  },
  {
    id: "COM-810",
    dealName: "Apex Precision Engineering",
    client: "Damian Lee",
    settledAmount: "$225,000",
    rate: "0.80%",
    commissionAmount: "$1,795",
    status: "Paid",
    paidDate: "05 Sep 2026",
    dealId: "KRD-2715",
  },
];
