"use client";

import React, { useState } from "react";
import { Plus, Users, GitBranch, ArrowUpRight, TrendingUp, DollarSign, XCircle, ChevronRight } from "lucide-react";
import { MasterOverviewData } from "@/lib/api";

interface MasterOverviewViewProps {
  data: MasterOverviewData;
  onNavigateToPartners: () => void;
  onNavigateToPipeline: (filter?: string) => void;
  onNavigateToReports: () => void;
  onNavigateToCommissions: () => void;
  onViewPartnerBook: (partnerCode: string) => void;
}

export const MasterOverviewView: React.FC<MasterOverviewViewProps> = ({
  data,
  onNavigateToPartners,
  onNavigateToPipeline,
  onNavigateToReports,
  onNavigateToCommissions,
  onViewPartnerBook,
}) => {
  return (
    <div className="space-y-6">
      {/* Title & Add partner button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <span className="w-4 h-0.5 bg-slate-300"></span>
            <span>KREDO MASTER OPERATIONS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a1926] tracking-tight mt-1">
            Master Portfolio Overview
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            All partner books, pipeline movement, and commission exposure in one working view.
          </p>
        </div>

        <button
          onClick={onNavigateToPartners}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0a1926] hover:bg-[#14293d] text-white font-bold text-xs shadow-md transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add partner</span>
        </button>
      </div>

      {/* 5 Summary Stat Cards with Drill-downs (Section 4.2 & 4.3) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: ACTIVE PARTNERS */}
        <div
          onClick={onNavigateToPartners}
          className="bg-[#d4eaf7] border border-[#bedcf0] rounded-2xl p-5 relative overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer group"
          title="Click to view all partners"
        >
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2d5573] group-hover:text-[#0a1926] transition-colors">
              ACTIVE PARTNERS
            </span>
            <div className="w-8 h-8 rounded-full bg-white/70 flex items-center justify-center text-[#1c4b70]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#0a1926] tracking-tight">{data.stats.activePartners}</div>
            <div className="text-xs font-medium text-[#2d5573] mt-2 flex items-center justify-between">
              <span>Active partner accounts</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>

        {/* Card 2: IN-FLIGHT DEALS */}
        <div
          onClick={() => onNavigateToPipeline("In assessment")}
          className="bg-white border border-slate-200/90 rounded-2xl p-5 relative overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer group"
          title="Click to view In-Flight deals"
        >
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-slate-900 transition-colors">
              IN-FLIGHT DEALS
            </span>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
              <GitBranch className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#0a1926] tracking-tight">{data.stats.inFlightDeals}</div>
            <div className="text-xs font-medium text-slate-500 mt-2 flex items-center justify-between">
              <span>Applications in progress</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>

        {/* Card 3: SETTLED THIS MONTH */}
        <div
          onClick={() => onNavigateToPipeline("Settled")}
          className="bg-white border border-slate-200/90 rounded-2xl p-5 relative overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer group"
          title="Click to view Settled deals"
        >
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-slate-900 transition-colors">
              SETTLED
            </span>
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#0a1926] tracking-tight">{data.stats.settledThisMonth}</div>
            <div className="text-xs font-medium text-slate-500 mt-2 flex items-center justify-between">
              <span>Settled referrals</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>

        {/* Card 4: CLOSED LOST (Section 4.2: Closed Lost tile on master view) */}
        <div
          onClick={() => onNavigateToPipeline("Closed Lost")}
          className="bg-white border border-rose-100 rounded-2xl p-5 relative overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer group"
          title="Click to view Closed Lost / Declined deals"
        >
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600">
              CLOSED LOST
            </span>
            <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {data.stats.closedLostDeals ?? data.funnel.lost ?? 0}
            </div>
            <div className="text-xs font-medium text-slate-500 mt-2 flex items-center justify-between">
              <span>Lost / declined deals</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>

        {/* Card 5: COMMISSION ACCRUED */}
        <div
          onClick={onNavigateToCommissions}
          className="bg-[#0a1926] text-white border border-[#162f49] rounded-2xl p-5 relative overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer group"
          title="Click to view Master Commissions"
        >
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
              COMMISSION ACCRUED
            </span>
            <div className="w-8 h-8 rounded-full bg-[#1b344d] flex items-center justify-center text-sky-300">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{data.stats.commissionAccrued}</div>
            <div className="text-xs font-medium text-slate-300 mt-2 flex items-center justify-between">
              <span>Total accrued payout</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>
      </div>

      {/* Top Partners section (Section 4.3: Clicking a partner tile opens that partner's deals with filter and search) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#0a1926]">Top Referral Partners</h3>
              <p className="text-xs text-slate-500">Click a partner to inspect their live deal book</p>
            </div>
            <button
              onClick={onNavigateToPartners}
              className="text-xs font-bold text-sky-700 hover:underline"
            >
              All partners
            </button>
          </div>

          <div className="space-y-3">
            {data.topPartners.map((p) => (
              <div
                key={p.code}
                onClick={() => onViewPartnerBook(p.code)}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer group"
                title={`Drill down into ${p.name}'s book`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0a1926] text-white flex items-center justify-center font-bold text-xs">
                    {p.rank}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                      {p.name}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">Code: {p.code}</div>
                  </div>
                </div>

                <div className="text-right flex items-center gap-3">
                  <div>
                    <div className="text-xs font-bold text-emerald-700">{p.volume}</div>
                    <div className="text-[10px] text-slate-400 font-medium">{p.deals} deals</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Funnel tracking */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-[#0a1926]">Pipeline Velocity Funnel</h3>
                <p className="text-xs text-slate-500">Attributed volume conversion across stages</p>
              </div>
              <button
                onClick={() => onNavigateToPipeline()}
                className="text-xs font-bold text-sky-700 hover:underline"
              >
                Master Pipeline
              </button>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>1. Introductions / Referred</span>
                  <span>{data.funnel.referred}</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#1e4868] h-full" style={{ width: "100%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>2. Applications Received / Assessed</span>
                  <span>{data.funnel.received}</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#0284c7] h-full"
                    style={{
                      width: `${data.funnel.referred ? Math.round((data.funnel.received / data.funnel.referred) * 100) : 0}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>3. Credit Approved</span>
                  <span>{data.funnel.approved}</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#10b981] h-full"
                    style={{
                      width: `${data.funnel.referred ? Math.round((data.funnel.approved / data.funnel.referred) * 100) : 0}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>4. Settled Wins</span>
                  <span>{data.funnel.settled}</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#0f766e] h-full"
                    style={{
                      width: `${data.funnel.referred ? Math.round((data.funnel.settled / data.funnel.referred) * 100) : 0}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-rose-700 mb-1">
                  <span>5. Closed Lost</span>
                  <span>{data.funnel.lost}</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-rose-500 h-full"
                    style={{
                      width: `${data.funnel.referred ? Math.round((data.funnel.lost / data.funnel.referred) * 100) : 0}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
