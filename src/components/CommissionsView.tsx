"use client";

import React from "react";
import { Download, TrendingUp, CheckCircle, FileText } from "lucide-react";
import { CommissionItem } from "../data/mockData";

export const CommissionsView: React.FC<{ commissions: CommissionItem[] }> = ({ commissions }) => {
  const sumByStatus = (status: CommissionItem["status"]) =>
    commissions
      .filter((item) => item.status === status)
      .reduce((total, item) => total + (Number(item.commissionAmount.replace(/[^\d.-]/g, "")) || 0), 0);
  const formatCurrency = (amount: number) =>
    amount.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });
  return (
    <div className="space-y-6">
      {/* Title & Export CSV */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <span className="w-4 h-0.5 bg-slate-300"></span>
            <span>YOUR STATEMENT</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a1926] tracking-tight mt-1">
            Commissions
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            A clear ledger from estimate to payment, with the rule visible on every line.
          </p>
          <div className="w-12 h-0.5 bg-amber-600 mt-5"></div>
        </div>

        <button 
          onClick={() => {
            const csv = [
              "DEAL,CLIENT,SETTLED AMOUNT,RATE,COMMISSION,STATUS",
              ...commissions.map((item) =>
                [item.dealName, item.client, item.settledAmount, item.rate, item.commissionAmount, item.status]
                  .map((value) => `"${String(value).replaceAll('"', '""')}"`)
                  .join(","),
              ),
            ].join("\n");
            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "kredo-commissions-september.csv";
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs shadow-2xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* 3 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Sky Card ESTIMATED */}
        <div className="bg-[#d4eaf7] border border-[#bedcf0] rounded-2xl p-6 relative overflow-hidden shadow-2xs">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2d5573]">
              ESTIMATED
            </span>
            <div className="w-8 h-8 rounded-full bg-white/70 flex items-center justify-center text-[#1c4b70]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-4xl font-extrabold text-[#0a1926] tracking-tight">{formatCurrency(sumByStatus("Processing"))}</div>
            <div className="text-xs font-medium text-[#2d5573] mt-2">Current period</div>
          </div>
        </div>

        {/* Card 2: White Card CONFIRMED */}
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
            <div className="text-4xl font-extrabold text-[#0a1926] tracking-tight">{formatCurrency(sumByStatus("Confirmed"))}</div>
            <div className="text-xs font-medium text-slate-500 mt-2">Awaiting approval</div>
          </div>
        </div>

        {/* Card 3: Dark Card PAID YTD */}
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
            <div className="text-4xl font-extrabold text-white tracking-tight">{formatCurrency(sumByStatus("Paid"))}</div>
            <div className="text-xs font-medium text-slate-300 mt-2">Total paid commissions</div>
          </div>
        </div>
      </div>

      {/* September statement table */}
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
                <th className="py-3.5 px-4 text-center">RULE</th>
                <th className="py-3.5 px-4 text-center">FACILITY</th>
                <th className="py-3.5 px-6 text-center">COMMISSION</th>
                <th className="py-3.5 px-6 text-center">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {commissions.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900 text-sm">{row.dealName}</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">{row.dealId}</div>
                  </td>
                  <td className="py-4 px-4 text-center font-bold text-slate-800">
                    {row.rate}
                  </td>
                  <td className="py-4 px-4 text-center font-medium text-slate-600">
                    {row.settledAmount}
                  </td>
                  <td className="py-4 px-6 text-center font-bold text-slate-900">
                    {row.commissionAmount}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`inline-block px-3 py-0.5 rounded-full text-[11px] font-semibold border ${
                      row.status === 'Confirmed' || row.status === 'Paid'
                        ? 'bg-[#effbf3] text-[#15803d] border-[#d3f4de]'
                        : 'bg-[#fef9ee] text-[#b45309] border-[#fdecd0]'
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
