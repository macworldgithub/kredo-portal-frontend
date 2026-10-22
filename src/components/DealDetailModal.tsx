"use client";

import React, { useState } from "react";
import { X, Calendar, User, Building, DollarSign, Clock, ShieldCheck, CheckCircle2, FileText, ArrowRight } from "lucide-react";
import { Deal } from "../data/mockData";

interface DealDetailModalProps {
  deal: Deal | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus?: (dealId: string, newStatus: Deal['status']) => void;
}

export const DealDetailModal: React.FC<DealDetailModalProps> = ({
  deal,
  isOpen,
  onClose,
  onUpdateStatus,
}) => {
  if (!isOpen || !deal) return null;

  const getStatusBadge = (status: Deal['status']) => {
    switch (status) {
      case 'In assessment':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Approved':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Docs / settlement':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'Settled':
        return 'bg-teal-50 text-teal-800 border-teal-200';
      case 'Declined':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const steps = [
    { label: "Submitted", active: true, date: deal.submittedDate },
    { label: "In assessment", active: ['In assessment', 'Approved', 'Docs / settlement', 'Settled'].includes(deal.status), date: "16 Sep" },
    { label: "Approved", active: ['Approved', 'Docs / settlement', 'Settled'].includes(deal.status), date: "Pending" },
    { label: "Docs / settlement", active: ['Docs / settlement', 'Settled'].includes(deal.status), date: "Pending" },
    { label: "Settled", active: deal.status === 'Settled', date: "Final" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full overflow-hidden transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono text-xs font-bold text-slate-400 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                {deal.id}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(deal.status)}`}>
                {deal.status}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">{deal.name}</h2>
            <p className="text-xs text-slate-500 mt-0.5">Introduced under partner code <span className="font-mono font-medium text-slate-700">{deal.code}</span></p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Timeline tracker */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Facility Progress</div>
          <div className="flex items-center justify-between relative">
            <div className="absolute left-2 right-2 top-3 h-0.5 bg-slate-200 -z-0"></div>
            {steps.map((st, i) => (
              <div key={i} className="flex flex-col items-center relative z-10 text-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                  st.active 
                    ? 'bg-[#0a1926] text-white ring-4 ring-slate-100' 
                    : 'bg-white border-2 border-slate-300 text-slate-400'
                }`}>
                  {st.active ? "✓" : i + 1}
                </div>
                <span className={`text-[10px] font-medium mt-1.5 max-w-[70px] leading-tight ${st.active ? 'text-slate-900 font-semibold' : 'text-slate-400'}`}>
                  {st.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content details */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Loan Amount</span>
              <span className="text-xl font-bold text-slate-900">{deal.amount}</span>
              <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                <span>{deal.type}</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Your Commission</span>
              <span className="text-xl font-bold text-emerald-600">{deal.commission}</span>
              <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Status: <strong className="text-slate-800">{deal.commissionStatus}</strong></span>
              </div>
            </div>
          </div>

          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between py-2 border-b border-slate-100 text-xs">
              <span className="text-slate-500 flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" />
                Contact Applicant
              </span>
              <span className="font-semibold text-slate-800">{deal.applicant}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-100 text-xs">
              <span className="text-slate-500 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                Submitted Date
              </span>
              <span className="font-semibold text-slate-800">{deal.submittedDate}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-100 text-xs">
              <span className="text-slate-500 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                Latest Credit Note
              </span>
              <span className="font-semibold text-slate-800">{deal.lastActivity}</span>
            </div>
          </div>

          {/* Quick status toggle for demo purpose */}
          {onUpdateStatus && (
            <div className="pt-2 border-t border-slate-100">
              <div className="text-xs font-semibold text-slate-700 mb-2">Simulate Stage Transition (Demo Tool):</div>
              <div className="flex flex-wrap gap-1.5">
                {(['In assessment', 'Approved', 'Docs / settlement', 'Settled'] as Deal['status'][]).map((st) => (
                  <button
                    key={st}
                    onClick={() => onUpdateStatus(deal.id, st)}
                    className={`px-2.5 py-1 text-xs rounded-lg border font-medium transition-colors ${
                      deal.status === st 
                        ? 'bg-[#0a1926] text-white border-[#0a1926]' 
                        : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
