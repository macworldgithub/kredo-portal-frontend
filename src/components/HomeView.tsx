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
  Download
} from "lucide-react";
import { Deal } from "../data/mockData";

interface HomeViewProps {
  deals: Deal[];
  stats: {
    referredThisMonth: number;
    inFlight: number;
    settled: number;
    estimatedCommission: string;
  };
  onOpenShareModal: () => void;
  onSelectDeal: (deal: Deal) => void;
  onNavigateToDeals: () => void;
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

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Referred this month (Sky tinted) */}
        <div className="bg-[#d4eaf7] border border-[#bedcf0] rounded-2xl p-5 relative overflow-hidden shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2d5573]">
              Referred this month
            </span>
            <div className="w-8 h-8 rounded-full bg-white/70 flex items-center justify-center text-[#1c4b70]">
              <Send className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-4xl font-extrabold text-[#0a1926] tracking-tight">{stats.referredThisMonth}</div>
            <div className="text-xs font-medium text-[#2d5573] mt-2">Referrals this month</div>
          </div>
        </div>

        {/* Card 2: In Flight */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 relative overflow-hidden shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              In flight
            </span>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-4xl font-extrabold text-[#0a1926] tracking-tight">{stats.inFlight}</div>
            <div className="text-xs font-medium text-slate-500 mt-2">Applications in progress</div>
          </div>
        </div>

        {/* Card 3: Settled */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 relative overflow-hidden shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Settled
            </span>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-4xl font-extrabold text-[#0a1926] tracking-tight">{stats.settled}</div>
            <div className="text-xs font-medium text-slate-500 mt-2">Settled referrals</div>
          </div>
        </div>

        {/* Card 4: Estimated Commission (Dark Card) */}
        <div className="bg-[#0a1926] text-white border border-[#162f49] rounded-2xl p-5 relative overflow-hidden shadow-md">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
              Estimated commission
            </span>
            <div className="w-8 h-8 rounded-full bg-[#1b344d] flex items-center justify-center text-sky-300">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-4xl font-extrabold text-white tracking-tight">{stats.estimatedCommission}</div>
            <div className="text-xs font-medium text-slate-300 mt-2">Estimated commission</div>
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
                <p className="text-xs text-slate-500">Your latest referral activity</p>
              </div>
              <button
                onClick={onNavigateToDeals}
                className="flex items-center gap-1 text-xs font-bold text-[#0a1926] hover:text-sky-600 transition-colors"
              >
                <span>View all</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* List of Deals */}
            <div className="space-y-3">
              {deals.slice(0, 4).map((deal) => (
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
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${getStatusBadge(deal.status)}`}>
                      {deal.status}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
                  </div>
                </div>
              ))}
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

              {/* QR Code Graphic Box */}
              <div className="bg-white p-2.5 rounded-xl shadow-xs border border-white/80">
                <svg className="w-16 h-16" viewBox="0 0 100 100" fill="currentColor">
                  {/* Accurate stylized QR Code Matrix */}
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
                  <rect x="40" y="40" width="20" height="20" rx="3" fill="#0a1926" />
                  <circle cx="85" cy="55" r="4" fill="#0a1926" />
                  <rect x="70" y="70" width="12" height="12" rx="2" fill="#0a1926" />
                  <rect x="88" y="78" width="8" height="8" fill="#0a1926" />
                  <rect x="45" y="75" width="14" height="8" rx="2" fill="#0a1926" />
                  <rect x="15" y="45" width="10" height="10" fill="#0a1926" />
                </svg>
              </div>
            </div>

            <p className="text-xs text-[#2b5675] font-medium leading-relaxed mt-4">
              One tracked link for every introduction. The code stays with the application for 90 days.
            </p>

            {/* Referral link box with copy button */}
            <div className="mt-5 bg-white rounded-xl p-2.5 px-3.5 flex items-center justify-between border border-white shadow-2xs">
              <span className="text-xs font-mono font-medium text-slate-700 truncate mr-2">
                {referralLink}
              </span>
              <button
                onClick={handleCopyLink}
                className="text-slate-400 hover:text-slate-700 transition-colors p-1"
                title="Copy Link"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Action buttons (Assets & Share) */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button
              onClick={onNavigateToShare}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#0a1926] hover:bg-[#14293d] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <QrCode className="w-4 h-4" />
              <span>Assets</span>
            </button>
            <button
              onClick={onOpenShareModal}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold shadow-2xs border border-white transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom 3 Activity/Status Banners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 flex items-center gap-3.5 shadow-2xs">
          <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
            <CheckCircle className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-slate-900 truncate">Harbour Health approved</div>
            <div className="text-[11px] text-slate-500 truncate">Moved to Approved two hours ago.</div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 flex items-center gap-3.5 shadow-2xs">
          <div className="w-9 h-9 rounded-full bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
            <DollarSign className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-slate-900 truncate">$3,100 confirmed</div>
            <div className="text-[11px] text-slate-500 truncate">Northbank commission is ready for payment.</div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 flex items-center gap-3.5 shadow-2xs">
          <div className="w-9 h-9 rounded-full bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-slate-900 truncate">3 awaiting assessment</div>
            <div className="text-[11px] text-slate-500 truncate">No action needed from you right now.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
