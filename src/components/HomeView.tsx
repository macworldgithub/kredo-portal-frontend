"use client";

import React, { useState } from "react";
import { 
  Send, 
  Activity, 
  CheckCircle, 
  DollarSign, 
  Briefcase, 
  ArrowUpRight, 
  ChevronRight, 
  QrCode, 
  Copy, 
  Check, 
  Clock, 
  TrendingUp, 
  Sparkles,
  Share2,
  XCircle,
  FileText
} from "lucide-react";
import { Deal } from "@/lib/api";

interface HomeViewProps {
  deals: Deal[];
  stats: {
    referredThisMonth: number;
    inFlight: number;
    settled: number;
    closedLost?: number;
    totalCommissionsEarned?: string;
    estimatedCommission?: string;
  };
  onOpenShareModal: () => void;
  onSelectDeal: (deal: Deal) => void;
  onNavigateToDeals: (stageFilter?: string) => void;
  onNavigateToCommissions: () => void;
  onNavigateToShare: () => void;
  partnerCode: string;
  referralLink: string;
}

export const HomeView: React.FC<HomeViewProps> = ({
  deals,
  stats,
  onOpenShareModal,
  onSelectDeal,
  onNavigateToDeals,
  onNavigateToCommissions,
  onNavigateToShare,
  partnerCode,
  referralLink,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${referralLink}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const getStatusBadge = (status: Deal['status']) => {
    switch (status) {
      case 'In assessment':
        return 'bg-[#fffbeb] text-[#b45309] border-[#fef3c7]';
      case 'Approved':
        return 'bg-[#ecfdf5] text-[#047857] border-[#d1fae5]';
      case 'Docs / settlement':
        return 'bg-[#f0fdf4] text-[#15803d] border-[#bbf7d0]';
      case 'Settled':
        return 'bg-[#f0fdfa] text-[#0f766e] border-[#ccfbf1]';
      case 'Closed Lost':
      case 'Declined':
      case 'Declined / withdrawn':
        return 'bg-[#fef2f2] text-[#b91c1c] border-[#fecaca]';
      case 'Lead received':
      case 'Customer invited':
      case 'Application submitted':
      case 'Waiting on customer':
        return 'bg-[#eff6ff] text-[#1d4ed8] border-[#dbeafe]';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Date and Header Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <span className="w-4 h-0.5 bg-slate-300"></span>
            <span>{new Date().toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" }).toUpperCase()}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a1926] tracking-tight mt-1">
            Your referrals, at a glance.
          </h1>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Track every introduction from first application to settlement — with the commission trail kept clear.
          </p>
        </div>

        <button
          onClick={onOpenShareModal}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0a1926] hover:bg-[#14293d] text-white font-semibold text-xs sm:text-sm shadow-md transition-all self-start md:self-auto cursor-pointer"
        >
          <Share2 className="w-4 h-4 text-sky-300" />
          <span>Share referral</span>
        </button>
      </div>

      {/* 5 Interactive Drill-down Stat Cards (Section 4.1, 4.2 & 4.3) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: Referred this month (Clickable drilldown) */}
        <div
          onClick={() => onNavigateToDeals("All stages")}
          className="bg-[#d4eaf7] border border-[#bedcf0] rounded-2xl p-5 relative overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer group"
          title="Click to view all referrals"
        >
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2d5573] group-hover:text-[#0a1926] transition-colors">
              Referred this month
            </span>
            <div className="w-8 h-8 rounded-full bg-white/70 flex items-center justify-center text-[#1c4b70]">
              <Send className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#0a1926] tracking-tight">{stats.referredThisMonth}</div>
            <div className="text-xs font-medium text-[#2d5573] mt-2 flex items-center justify-between">
              <span>Referrals this month</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>

        {/* Card 2: In Flight (Clickable drilldown) */}
        <div
          onClick={() => onNavigateToDeals("In flight")}
          className="bg-white border border-slate-200/90 rounded-2xl p-5 relative overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer group"
          title="Click to filter In Flight deals"
        >
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-slate-900 transition-colors">
              In flight
            </span>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#0a1926] tracking-tight">{stats.inFlight}</div>
            <div className="text-xs font-medium text-slate-500 mt-2 flex items-center justify-between">
              <span>In assessment & pipeline</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>

        {/* Card 3: Settled (Clickable drilldown) */}
        <div
          onClick={() => onNavigateToDeals("Settled")}
          className="bg-white border border-slate-200/90 rounded-2xl p-5 relative overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer group"
          title="Click to filter Settled deals"
        >
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-slate-900 transition-colors">
              Settled
            </span>
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#0a1926] tracking-tight">{stats.settled}</div>
            <div className="text-xs font-medium text-slate-500 mt-2 flex items-center justify-between">
              <span>Settled referrals</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>

        {/* Card 4: Closed Lost (Section 4.2) */}
        <div
          onClick={() => onNavigateToDeals("Closed Lost")}
          className="bg-white border border-rose-100 rounded-2xl p-5 relative overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer group"
          title="Click to filter Closed Lost deals"
        >
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600">
              Closed Lost
            </span>
            <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">{stats.closedLost ?? 0}</div>
            <div className="text-xs font-medium text-slate-500 mt-2 flex items-center justify-between">
              <span>Lost / declined deals</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>

        {/* Card 5: Total commissions earned (Section 4.1 - Renamed per scope) */}
        <div
          onClick={onNavigateToCommissions}
          className="bg-[#0a1926] text-white border border-[#162f49] rounded-2xl p-5 relative overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer group"
          title="Click to view Commission Ledger"
        >
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
              Total commissions earned
            </span>
            <div className="w-8 h-8 rounded-full bg-[#1b344d] flex items-center justify-center text-sky-300">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {stats.totalCommissionsEarned || stats.estimatedCommission || "$0"}
            </div>
            <div className="text-[11px] font-medium text-slate-300 mt-2 flex items-center justify-between">
              <span>Est: {stats.estimatedCommission || "$0"}</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Split: Recent Deals (Left) & Your Referral Code (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent deals list */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-[#0a1926]">Recent deals</h3>
                <p className="text-xs text-slate-500">Your latest referral activity with stage tracking</p>
              </div>
              <button
                onClick={() => onNavigateToDeals()}
                className="flex items-center gap-1 text-xs font-bold text-[#0a1926] hover:text-sky-600 transition-colors cursor-pointer"
              >
                <span>View all deals</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* List of Deals */}
            <div className="space-y-3">
              {deals.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">
                  No deals registered yet under your partner code.
                </div>
              ) : (
                deals.slice(0, 5).map((deal) => (
                  <div
                    key={deal.id}
                    onClick={() => onSelectDeal(deal)}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/70 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-white text-slate-600 flex items-center justify-center border border-slate-200/60 shadow-2xs">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#0a1926] group-hover:text-sky-700 transition-colors">
                          {deal.name}
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium">
                          {deal.id} · {deal.lastActivity}
                        </div>
                        {deal.lostReason && (
                          <div className="text-[10px] text-rose-600 font-medium mt-0.5">
                            Reason: {deal.lostReason}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${getStatusBadge(deal.status)}`}>
                        {deal.status}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Your Referral Code Card */}
        <div className="lg:col-span-5 bg-[#cde4f5] border border-[#b2d6ef] rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1e4868]">
                  Your Referral Code
                </span>
                <h2 className="text-3xl font-mono font-black tracking-wider text-[#0a1926] mt-2">
                  {partnerCode}
                </h2>
              </div>

              {/* Stylized QR Code */}
              <div className="bg-white p-2.5 rounded-xl shadow-xs border border-white/80">
                <svg className="w-16 h-16" viewBox="0 0 100 100" fill="currentColor">
                  <rect x="0" y="0" width="30" height="30" rx="4" fill="#0a1926" />
                  <rect x="6" y="6" width="18" height="18" rx="2" fill="white" />
                  <rect x="10" y="10" width="10" height="10" fill="#0a1926" />

                  <rect x="70" y="0" width="30" height="30" rx="4" fill="#0a1926" />
                  <rect x="76" y="6" width="18" height="18" rx="2" fill="white" />
                  <rect x="80" y="10" width="10" height="10" fill="#0a1926" />

                  <rect x="0" y="70" width="30" height="30" rx="4" fill="#0a1926" />
                  <rect x="6" y="76" width="18" height="18" rx="2" fill="white" />
                  <rect x="10" y="80" width="10" height="10" fill="#0a1926" />

                  <circle cx="45" cy="15" r="4" fill="#0a1926" />
                  <circle cx="55" cy="25" r="3" fill="#0a1926" />
                  <circle cx="50" cy="50" r="5" fill="#0a1926" />
                  <circle cx="25" cy="45" r="3" fill="#0a1926" />
                  <circle cx="75" cy="45" r="3.5" fill="#0a1926" />
                  <circle cx="45" cy="75" r="4" fill="#0a1926" />
                  <circle cx="65" cy="75" r="3" fill="#0a1926" />
                </svg>
              </div>
            </div>

            <p className="text-xs text-[#204a6b] mt-3 leading-relaxed">
              Every client who applies with this code or through your tracked link is permanently attributed to your ledger.
            </p>

            <div className="mt-4 p-3 bg-white/70 backdrop-blur-xs rounded-xl border border-white/60 flex items-center justify-between text-xs font-mono text-slate-700">
              <span className="truncate">{referralLink}</span>
              <button
                onClick={handleCopyLink}
                className="ml-2 flex items-center gap-1 text-[11px] font-sans font-bold text-[#0a1926] hover:text-sky-700 transition-colors shrink-0"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          <div className="pt-6 flex gap-2">
            <button
              onClick={onOpenShareModal}
              className="flex-1 py-2.5 rounded-xl bg-[#0a1926] hover:bg-[#14293d] text-white font-bold text-xs shadow-md transition-colors"
            >
              Share link & cards
            </button>
            <button
              onClick={onNavigateToShare}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#0a1926] font-bold text-xs border border-slate-200 transition-colors"
            >
              Partner kit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
