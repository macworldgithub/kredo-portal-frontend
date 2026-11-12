"use client";

import React from "react";
import { Eye, LogOut, Menu } from "lucide-react";
import { SubmitReferralButton } from "./SubmitReferralButton";

interface HeaderProps {
  partnerName: string;
  perspective: 'partner' | 'master';
  onTogglePerspective: () => void;
  onOpenMobileSidebar: () => void;
  canSwitchPerspective: boolean;
  onLogout: () => void;
  onSubmitReferral?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  partnerName,
  perspective,
  onTogglePerspective,
  onOpenMobileSidebar,
  canSwitchPerspective,
  onLogout,
  onSubmitReferral,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#f7f9fa]/90 backdrop-blur-md px-3 sm:px-8 py-3 sm:py-3.5 border-b border-slate-200/80 flex items-center justify-between gap-2 sm:gap-3">
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-200 transition-colors"
          aria-label="Open navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <div className="truncate text-[8px] sm:text-[10px] tracking-widest font-semibold uppercase text-slate-400">
            {perspective === 'partner' ? 'PARTNER WORKSPACE' : 'KREDO OPERATIONS'}
          </div>
          <div className="truncate text-[13px] sm:text-lg font-bold text-slate-900 tracking-tight">
            {perspective === 'partner' ? partnerName : 'Master view'}
          </div>
        </div>
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-3">
        {perspective === 'partner' && onSubmitReferral && (
          <SubmitReferralButton onClick={onSubmitReferral} />
        )}

        {/* LIVE DEMO Pill */}
      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4faee] border border-[#d6f0be] text-[11px] font-semibold text-[#3b7c1e] shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#52a42b] animate-pulse"></span>
          <span>LIVE DEMO</span>
        </div>

        {/* Perspective Toggle Pill */}
        {canSwitchPerspective && <button
          onClick={onTogglePerspective}
          className="hidden sm:flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#0a1926] hover:bg-[#13273c] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          aria-label={perspective === 'partner' ? 'Switch to Kredo Master' : 'Switch to Partner View'}
        >
          <Eye className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden sm:inline">{perspective === 'partner' ? 'Kredo Master' : 'Partner View'}</span>
        </button>}
        <button
          onClick={onLogout}
          className="flex h-10 w-10 shrink-0 items-center justify-center sm:h-auto sm:w-auto sm:p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-rose-700 hover:border-rose-200 shadow-2xs transition-colors"
          aria-label="Sign out"
          title="Sign out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
