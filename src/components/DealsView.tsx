"use client";

import React, { useState } from "react";
import { Search, ChevronDown, ChevronRight, Briefcase } from "lucide-react";
import { PARTNER_DEALS, PartnerDeal } from "../data/netlifyData";

interface DealsViewProps {
  onSelectDeal: (deal: PartnerDeal) => void;
}

export const DealsView: React.FC<DealsViewProps> = ({ onSelectDeal }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStage, setSelectedStage] = useState("All stages");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const stages = ["All stages", "In assessment", "Approved", "Docs / settlement", "Settled"];

  const filteredDeals = PARTNER_DEALS.filter((deal) => {
    const matchesSearch = 
      deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = selectedStage === "All stages" || deal.stage === selectedStage;
    return matchesSearch && matchesStage;
  });

  const getStageBadge = (stage: PartnerDeal['stage']) => {
    switch (stage) {
      case 'In assessment':
        return 'bg-[#fef9ee] text-[#b45309] border-[#fdecd0]';
      case 'Approved':
        return 'bg-[#effbf3] text-[#15803d] border-[#d3f4de]';
      case 'Docs / settlement':
        return 'bg-[#f0fbf5] text-[#166534] border-[#d6f6e2]';
      case 'Settled':
        return 'bg-[#f0fbf5] text-[#166534] border-[#d6f6e2]';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <span className="w-4 h-0.5 bg-slate-300"></span>
          <span>PARTNER BOOK</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a1926] tracking-tight mt-1">
          Deals
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          A privacy-safe view of every application attributed to Hayes Partners.
        </p>
        <div className="w-12 h-0.5 bg-amber-600 mt-5"></div>
      </div>

      {/* Filter and Search Bar matching Netlify */}
      <div className="bg-white p-2 sm:p-2.5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between gap-3 relative">
        <div className="flex items-center gap-3 flex-1 px-3">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search business or deal ID"
            className="w-full text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden bg-transparent"
          />
        </div>

        {/* Dropdown */}
        <div className="relative shrink-0">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
          >
            <span>{selectedStage}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-20 animate-in fade-in">
              {stages.map((stage) => (
                <button
                  key={stage}
                  onClick={() => {
                    setSelectedStage(stage);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-1.5 text-xs font-medium hover:bg-slate-50 transition-colors ${
                    selectedStage === stage ? "text-sky-600 font-bold bg-sky-50" : "text-slate-700"
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Deals Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/60 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-6">REF / BUSINESS</th>
                <th className="py-3.5 px-4">SUBMITTED</th>
                <th className="py-3.5 px-4 text-center">STAGE</th>
                <th className="py-3.5 px-4 text-center">AMOUNT BAND</th>
                <th className="py-3.5 px-6">COMMISSION</th>
                <th className="py-3.5 px-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDeals.map((deal) => (
                <tr
                  key={deal.id}
                  onClick={() => onSelectDeal(deal)}
                  className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                >
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900 group-hover:text-sky-700 transition-colors text-sm">
                      {deal.name}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {deal.id}
                    </div>
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
