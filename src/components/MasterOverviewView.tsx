"use client";

import React, { useState } from "react";
import { Plus, Users, GitBranch, ArrowUpRight, TrendingUp, DollarSign } from "lucide-react";
import { TOP_PARTNERS, NETWORK_DEALS } from "../data/netlifyData";

interface MasterOverviewViewProps {
  onNavigateToPartners: () => void;
  onNavigateToPipeline: () => void;
}

export const MasterOverviewView: React.FC<MasterOverviewViewProps> = ({
  onNavigateToPartners,
  onNavigateToPipeline,
}) => {
  return (
    <div className="space-y-6">
      {/* Title & Add partner button - navigates to Partners directory */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <span className="w-4 h-0.5 bg-slate-300"></span>
            <span>KREDO MASTER</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a1926] tracking-tight mt-1">
            Good morning, Craig.
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

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: ACTIVE PARTNERS (sky card) */}
        <div className="bg-[#d4eaf7] border border-[#bedcf0] rounded-2xl p-6 relative overflow-hidden shadow-2xs">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2d5573]">
              ACTIVE PARTNERS
            </span>
            <div className="w-8 h-8 rounded-full bg-white/70 flex items-center justify-center text-[#1c4b70]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-4xl font-extrabold text-[#0a1926] tracking-tight">24</div>
            <div className="text-xs font-medium text-[#2d5573] mt-2">3 added this month</div>
          </div>
        </div>

        {/* Card 2: IN-FLIGHT DEALS */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 relative overflow-hidden shadow-2xs">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              IN-FLIGHT DEALS
            </span>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
              <GitBranch className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-4xl font-extrabold text-[#0a1926] tracking-tight">41</div>
            <div className="text-xs font-medium text-slate-500 mt-2">$3.2m requested</div>
          </div>
        </div>

        {/* Card 3: SETTLED THIS MONTH */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 relative overflow-hidden shadow-2xs">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              SETTLED THIS MONTH
            </span>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-4xl font-extrabold text-[#0a1926] tracking-tight">$1.48m</div>
            <div className="text-xs font-medium text-slate-500 mt-2">Across 11 facilities</div>
          </div>
        </div>

        {/* Card 4: COMMISSION ACCRUED (dark card) */}
        <div className="bg-[#0a1926] text-white border border-[#162f49] rounded-2xl p-6 relative overflow-hidden shadow-md">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
              COMMISSION ACCRUED
            </span>
            <div className="w-8 h-8 rounded-full bg-[#1b344d] flex items-center justify-center text-sky-300">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-4xl font-extrabold text-white tracking-tight">$31,725</div>
            <div className="text-xs font-medium text-slate-300 mt-2">$18,450 confirmed</div>
          </div>
        </div>
      </div>

      {/* Middle Split: Referral Funnel (Left) & Top Partners (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Referral funnel */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Referral funnel</h3>
              <p className="text-xs text-slate-400">September · all partners</p>
            </div>
            <button className="text-xs font-bold text-slate-700 hover:text-sky-600 transition-colors">
              Full report
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                <span>Referred</span>
                <span className="text-sm">62</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#1e4868] h-full rounded-full w-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                <span>Application received</span>
                <span className="text-sm">51</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#1e4868] h-full rounded-full w-[82%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                <span>Approved</span>
                <span className="text-sm">29</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#1e4868] h-full rounded-full w-[46%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                <span>Settled</span>
                <span className="text-sm">18</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#b45309] h-full rounded-full w-[29%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Top partners */}
        <div className="lg:col-span-5 bg-[#d4eaf7]/70 border border-[#bedcf0] rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Top partners</h3>
                <p className="text-xs text-slate-500">By settled volume</p>
              </div>
              <TrendingUp className="w-4 h-4 text-sky-800" />
            </div>

            <div className="space-y-3">
              {TOP_PARTNERS.map((p) => (
                <div
                  key={p.code}
                  className="bg-white rounded-xl p-3.5 flex items-center justify-between border border-white/80 shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-slate-100 font-bold text-xs text-slate-700 flex items-center justify-center">
                      {p.rank}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{p.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{p.code} · {p.deals}</div>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-slate-900">{p.volume}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Table: Latest across the network */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Latest across the network</h3>
          <button
            onClick={onNavigateToPipeline}
            className="flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-800 cursor-pointer"
          >
            <span>Open pipeline</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/60 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-6">REF / BUSINESS</th>
                <th className="py-3.5 px-4">PARTNER</th>
                <th className="py-3.5 px-4">SUBMITTED</th>
                <th className="py-3.5 px-4 text-center">STAGE</th>
                <th className="py-3.5 px-4 text-center">AMOUNT BAND</th>
                <th className="py-3.5 px-6">COMMISSION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {NETWORK_DEALS.map((deal) => (
                <tr key={deal.ref + deal.partner} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-6">
                    <div className="font-bold text-slate-900 text-xs">{deal.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{deal.ref}</div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">
                    {deal.partner}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {deal.submitted}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                      deal.stage === 'Settled'
                        ? 'bg-[#effbf3] text-[#15803d] border-[#d3f4de]'
                        : deal.stage === 'In assessment'
                        ? 'bg-[#fef9ee] text-[#b45309] border-[#fdecd0]'
                        : 'bg-[#f0fbf5] text-[#166534] border-[#d6f6e2]'
                    }`}>
                      {deal.stage}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-800">
                    {deal.amountBand}
                  </td>
                  <td className="py-3.5 px-6 font-bold text-slate-900">
                    {deal.commission}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
