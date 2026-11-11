"use client";

import React from "react";
import { Download, TrendingUp, CheckCircle, FileText, Briefcase } from "lucide-react";
import { Deal } from "@/lib/api";

interface SalesReportingViewProps {
  deals: Deal[];
}

export const SalesReportingView: React.FC<SalesReportingViewProps> = ({ deals }) => {
  const parseAmount = (val: string) =>
    Number(String(val).replace(/[$,]/g, "").replace(/[^\d.-]/g, "")) || 0;

  const settledDeals = deals.filter((d) => d.status === "Settled");
  const inFlightDeals = deals.filter((d) =>
    [
      "Lead received",
      "Customer invited",
      "Application submitted",
      "Waiting on customer",
      "In assessment",
      "Approved",
      "Docs / settlement",
      "Application received",
    ].includes(d.status)
  );

  const totalSettledAmount = settledDeals.reduce(
    (sum, d) => sum + parseAmount(d.amount),
    0
  );
  const convertedAccounts = settledDeals.length;

  const totalInFlightAmount = inFlightDeals.reduce(
    (sum, d) => sum + parseAmount(d.amount),
    0
  );

  const formatCurrency = (amount: number) =>
    amount.toLocaleString("en-AU", {
      style: "currency",
      currency: "AUD",
      maximumFractionDigits: 0,
    });

  const exportSalesCsv = () => {
    const csv = [
      "DEAL ID,BUSINESS NAME,DIRECTOR,FACILITY AMOUNT,TYPE,STATUS,SUBMITTED DATE",
      ...deals.map((item) =>
        [
          item.id,
          item.name,
          item.applicant,
          item.amount,
          item.type,
          item.status,
          item.submittedDate,
        ]
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kredo-sales-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status: Deal["status"]) => {
    switch (status) {
      case "Settled":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "Approved":
      case "Docs / settlement":
        return "bg-teal-50 text-teal-800 border-teal-200";
      case "In assessment":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Waiting on customer":
      case "Customer invited":
      case "Lead received":
      case "Application submitted":
        return "bg-sky-50 text-sky-800 border-sky-200";
      case "Closed Lost":
      case "Declined":
      case "Declined / withdrawn":
        return "bg-rose-50 text-rose-800 border-rose-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Export CSV */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <span className="w-4 h-0.5 bg-slate-300"></span>
            <span>PERFORMANCE & VOLUME</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0a1926] tracking-tight mt-1">
            Sales Reporting
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Track total loan volume completed and client accounts converted.
          </p>
          <div className="w-12 h-0.5 bg-amber-600 mt-5"></div>
        </div>

        <button
          onClick={exportSalesCsv}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs shadow-2xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Export Sales CSV</span>
        </button>
      </div>

      {/* 3 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Completed Referral Value */}
        <div className="bg-[#effbf3] border border-[#d3f4de] rounded-2xl p-6 relative overflow-hidden shadow-2xs">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#15803d]">
              COMPLETED REFERRALS ($)
            </span>
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-xl sm:text-2xl font-bold text-[#0a1926] tracking-tight">
              {formatCurrency(totalSettledAmount)}
            </div>
            <div className="text-xs font-medium text-emerald-800 mt-2">
              Total loan value settled
            </div>
          </div>
        </div>

        {/* Card 2: Accounts Converted */}
        <div className="bg-[#0a1926] text-white border border-[#162f49] rounded-2xl p-6 relative overflow-hidden shadow-md">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
              ACCOUNTS CONVERTED
            </span>
            <div className="w-8 h-8 rounded-full bg-[#1b344d] flex items-center justify-center text-sky-300">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {convertedAccounts}
            </div>
            <div className="text-xs font-medium text-slate-300 mt-2">
              Clients successfully funded
            </div>
          </div>
        </div>

        {/* Card 3: In Pipeline */}
        <div className="bg-[#d4eaf7] border border-[#bedcf0] rounded-2xl p-6 relative overflow-hidden shadow-2xs">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2d5573]">
              IN PIPELINE
            </span>
            <div className="w-8 h-8 rounded-full bg-white/70 flex items-center justify-center text-[#1c4b70]">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-xl sm:text-2xl font-bold text-[#0a1926] tracking-tight">
              {formatCurrency(totalInFlightAmount)}
            </div>
            <div className="text-xs font-medium text-[#2d5573] mt-2">
              {inFlightDeals.length} active applications
            </div>
          </div>
        </div>
      </div>

      {/* Referrals table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Referred Clients Performance</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live status and conversion details for all referred clients
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg">
            {deals.length} Total Referrals
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/60 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-6">BUSINESS / CLIENT</th>
                <th className="py-3.5 px-4">DIRECTOR</th>
                <th className="py-3.5 px-4 text-center">FACILITY AMOUNT</th>
                <th className="py-3.5 px-4">TYPE</th>
                <th className="py-3.5 px-6 text-center">STAGE</th>
                <th className="py-3.5 px-6 text-right">DATE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {deals.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No referrals recorded yet.
                  </td>
                </tr>
              ) : (
                deals.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900 text-sm">{row.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">{row.id}</div>
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-700">
                      {row.applicant}
                    </td>
                    <td className="py-4 px-4 text-center font-bold text-slate-900">
                      {row.amount}
                    </td>
                    <td className="py-4 px-4 text-slate-600 font-medium">
                      {row.type}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`inline-block px-3 py-0.5 rounded-full text-[11px] font-semibold border ${getStatusBadge(
                          row.status
                        )}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right text-slate-500">
                      {row.submittedDate}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

