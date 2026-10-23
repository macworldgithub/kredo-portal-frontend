"use client";

import React from "react";
import { Bell, Eye, LogOut, Menu } from "lucide-react";

interface HeaderProps {
  partnerName: string;
  perspective: 'partner' | 'master';
  onTogglePerspective: () => void;
  onOpenMobileSidebar: () => void;
  unreadCount?: number;
  canSwitchPerspective: boolean;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  partnerName,
  perspective,
  onTogglePerspective,
  onOpenMobileSidebar,
  unreadCount = 2,
  canSwitchPerspective,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#f7f9fa]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 border-b border-slate-200/80 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-200 transition-colors"
          aria-label="Open navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="text-[10px] tracking-widest font-semibold uppercase text-slate-400">
            {perspective === 'partner' ? 'PARTNER WORKSPACE' : 'KREDO OPERATIONS'}
          </div>
          <div className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            {perspective === 'partner' ? partnerName : 'Master view'}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* LIVE DEMO Pill */}
      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4faee] border border-[#d6f0be] text-[11px] font-semibold text-[#3b7c1e] shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#52a42b] animate-pulse"></span>
          <span>LIVE DEMO</span>
        </div>

        {/* Notifications */}
        <button 
          className="relative p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-2xs transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
          )}
        </button>

        {/* Perspective Toggle Pill */}
        {canSwitchPerspective && <button
          onClick={onTogglePerspective}
          className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#0a1926] hover:bg-[#13273c] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden sm:inline">{perspective === 'partner' ? 'Kredo Master' : 'Partner View'}</span>
        </button>}
        <button
          onClick={onLogout}
          className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-rose-700 hover:border-rose-200 shadow-2xs transition-colors"
          aria-label="Sign out"
          title="Sign out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
