"use client";

import React, { useState } from "react";
import { Search, Download, ChevronRight, SlidersHorizontal, ArrowDownCircle, Users, Send, Clock, AlertCircle } from "lucide-react";
import { MasterPipelineDeal, PipelineStageCounts } from "@/lib/api";

interface MasterPipelineViewProps {
  deals: MasterPipelineDeal[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSelectDeal: (dealId: string) => void;
  stageCounts?: PipelineStageCounts;
}

export const MasterPipelineView: React.FC<MasterPipelineViewProps> = ({
  deals,
  searchTerm,
  onSearchChange,
  onSelectDeal,
  stageCounts = {
    leadReceived: 0,
    customerInvited: 0,
    applicationSubmitted: 0,
    waitingOnCustomer: 0,
  },
}) => {
  const [stageFilter, setStageFilter] = useState("All stages");

  const stages = [
    "All stages",
    "Lead received",
    "Customer invited",
    "Application submitted",
    "Waiting on customer",
    "In assessment",
    "Approved",
    "Docs / settlement",
    "Settled",
    "Closed Lost",
    "Declined / withdrawn",
  ];

  const filtered = deals.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.partnerCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.id.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesStage = true;
    if (stageFilter !== "All stages") {
      if (stageFilter === "Closed Lost") {
        matchesStage = ["Closed Lost", "Declined", "Declined / withdrawn"].includes(d.stage);
      } else {
        matchesStage = d.stage === stageFilter;
      }
    }
    return matchesSearch && matchesStage;
  });

  const getStageBadge = (stage: string) => {
    switch (stage) {
      case "In assessment":
        return "bg-[#fef9ee] text-[#b45309] border-[#fdecd0]";
      case "Approved":
        return "bg-[#effbf3] text-[#15803d] border-[#d3f4de]";
      case "Docs / settlement":
      case "Settled":
        return "bg-[#f0fbf5] text-[#166534] border-[#d6f6e2]";
      case "Lead received":
        return "bg-sky-50 text-sky-800 border-sky-200";
      case "Customer invited":
        return "bg-indigo-50 text-indigo-800 border-indigo-200";
      case "Application submitted":
      case "Application received":
        return "bg-[#f0f7ff] text-[#0284c7] border-[#bae6fd]";
      case "Waiting on customer":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Closed Lost":
      case "Declined":
      case "Declined / withdrawn":
        return "bg-[#fef2f2] text-[#dc2626] border-[#fecaca]";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const exportCsv = () => {
    const rows = [
      "REFERENCE,BUSINESS,PARTNER,PARTNER CODE,SUBMITTED,STAGE,AMOUNT,COMMISSION,LOST REASON",
      ...filtered.map((deal) =>
        [
          deal.id,
          deal.name,
          deal.partner,
          deal.partnerCode,
          deal.submitted,
          deal.stage,
          deal.amountBand,
          deal.commission,
          deal.lostReason || "",
        ]
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(","),
      ),
    ];
    const url = URL.createObjectURL(new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "kredo-master-pipeline.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Helper to click on stage tile
  const handleStageTileClick = (targetStage: string) => {
    if (stageFilter === targetStage) {
      setStageFilter("All stages");
    } else {
      setStageFilter(targetStage);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <span className="w-4 h-0.5 bg-slate-300"></span>
            <span>ALL PARTNER BOOKS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a1926] tracking-tight mt-1">
            Master Pipeline
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Filter attributed applications, inspect diary notes, and manage deal lifecycle stages.
          </p>
        </div>

        <button
          onClick={exportCsv}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs shadow-2xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Section 4.4: 4 Pipeline Stage Tiles displaying raw live counts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Tile 1: Lead received */}
        <div
          onClick={() => handleStageTileClick("Lead received")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
            stageFilter === "Lead received"
              ? "bg-sky-50 border-sky-400 ring-2 ring-sky-300"
              : "bg-white border-slate-200 hover:border-sky-300 shadow-2xs"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              1. Lead received
            </span>
            <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center">
              <Send className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 text-3xl font-extrabold text-[#0a1926] tracking-tight">
            {stageCounts.leadReceived}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Initial introduction</div>
        </div>

        {/* Tile 2: Customer invited */}
        <div
          onClick={() => handleStageTileClick("Customer invited")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
            stageFilter === "Customer invited"
              ? "bg-indigo-50 border-indigo-400 ring-2 ring-indigo-300"
              : "bg-white border-slate-200 hover:border-indigo-300 shadow-2xs"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              2. Customer invited
            </span>
            <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 text-3xl font-extrabold text-[#0a1926] tracking-tight">
            {stageCounts.customerInvited}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Link shared with client</div>
        </div>

        {/* Tile 3: Application submitted */}
        <div
          onClick={() => handleStageTileClick("Application submitted")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
            stageFilter === "Application submitted"
              ? "bg-blue-50 border-blue-400 ring-2 ring-blue-300"
              : "bg-white border-slate-200 hover:border-blue-300 shadow-2xs"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              3. App submitted
            </span>
            <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
              <ArrowDownCircle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 text-3xl font-extrabold text-[#0a1926] tracking-tight">
            {stageCounts.applicationSubmitted}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Form completed online</div>
        </div>

        {/* Tile 4: Waiting on customer */}
        <div
          onClick={() => handleStageTileClick("Waiting on customer")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
            stageFilter === "Waiting on customer"
              ? "bg-amber-50 border-amber-400 ring-2 ring-amber-300"
              : "bg-white border-slate-200 hover:border-amber-300 shadow-2xs"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              4. Waiting on customer
            </span>
            <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 text-3xl font-extrabold text-[#0a1926] tracking-tight">
            {stageCounts.waitingOnCustomer}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Awaiting docs / financials</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-2.5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 px-3">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search business, partner, code, or reference ID..."
            className="w-full text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden py-1.5"
          />
        </div>

        <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-3">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">Stage Filter:</span>
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="text-xs font-medium text-slate-700 bg-transparent py-1.5 pr-6 focus:outline-hidden"
          >
            {stages.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pipeline Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-4 sm:px-6">Reference</th>
                <th className="py-3.5 px-4">Business</th>
                <th className="py-3.5 px-4">Partner</th>
                <th className="py-3.5 px-4">Submitted</th>
                <th className="py-3.5 px-4">Stage</th>
                <th className="py-3.5 px-4">Facility Amount</th>
                <th className="py-3.5 px-4">Commission</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No pipeline deals found.
                  </td>
                </tr>
              ) : (
                filtered.map((deal) => (
                  <tr
                    key={deal.id}
                    onClick={() => onSelectDeal(deal.id)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-slate-900 group-hover:text-sky-700">
                      {deal.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{deal.name}</div>
                      {deal.lostReason && (
                        <div className="text-[10px] text-rose-600 font-medium mt-0.5">
                          Lost reason: {deal.lostReason}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">{deal.partner}</div>
                      <div className="font-mono text-[10px] text-slate-400">{deal.partnerCode}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-medium">{deal.submitted}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getStageBadge(deal.stage)}`}>
                        {deal.stage}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">{deal.amountBand}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-700">{deal.commission}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0a1926] group-hover:text-sky-700 transition-colors">
                        <span>Notes & Stage</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
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
