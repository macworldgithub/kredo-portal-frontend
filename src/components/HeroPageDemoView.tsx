"use client";

import React, { useState } from "react";
import { 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  ChevronRight,
  ExternalLink,
  DollarSign,
  Briefcase
} from "lucide-react";

interface HeroPageDemoViewProps {
  partnerCode: string;
  onOpenApplyModal: () => void;
}

export const HeroPageDemoView: React.FC<HeroPageDemoViewProps> = ({
  partnerCode,
  onOpenApplyModal,
}) => {
  return (
    <div className="space-y-6">
      {/* Top Banner indicating demo landing page */}
      <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span>
            <strong>Client Landing Preview:</strong> This is the hero page your customers see when accessing your link with code <strong className="font-mono text-slate-900 bg-white px-2 py-0.5 rounded-md border border-amber-200">{partnerCode}</strong>.
          </span>
        </div>
        <button
          onClick={onOpenApplyModal}
          className="px-3.5 py-1.5 rounded-lg bg-[#0a1926] text-white font-semibold text-xs self-start sm:self-auto hover:bg-slate-800 transition-colors"
        >
          Test Client Application
        </button>
      </div>

      {/* Main Hero Showcase */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Navigation Mockup */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#0a1926] text-sky-400 font-black flex items-center justify-center text-xs">
              K
            </div>
            <span className="font-bold tracking-tight text-slate-900 text-sm">KREDO</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Referred by</span>
            <span className="font-semibold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-full">
              Hayes Partners
            </span>
          </div>
        </div>

        {/* Hero Content */}
        <div className="p-8 sm:p-14 text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>Fast-Track Commercial Lending Partner Network</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#0a1926] tracking-tight leading-tight">
            Fast, Flexible Business Finance Tailored For Your Growth.
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Access up to $5,000,000 for asset equipment, cashflow expansion, or property settlement with rapid approval turnarounds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenApplyModal}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0a1926] hover:bg-[#14283c] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Start 5-Minute Application</span>
              <ArrowRight className="w-4 h-4 text-sky-400" />
            </button>
            <div className="text-xs text-slate-400 font-mono">
              Referral Code locked: <strong className="text-slate-700">{partnerCode}</strong>
            </div>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 text-left">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <Clock className="w-5 h-5 text-sky-600 mb-2" />
              <h4 className="text-xs font-bold text-slate-900">2-Hour Assessment</h4>
              <p className="text-[11px] text-slate-500 mt-1">Direct broker submission with express credit review.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <DollarSign className="w-5 h-5 text-emerald-600 mb-2" />
              <h4 className="text-xs font-bold text-slate-900">$20k to $5M Limits</h4>
              <p className="text-[11px] text-slate-500 mt-1">Unsecured cash flow, equipment assets, and term debt.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="w-5 h-5 text-teal-600 mb-2" />
              <h4 className="text-xs font-bold text-slate-900">Dedicated Specialist</h4>
              <p className="text-[11px] text-slate-500 mt-1">Direct communication with our senior credit assessors.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
