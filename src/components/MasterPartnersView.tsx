"use client";

import React, { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal } from "lucide-react";
import { PartnerDirectoryItem } from "@/lib/api";

export const MasterPartnersView: React.FC<{
  partners: PartnerDirectoryItem[];
  onOpenAddPartner: () => void;
  onViewPartnerBook: (partnerCode: string) => void;
}> = ({ partners, onOpenAddPartner, onViewPartnerBook }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeOnly, setActiveOnly] = useState(false);

  const filtered = partners.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.contact.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter((partner) => !activeOnly || partner.status === "Active");

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <span className="w-4 h-0.5 bg-slate-300"></span>
            <span>NETWORK CONTROLS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a1926] tracking-tight mt-1">
            Partner directory
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Issue a working code in under a minute, pause new attribution, or open any partner book.
          </p>
          <div className="w-12 h-0.5 bg-amber-600 mt-5"></div>
        </div>

        <button
          onClick={onOpenAddPartner}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0a1926] hover:bg-[#14293d] text-white font-bold text-xs shadow-md transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add partner</span>
        </button>
      </div>

      {/* Filter and Search Bar matching screenshot */}
      <div className="bg-white p-2 sm:p-2.5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 px-3">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search partner, contact or code"
            className="w-full text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden bg-transparent"
          />
        </div>

        <button
          onClick={() => setActiveOnly((current) => !current)}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors ${activeOnly ? "ring-2 ring-sky-200" : ""}`}
        >
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <span>{activeOnly ? "Active only" : "Filter"}</span>
        </button>
      </div>

      {/* 2x2 Grid of Partner Cards strictly matching screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((partner) => (
          <div
            key={partner.id}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
          >
            {/* Top row with avatar, name, badge and options menu */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#d4eaf7] text-[#1c4b70] font-black text-xs flex items-center justify-center shrink-0">
                  {partner.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">{partner.name}</h3>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      partner.badge === 'Hero'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {partner.badge}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {partner.contact} · {partner.email}
                  </div>
                </div>
              </div>

              <button className="text-slate-400 hover:text-slate-700 p-1">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom row metrics strictly matching screenshot */}
            <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-3 items-center">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  CODE
                </span>
                <span className="font-mono text-xs font-bold text-slate-900 mt-0.5 block">
                  {partner.code}
                </span>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${partner.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                  <span className="text-[11px] font-medium text-slate-600">{partner.status}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  DEALS
                </span>
                <span className="text-xs font-bold text-slate-900 mt-0.5 block">
                  {partner.deals}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  SETTLED
                </span>
                <span className="text-xs font-bold text-slate-900 mt-0.5 block">
                  {partner.settled}
                </span>
                <button
                  onClick={() => onViewPartnerBook(partner.code)}
                  className="text-xs font-bold text-sky-700 hover:text-sky-900 mt-2 inline-block"
                >
                  View book
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
