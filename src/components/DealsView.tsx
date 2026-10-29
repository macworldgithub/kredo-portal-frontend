"use client";

import React, { useState } from "react";
import { Search, ChevronDown, Download, ChevronRight, XCircle, FileText, CheckCircle2 } from "lucide-react";
import { Deal } from "@/lib/api";

interface DealsViewProps {
  deals: any[];
  onSelectDeal: (deal: any) => void;
  initialStageFilter?: string;
}

export const DealsView: React.FC<DealsViewProps> = ({
  deals,
  onSelectDeal,
  initialStageFilter = "All stages",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState(initialStageFilter);
  const [activeTab, setActiveTab] = useState<"all" | "active" | "settled" | "lost">("all");

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
    "Declined",
  ];

  const filteredDeals = deals.filter((deal) => {
    const matchesSearch =
      (deal.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (deal.id || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (deal.applicant || "").toLowerCase().includes(searchTerm.toLowerCase());

    let matchesTab = true;
    if (activeTab === "active") {
      matchesTab = ![
        "Settled",
        "Closed Lost",
        "Declined",
        "Declined / withdrawn",
      ].includes(deal.stage);
    } else if (activeTab === "settled") {
      matchesTab = deal.stage === "Settled";
    } else if (activeTab === "lost") {
      matchesTab = ["Closed Lost", "Declined", "Declined / withdrawn"].includes(deal.stage);
    }

    let matchesStage = true;
    if (stageFilter !== "All stages") {
      if (stageFilter === "Closed Lost" || stageFilter === "Lost") {
        matchesStage = ["Closed Lost", "Declined", "Declined / withdrawn"].includes(deal.stage);
      } else if (stageFilter === "In flight") {
        matchesStage = ![
          "Settled",
          "Closed Lost",
          "Declined",
          "Declined / withdrawn",
        ].includes(deal.stage);
      } else {
        matchesStage = deal.stage === stageFilter;
      }
    }

    return matchesSearch && matchesTab && matchesStage;
  });

  const getStageBadge = (stage: string) => {
    switch (stage) {
      case "In assessment":
        return "bg-[#fffbeb] text-[#b45309] border-[#fef3c7]";
      case "Approved":
        return "bg-[#ecfdf5] text-[#047857] border-[#d1fae5]";
      case "Docs / settlement":
        return "bg-[#f0fdf4] text-[#15803d] border-[#bbf7d0]";
      case "Settled":
        return "bg-[#f0fdfa] text-[#0f766e] border-[#ccfbf1]";
      case "Closed Lost":
      case "Declined":
      case "Declined / withdrawn":
        return "bg-[#fef2f2] text-[#b91c1c] border-[#fecaca]";
      default:
        return "bg-[#eff6ff] text-[#1d4ed8] border-[#dbeafe]";
    }
  };

  const exportCsv = () => {
    const rows = [
      "ID,BUSINESS,APPLICANT,SUBMITTED,STAGE,AMOUNT,COMMISSION,LOST REASON",
      ...filteredDeals.map((d) =>
        [
          d.id,
          d.name,
          d.applicant || "",
          d.submitted || "",
          d.stage || "",
          d.facility || d.amountBand || "",
          d.commission || "",
          d.lostReason || "",
        ]
          .map((v) => `"${String(v).replaceAll('"', '""')}"`)
          .join(","),
      ),
    ];
    const url = URL.createObjectURL(new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "kredo-partner-deals.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <span className="w-4 h-0.5 bg-slate-300"></span>
            <span>YOUR REFERRAL LEDGER</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a1926] tracking-tight mt-1">
            Deals & Applications
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Track active deals, celebrate settlements, and inspect lost deal feedback for closure.
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

      {/* Filter Tabs - Section 4.2: Added "Lost" tab so partners see both wins and losses */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => {
            setActiveTab("all");
            setStageFilter("All stages");
          }}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeTab === "all" ? "bg-[#0a1926] text-white" : "bg-white text-slate-600 hover:bg-slate-100"
          }`}
        >
          All Deals ({deals.length})
        </button>
        <button
          onClick={() => {
            setActiveTab("active");
            setStageFilter("All stages");
          }}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeTab === "active" ? "bg-[#0a1926] text-white" : "bg-white text-slate-600 hover:bg-slate-100"
          }`}
        >
          In Flight
        </button>
        <button
          onClick={() => {
            setActiveTab("settled");
            setStageFilter("Settled");
          }}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeTab === "settled" ? "bg-emerald-700 text-white" : "bg-white text-slate-600 hover:bg-slate-100"
          }`}
        >
          Settled Wins
        </button>
        <button
          onClick={() => {
            setActiveTab("lost");
            setStageFilter("Closed Lost");
          }}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "lost" ? "bg-rose-700 text-white" : "bg-white text-rose-700 border border-rose-200 hover:bg-rose-50"
          }`}
        >
          <XCircle className="w-3.5 h-3.5" />
          <span>Lost & Declined</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-2 sm:p-2.5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 px-3">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search deal name, reference ID, or applicant..."
            className="w-full text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden py-1.5"
          />
        </div>

        <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-3">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">Stage:</span>
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

      {/* Deals Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-4 sm:px-6">Reference</th>
                <th className="py-3.5 px-4">Business / Applicant</th>
                <th className="py-3.5 px-4">Submitted</th>
                <th className="py-3.5 px-4">Stage</th>
                <th className="py-3.5 px-4">Facility Amount</th>
                <th className="py-3.5 px-4">Commission</th>
                <th className="py-3.5 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredDeals.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No deals match the selected criteria.
                  </td>
                </tr>
              ) : (
                filteredDeals.map((deal) => (
                  <tr
                    key={deal.id}
                    onClick={() => onSelectDeal(deal)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-slate-900 group-hover:text-sky-700">
                      {deal.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{deal.name}</div>
                      {deal.applicant && <div className="text-[11px] text-slate-500">{deal.applicant}</div>}
                      {deal.lostReason && (
                        <div className="text-[10.5px] text-rose-600 font-medium mt-0.5">
                          Reason: {deal.lostReason}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-medium">{deal.submitted}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getStageBadge(deal.stage)}`}>
                        {deal.stage}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">{deal.facility || deal.amountBand}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-emerald-700">{deal.commission}</div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">{deal.commissionStatus}</div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0a1926] group-hover:text-sky-700 transition-colors">
                        <span>Inspect</span>
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
