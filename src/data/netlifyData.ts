export interface PartnerDeal {
  id: string;
  name: string;
  submitted: string;
  stage: 'In assessment' | 'Approved' | 'Docs / settlement' | 'Settled';
  amountBand: string;
  commission: string;
  commissionStatus: 'est.' | 'confirmed' | 'paid';
  rule?: string;
  facility?: string;
  partner?: string;
}

export interface StatementDeal {
  deal: string;
  id: string;
  rule: string;
  facility: string;
  commission: string;
  status: 'Confirmed' | 'Estimated' | 'Paid';
}

export interface NetworkDeal {
  ref: string;
  name: string;
  partner: string;
  submitted: string;
  stage: 'In assessment' | 'Approved' | 'Docs / settlement' | 'Settled';
  amountBand: string;
  commission: string;
}

export const PARTNER_DEALS: PartnerDeal[] = [
  {
    id: "KRD-2841",
    name: "Oak & Reed Landscaping",
    submitted: "Today, 9:42am",
    stage: "In assessment",
    amountBand: "$100k-$250k",
    commission: "$2,375 est.",
    commissionStatus: "est.",
    facility: "$190,000",
    rule: "1.25%",
  },
  {
    id: "KRD-2832",
    name: "Harbour Health Group",
    submitted: "15 Sep, 2:18pm",
    stage: "Approved",
    amountBand: "$50k-$100k",
    commission: "$1,500 est.",
    commissionStatus: "est.",
    facility: "$100,000",
    rule: "1.50%",
  },
  {
    id: "KRD-2819",
    name: "Pilbara Civil Works",
    submitted: "12 Sep, 11:05am",
    stage: "Docs / settlement",
    amountBand: "$250k-$500k",
    commission: "$4,800 est.",
    commissionStatus: "est.",
    facility: "$320,000",
    rule: "1.50%",
  },
  {
    id: "KRD-2788",
    name: "Northbank Hospitality",
    submitted: "8 Sep, 4:30pm",
    stage: "Settled",
    amountBand: "$100k-$250k",
    commission: "$3,100 confirmed",
    commissionStatus: "confirmed",
    facility: "$200,000",
    rule: "1.55%",
  },
];

export const STATEMENT_DEALS: StatementDeal[] = [
  {
    deal: "Northbank Hospitality",
    id: "KRD-2788",
    rule: "1.55%",
    facility: "$200,000",
    commission: "$3,100",
    status: "Confirmed",
  },
  {
    deal: "Pilbara Civil Works",
    id: "KRD-2819",
    rule: "1.50%",
    facility: "$320,000",
    commission: "$4,800",
    status: "Estimated",
  },
];

export const NETWORK_DEALS: NetworkDeal[] = [
  {
    ref: "KRD-2841",
    name: "Oak & Reed Landscaping",
    partner: "Hayes Partners",
    submitted: "Today, 9:42am",
    stage: "In assessment",
    amountBand: "$100k-$250k",
    commission: "$2,375 est.",
  },
  {
    ref: "KRD-2839",
    name: "Apex Logistics Pty",
    partner: "Mark Carroll",
    submitted: "Today, 8:15am",
    stage: "In assessment",
    amountBand: "$250k-$500k",
    commission: "$5,250 est.",
  },
  {
    ref: "KRD-2832",
    name: "Harbour Health Group",
    partner: "Hayes Partners",
    submitted: "15 Sep, 2:18pm",
    stage: "Approved",
    amountBand: "$50k-$100k",
    commission: "$1,500 est.",
  },
  {
    ref: "KRD-2828",
    name: "Coomera Steel Works",
    partner: "North & Kind Advisory",
    submitted: "14 Sep, 1:40pm",
    stage: "Approved",
    amountBand: "$500k-$1m",
    commission: "$8,500 est.",
  },
  {
    ref: "KRD-2819",
    name: "Pilbara Civil Works",
    partner: "Hayes Partners",
    submitted: "12 Sep, 11:05am",
    stage: "Docs / settlement",
    amountBand: "$250k-$500k",
    commission: "$4,800 est.",
  },
  {
    ref: "KRD-2788",
    name: "Northbank Hospitality",
    partner: "Hayes Partners",
    submitted: "8 Sep, 4:30pm",
    stage: "Settled",
    amountBand: "$100k-$250k",
    commission: "$3,100 confirmed",
  },
];

export const TOP_PARTNERS = [
  { rank: 1, name: "Mark Carroll", code: "SPUD", deals: "18 deals", volume: "$640k" },
  { rank: 2, name: "Hayes Partners", code: "HAYES01", deals: "12 deals", volume: "$380k" },
  { rank: 3, name: "North & Kind Advisory", code: "NORTHK", deals: "9 deals", volume: "$295k" },
];
