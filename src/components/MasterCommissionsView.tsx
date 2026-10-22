"use client";

import React from "react";
import { Download, TrendingUp, CheckCircle, FileText } from "lucide-react";

interface MasterCommissionRow {
  deal: string;
  id: string;
  partner: string;
  rule: string;
  facility: string;
  commission: string;
  status: 'Confirmed' | 'Estimated' | 'Paid';
}

const MASTER_COMMISSIONS_STATEMENT: MasterCommissionRow[] = [
  {
    deal: "Northbank Hospitality",
    id: "KRD-2788",
    partner: "Hayes Partners",
    rule: "1.55%",
    facility: "$200,000",
    commission: "$3,100",
    status: "Confirmed",
  },
  {
    deal: "Pilbara Civil Works",
    id: "KRD-2819",
    partner: "Hayes Partners",
    rule: "1.50%",
    facility: "$320,000",
    commission: "$4,800",
    status: "Estimated",
  },
  {
    deal: "Wild Coast Joinery",
    id: "KRD-2764",
    partner: "Mark Carroll",
    rule: "Fixed fee",
    facility: "$82,000",
    commission: "$1,250",
    status: "Confirmed",
  },
  {
    deal: "Maven Allied Care",
    id: "KRD-2690",
    partner: "North & Kind Advisory",
    rule: "Fixed fee",
    facility: "$145,000",
    commission: "$2,000",
    status: "Paid",
  },
];

export const MasterCommissionsView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Title & Actions strictly matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <span className="w-4 h-0.5 bg-slate-300"></span>
            <span>FINANCE CONTROLS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a1926] tracking-tight mt-1">
            Commissions
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            One ledger for percentage and fixed-fee partner arrangements.
          </p>
          <div className="w-12 h-0.5 bg-amber-600 mt-5"></div>
        </div>

        <button 
          onClick={() => alert("Exporting Master Commissions CSV...")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs shadow-2xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* 3 Summary Cards matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: ACCRUED ($31,725) */}
        <div className="bg-[#d4eaf7] border border-[#bedcf0] rounded-2xl p-6 relative overflow-hidden shadow-2xs">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2d5573]">
              ACCRUED
            </span>
            <div className="w-8 h-8 rounded-full bg-white/70 flex items-center justify-center text-[#1c4b70]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-4xl font-extrabold text-[#0a1926] tracking-tight">$31,725</div>
            <div className="text-xs font-medium text-[#2d5573] mt-2">Current period</div>
          </div>
        </div>

        {/* Card 2: CONFIRMED ($18,450) */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 relative overflow-hidden shadow-2xs">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              CONFIRMED
            </span>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-4xl font-extrabold text-[#0a1926] tracking-tight">$18,450</div>
            <div className="text-xs font-medium text-slate-500 mt-2">Awaiting approval</div>
          </div>
        </div>

        {/* Card 3: PAID YTD ($86,290) */}
        <div className="bg-[#0a1926] text-white border border-[#162f49] rounded-2xl p-6 relative overflow-hidden shadow-md">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
              PAID YTD
            </span>
            <div className="w-8 h-8 rounded-full bg-[#1b344d] flex items-center justify-center text-sky-300">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-4xl font-extrabold text-white tracking-tight">$86,290</div>
            <div className="text-xs font-medium text-slate-300 mt-2">Through 31 August</div>
          </div>
        </div>
      </div>

      {/* September statement table strictly matching screenshot */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">September statement</h3>
            <p className="text-xs text-slate-400 mt-0.5">Rule snapshot locked against each eligible deal</p>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg">
            01–30 Sep 2026
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/60 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-6">DEAL</th>
                <th className="py-3.5 px-4">PARTNER</th>
                <th className="py-3.5 px-4 text-center">RULE</th>
                <th className="py-3.5 px-4 text-center">FACILITY</th>
                <th className="py-3.5 px-6 text-center">COMMISSION</th>
                <th className="py-3.5 px-6 text-center">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MASTER_COMMISSIONS_STATEMENT.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900 text-sm">{row.deal}</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">{row.id}</div>
                  </td>
                  <td className="py-4 px-4 font-semibold text-slate-800">
                    {row.partner}
                  </td>
                  <td className="py-4 px-4 text-center font-bold text-slate-800">
                    {row.rule}
                  </td>
                  <td className="py-4 px-4 text-center font-medium text-slate-600">
                    {row.facility}
                  </td>
                  <td className="py-4 px-6 text-center font-bold text-slate-900">
                    {row.commission}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`inline-block px-3 py-0.5 rounded-full text-[11px] font-semibold border ${
                      row.status === 'Confirmed'
                        ? 'bg-[#effbf3] text-[#15803d] border-[#d3f4de]'
                        : row.status === 'Estimated'
                        ? 'bg-[#fef9ee] text-[#b45309] border-[#fdecd0]'
                        : 'bg-[#effbf3] text-[#15803d] border-[#d3f4de]'
                    }`}>
                      {row.status}
                    </span>
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
