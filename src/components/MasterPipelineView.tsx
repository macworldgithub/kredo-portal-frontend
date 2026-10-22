"use client";

import React, { useState } from "react";
import { Search, ChevronDown, SlidersHorizontal, Download, ChevronRight } from "lucide-react";

interface MasterPipelineDeal {
  id: string;
  name: string;
  partner: string;
  partnerCode: string;
  submitted: string;
  stage: 'In assessment' | 'Approved' | 'Docs / settlement' | 'Settled' | 'Application received' | 'Declined / withdrawn';
  amountBand: string;
  commission: string;
}

const MASTER_PIPELINE_DEALS: MasterPipelineDeal[] = [
  {
    id: "KRD-2841",
    name: "Oak & Reed Landscaping",
    partner: "Hayes Partners",
    partnerCode: "HAYES01",
    submitted: "Today, 9:42am",
    stage: "In assessment",
    amountBand: "$100k-$250k",
    commission: "$2,375 est.",
  },
  {
    id: "KRD-2832",
    name: "Harbour Health Group",
    partner: "Hayes Partners",
    partnerCode: "HAYES01",
    submitted: "15 Sep, 2:18pm",
    stage: "Approved",
    amountBand: "$50k-$100k",
    commission: "$1,500 est.",
  },
  {
    id: "KRD-2819",
    name: "Pilbara Civil Works",
    partner: "Hayes Partners",
    partnerCode: "HAYES01",
    submitted: "12 Sep, 11:05am",
    stage: "Docs / settlement",
    amountBand: "$250k-$500k",
    commission: "$4,800 est.",
  },
  {
    id: "KRD-2788",
    name: "Northbank Hospitality",
    partner: "Hayes Partners",
    partnerCode: "HAYES01",
    submitted: "8 Sep, 4:30pm",
    stage: "Settled",
    amountBand: "$100k-$250k",
    commission: "$3,100 confirmed",
  },
  {
    id: "KRD-2764",
    name: "Wild Coast Joinery",
    partner: "Mark Carroll",
    partnerCode: "SPUD",
    submitted: "4 Sep, 10:16am",
    stage: "Settled",
    amountBand: "$50k-$100k",
    commission: "$1,250 confirmed",
  },
  {
    id: "KRD-2748",
    name: "Alloy Fleet Services",
    partner: "North & Kind Advisory",
    partnerCode: "NORTHK",
    submitted: "2 Sep, 1:08pm",
    stage: "Application received",
    amountBand: "$250k-$500k",
    commission: "$2,000 est.",
  },
  {
    id: "KRD-2721",
    name: "Mallee Produce Co.",
    partner: "Brightwater Accounting",
    partnerCode: "BRIGHT7",
    submitted: "29 Aug, 8:51am",
    stage: "Declined / withdrawn",
    amountBand: "$25k-$50k",
    commission: "—",
  },
];

export const MasterPipelineView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("All stages");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const stages = [
    "All stages",
    "New enquiry",
    "Application received",
    "In assessment",
    "Approved",
    "Docs / settlement",
    "Settled",
    "Declined / withdrawn",
  ];
  const filtered = MASTER_PIPELINE_DEALS.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === "All stages" || d.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const getStageBadge = (stage: MasterPipelineDeal['stage']) => {
    switch (stage) {
      case 'In assessment':
        return 'bg-[#fef9ee] text-[#b45309] border-[#fdecd0]';
      case 'Approved':
        return 'bg-[#effbf3] text-[#15803d] border-[#d3f4de]';
      case 'Docs / settlement':
        return 'bg-[#f0fbf5] text-[#166534] border-[#d6f6e2]';
      case 'Settled':
        return 'bg-[#f0fbf5] text-[#166534] border-[#d6f6e2]';
      case 'Application received':
        return 'bg-[#f0f7ff] text-[#0284c7] border-[#bae6fd]';
      case 'Declined / withdrawn':
        return 'bg-[#fef2f2] text-[#dc2626] border-[#fecaca]';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Actions strictly matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <span className="w-4 h-0.5 bg-slate-300"></span>
            <span>ALL PARTNER BOOKS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a1926] tracking-tight mt-1">
            Master pipeline
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Filter attributed applications, inspect stage history, and make controlled updates.
          </p>
          <div className="w-12 h-0.5 bg-amber-600 mt-5"></div>
        </div>

        <button
          onClick={() => alert("Exporting Master Pipeline CSV...")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs shadow-2xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar matching screenshot */}
      <div className="bg-white p-2 sm:p-2.5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between gap-3 relative">
        <div className="flex items-center gap-3 flex-1 px-3">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search all attributed applications"
            className="w-full text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden bg-transparent"
          />
        </div>

        {/* Dropdown & More Filter Button */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
            >
              <span>{stageFilter}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-20 animate-in fade-in">
                {stages.map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      setStageFilter(st);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-1.5 text-xs font-medium hover:bg-slate-50 transition-colors ${stageFilter === st ? "text-sky-600 font-bold bg-sky-50" : "text-slate-700"
                      }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span>More</span>
          </button>
        </div>
      </div>

      {/* Pipeline Table strictly matching screenshot */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
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
                <th className="py-3.5 px-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((deal) => (
                <tr key={deal.id} className="hover:bg-slate-50/60 transition-colors cursor-pointer group">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900 group-hover:text-sky-700 transition-colors text-sm">
                      {deal.name}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {deal.id}
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="font-bold text-slate-800">{deal.partner}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{deal.partnerCode}</div>
                  </td>

                  <td className="py-4 px-4 text-slate-500 font-medium">
                    {deal.submitted}
                  </td>

                  <td className="py-4 px-4 text-center">
                    <span className={`inline-block px-3 py-0.5 rounded-full text-[11px] font-semibold border ${getStageBadge(deal.stage)}`}>
                      {deal.stage}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-center font-bold text-slate-800">
                    {deal.amountBand}
                  </td>

                  <td className="py-4 px-6 font-bold text-slate-900">
                    {deal.commission}
                  </td>

                  <td className="py-4 px-4 text-right">
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors ml-auto" />
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
