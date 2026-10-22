"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  ShieldCheck, 
  Clock, 
  BookOpen, 
  Lock,
  Building,
  Check
} from "lucide-react";

interface HeroPageProps {
  onBackToDemo: () => void;
  onApplyNow: () => void;
}

export const HeroPage: React.FC<HeroPageProps> = ({
  onBackToDemo,
  onApplyNow,
}) => {
  return (
    <div className="min-h-screen bg-white text-[#0a1926] flex flex-col font-sans">
      {/* Top Banner Notice */}
      <div className="bg-[#f0f4f8] py-1.5 px-4 text-center border-b border-slate-200">
        <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">
          KREDO REFERRAL PARTNER EDITION · SPUD ATTRIBUTION SECURED
        </span>
      </div>

      {/* Header Bar with Official Logo */}
      <header className="px-6 sm:px-12 py-3.5 flex items-center justify-between border-b border-slate-100 bg-white sticky top-0 z-30">
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="Kredo Business Finance"
            className="h-8 sm:h-9 w-auto object-contain"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onBackToDemo}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Partner demo</span>
          </button>

          <button
            onClick={onApplyNow}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#0a1926] hover:bg-[#14293d] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <span>Apply now</span>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#d9ecf8] via-[#e5f1f9] to-[#edf5fa] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-white text-[11px] font-bold text-slate-700 shadow-2xs">
              <span className="text-amber-500">✦</span>
              <span>MARK &ldquo;SPUD&rdquo; CARROLL × KREDO</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#0a1926] leading-[1.08]">
              Backing your next<br />business move.
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg">
              Fast, straightforward business finance from $5,000 to $2 million — with a little something from Spud when your loan settles.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onApplyNow}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#0a1926] hover:bg-[#152e46] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                <span>Check eligibility & apply</span>
                <ArrowRight className="w-4 h-4 text-sky-400" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("offer-section");
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 shadow-2xs transition-all cursor-pointer"
              >
                See the offer
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 pt-3">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-sky-700" />
                <span>Under 5 minutes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sky-700" />
                <span>Same-day decisions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sky-700" />
                <span>Secure & compliant</span>
              </div>
            </div>
          </div>

          {/* Right Image Container */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 relative aspect-4/3 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-900/10 to-transparent z-10 pointer-events-none"></div>
              <div className="w-full h-full bg-[#d6eaf8] flex flex-col justify-end p-6 relative overflow-hidden">
                <svg className="absolute inset-0 w-full h-full object-cover opacity-85" viewBox="0 0 600 400" fill="none">
                  <rect x="360" y="50" width="220" height="320" rx="16" fill="white" opacity="0.95" />
                  <rect x="390" y="240" width="24" height="90" rx="4" fill="#38bdf8" />
                  <rect x="430" y="180" width="24" height="150" rx="4" fill="#0284c7" />
                  <rect x="470" y="140" width="24" height="190" rx="4" fill="#0369a1" />
                  <rect x="510" y="90" width="24" height="240" rx="4" fill="#0c4a6e" />
                  <line x1="380" y1="330" x2="550" y2="330" stroke="#cbd5e1" strokeWidth="2" />
                  
                  <ellipse cx="230" cy="270" rx="75" ry="45" fill="#0a1926" opacity="0.88" />
                  <ellipse cx="230" cy="270" rx="66" ry="38" fill="#e0f2fe" opacity="0.75" />
                  <ellipse cx="370" cy="265" rx="70" ry="42" fill="#0a1926" opacity="0.88" />
                  <ellipse cx="370" cy="265" rx="62" ry="36" fill="#e0f2fe" opacity="0.75" />
                  <path d="M295 255 Q305 245 315 255" stroke="#0a1926" strokeWidth="8" strokeLinecap="round" />
                  <path d="M155 260 Q110 240 70 210" stroke="#0a1926" strokeWidth="7" strokeLinecap="round" />
                </svg>

                <div className="relative z-20 bg-white p-3.5 px-5 rounded-xl border border-slate-200/90 shadow-lg inline-block self-start">
                  <div className="text-[9.5px] uppercase font-bold text-slate-400 tracking-wider">
                    REFERRAL CODE APPLIED
                  </div>
                  <div className="font-mono text-xl font-black text-[#0a1926] tracking-wider mt-0.5">
                    SPUD
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Metrics Strip at bottom */}
        <div className="border-t border-slate-200/80 bg-white/70 backdrop-blur-xs">
          <div className="max-w-6xl mx-auto px-6 py-4 grid grid-cols-3 text-center divide-x divide-slate-200">
            <div>
              <span className="text-xl sm:text-2xl font-black text-[#0a1926]">$5k–$2m</span>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">LOAN RANGE</span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black text-[#0a1926]">&lt; 5 min</span>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">APPLICATION</span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black text-[#0a1926]">5+</span>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">LENDER PANEL</span>
            </div>
          </div>
        </div>
      </section>

      {/* Settle through this page offer section */}
      <section id="offer-section" className="py-16 sm:py-24 max-w-6xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-4 h-0.5 bg-slate-300"></span>
              <span>A SIMPLE THANK YOU</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a1926] tracking-tight">
              Settle through this page.<br />Receive a signed copy.
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed max-w-lg">
              Apply using the SPUD link. When an eligible facility settles, Kredo will arrange the illustrated signed-book partner offer.
            </p>

            <div className="p-3.5 bg-amber-50/70 border-l-2 border-amber-500 rounded-r-xl text-[11px] text-slate-600 max-w-md">
              Final offer eligibility, expiry and supplied partner photography will be confirmed before launch.
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#0a1926] text-white p-8 rounded-3xl shadow-xl space-y-6">
            <div className="w-10 h-10 rounded-2xl bg-[#172c44] flex items-center justify-center text-sky-400">
              <BookOpen className="w-5 h-5" />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-white">One link. Clear attribution.</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Your SPUD code is already attached. It follows the application from this page to Kredo&apos;s internal deal record and partner ledger.
              </p>
            </div>

            <button
              onClick={onApplyNow}
              className="w-full flex items-center justify-between p-3.5 px-5 rounded-2xl bg-white text-[#0a1926] font-bold text-xs hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <span>Start with SPUD applied</span>
              <CheckCircle className="w-4 h-4 text-sky-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Kredo Section */}
      <section className="bg-slate-50 py-16 sm:py-20 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 space-y-10">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-4 h-0.5 bg-slate-300"></span>
              <span>WHY KREDO</span>
            </div>
            <h2 className="text-3xl font-extrabold text-[#0a1926] tracking-tight mt-1">
              Finance, without the runaround.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700">
                <Clock className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Fast to complete</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                A digital application designed to take less than five minutes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700">
                <CheckCircle className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Matched intelligently</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Kredo&apos;s platform matches each profile to the best-fit lender panel.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Handled properly</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Secure, compliant handling backed by experienced finance brokers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with official logo */}
      <footer className="bg-[#0a1926] text-white py-12 px-6 sm:px-12 border-t border-[#162f48] mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="bg-white inline-block px-3 py-1.5 rounded-lg shadow-sm">
              <img
                src="/logo.png"
                alt="Kredo"
                className="h-6 w-auto object-contain"
              />
            </div>
            <p className="text-[11px] text-slate-400 max-w-lg leading-relaxed">
              VHM Asset Finance ABN 96 661 380 150 trading as Kredo. Credit Representative 542867 is authorised under Australian Credit Licence 389328. General information only.
            </p>
          </div>

          <div className="text-[11px] text-slate-400">
            © 2026 Kredo · Powered by Bele.ai
          </div>
        </div>
      </footer>
    </div>
  );
};
