"use client";

import React, { useState } from "react";
import { Download, Bell, ExternalLink } from "lucide-react";

export const MasterReportsView: React.FC = () => {
  const [weeklyAlert, setWeeklyAlert] = useState(false);

  return (
    <div className="space-y-6">
      {/* Title & Download report button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <span className="w-4 h-0.5 bg-slate-300"></span>
            <span>PARTNER INTELLIGENCE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a1926] tracking-tight mt-1">
            Reports
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Understand where referred work starts, where it converts, and what is owed.
          </p>
          <div className="w-12 h-0.5 bg-amber-600 mt-5"></div>
        </div>

        <button 
          onClick={() => alert("Downloading master intelligence report...")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0a1926] hover:bg-[#14293d] text-white font-bold text-xs shadow-md transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4 text-sky-400" />
          <span>Download report</span>
        </button>
      </div>

      {/* Two Split Cards: Source mix (Left) & Partner performance (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Source mix Card with Donut Chart */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Source mix</h3>
            <p className="text-xs text-slate-400">How attributed leads entered</p>

            <div className="py-6 flex flex-col sm:flex-row items-center justify-around gap-6">
              {/* Donut Chart SVG */}
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Tracked link: 46% stroke */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#1e4868"
                    strokeWidth="15"
                    fill="transparent"
                    strokeDasharray="110 240"
                    strokeDashoffset="0"
                  />
                  {/* Typed code: 32% stroke */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#c79744"
                    strokeWidth="15"
                    fill="transparent"
                    strokeDasharray="76 240"
                    strokeDashoffset="-110"
                  />
                  {/* Hero page: 22% stroke */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#7dc5eb"
                    strokeWidth="15"
                    fill="transparent"
                    strokeDasharray="54 240"
                    strokeDashoffset="-186"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-black text-[#0a1926] leading-none">62</span>
                  <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider mt-1">REFERRALS</span>
                </div>
              </div>

              {/* Legend matching screenshot */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1e4868]"></span>
                    <span className="text-slate-600 font-medium">Tracked link</span>
                  </div>
                  <strong className="text-slate-900 font-bold">46%</strong>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#c79744]"></span>
                    <span className="text-slate-600 font-medium">Typed code</span>
                  </div>
                  <strong className="text-slate-900 font-bold">32%</strong>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7dc5eb]"></span>
                    <span className="text-slate-600 font-medium">Hero page</span>
                  </div>
                  <strong className="text-slate-900 font-bold">22%</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partner performance matching screenshot */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Partner performance</h3>
                <p className="text-xs text-slate-400">Settled volume · September</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                Monthly
              </span>
            </div>

            <div className="space-y-4 pt-2">
              {/* Row 1: Mark Carroll */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-900">Mark Carroll</span>
                  <span className="text-slate-900">$640k</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#b45309] h-full rounded-full w-[100%]"></div>
                </div>
              </div>

              {/* Row 2: Hayes Partners */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-900">Hayes Partners</span>
                  <span className="text-slate-900">$380k</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#1e4868] h-full rounded-full w-[60%]"></div>
                </div>
              </div>

              {/* Row 3: North & Kind Advisory */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-900">North & Kind Advisory</span>
                  <span className="text-slate-900">$295k</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#1e4868] h-full rounded-full w-[46%]"></div>
                </div>
              </div>

              {/* Row 4: Brightwater Accounting */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-900">Brightwater Accounting</span>
                  <span className="text-slate-900">$110k</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#1e4868] h-full rounded-full w-[18%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Card: Weekly report to Craig */}
      <div className="bg-[#d4eaf7]/70 border border-[#bedcf0] rounded-2xl p-5 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-sky-800 shadow-2xs">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Weekly report to Craig</h4>
            <p className="text-xs text-slate-500">Partners, funnel, commissions and exceptions · Mondays at 7:30am AEST</p>
          </div>
        </div>

        {/* Toggle switch */}
        <button
          type="button"
          onClick={() => setWeeklyAlert(!weeklyAlert)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${
            weeklyAlert ? 'bg-[#1e4868]' : 'bg-slate-300'
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
              weeklyAlert ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    </div>
  );
};
