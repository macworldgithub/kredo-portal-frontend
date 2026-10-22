"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Home, 
  Briefcase, 
  Percent, 
  QrCode, 
  ExternalLink, 
  Settings, 
  ArrowRight,
  LayoutGrid,
  Users,
  GitBranch,
  BarChart3,
  X
} from "lucide-react";

export type PartnerNavTab = 'home' | 'deals' | 'commissions' | 'share' | 'hero' | 'settings';
export type MasterNavTab = 'overview' | 'partners' | 'pipeline' | 'commissions' | 'reports' | 'hero' | 'settings';

interface SidebarProps {
  perspective: 'partner' | 'master';
  currentPartnerTab: PartnerNavTab;
  currentMasterTab: MasterNavTab;
  onSelectPartnerTab: (tab: PartnerNavTab) => void;
  onSelectMasterTab: (tab: MasterNavTab) => void;
  onTogglePerspective: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  perspective,
  currentPartnerTab,
  currentMasterTab,
  onSelectPartnerTab,
  onSelectMasterTab,
  onTogglePerspective,
  isOpenMobile,
  onCloseMobile
}) => {
  const partnerNavItems = [
    { id: 'home' as PartnerNavTab, label: 'Home', icon: Home },
    { id: 'deals' as PartnerNavTab, label: 'Deals', icon: Briefcase },
    { id: 'commissions' as PartnerNavTab, label: 'Commissions', icon: Percent },
    { id: 'share' as PartnerNavTab, label: 'Share & QR', icon: QrCode },
  ];

  const masterNavItems = [
    { id: 'overview' as MasterNavTab, label: 'Overview', icon: LayoutGrid },
    { id: 'partners' as MasterNavTab, label: 'Partners', icon: Users },
    { id: 'pipeline' as MasterNavTab, label: 'Pipeline', icon: GitBranch },
    { id: 'commissions' as MasterNavTab, label: 'Commissions', icon: Percent },
    { id: 'reports' as MasterNavTab, label: 'Reports', icon: BarChart3 },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0a1926] text-white flex flex-col justify-between transition-transform duration-200 ease-in-out
        ${isOpenMobile ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        {/* Top Header */}
        <div>
          {/* Logo container matching screenshot */}
          <div className="p-4 border-b border-[#1b2d42]">
            <div className="bg-white rounded-xl p-3 flex items-center justify-between shadow-xs">
              <div className="relative w-full h-10 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Kredo Referral Partner Platform"
                  className="max-h-9 w-auto object-contain"
                />
              </div>
              <button 
                onClick={onCloseMobile}
                className="lg:hidden p-1 rounded-md text-slate-400 hover:text-slate-800 ml-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-[8px] uppercase tracking-widest text-slate-400 font-bold text-center mt-2">
              REFERRAL PARTNER PLATFORM
            </div>
          </div>

          {/* User profile identifier block */}
          <div className="px-5 py-4 border-b border-[#1b2d42]/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#172c44] border border-[#2b476b] flex items-center justify-center font-bold text-xs text-sky-200">
                {perspective === 'partner' ? 'HP' : 'KM'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate text-slate-100">
                  {perspective === 'partner' ? 'Hayes Partners' : 'Kredo Master'}
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  {perspective === 'partner' ? 'Code HAYES01' : 'All partner books'}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {perspective === 'partner' ? (
              partnerNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPartnerTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectPartnerTab(item.id);
                      onCloseMobile();
                    }}
                    className={`
                      w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer
                      ${isActive 
                        ? "bg-white text-[#0a1926] shadow-sm font-bold" 
                        : "text-slate-300 hover:text-white hover:bg-[#13263a]"}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? "text-[#0a1926]" : "text-slate-400"}`} />
                      <span>{item.label}</span>
                    </div>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    )}
                  </button>
                );
              })
            ) : (
              masterNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentMasterTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectMasterTab(item.id);
                      onCloseMobile();
                    }}
                    className={`
                      w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer
                      ${isActive 
                        ? "bg-white text-[#0a1926] shadow-sm font-bold" 
                        : "text-slate-300 hover:text-white hover:bg-[#13263a]"}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? "text-[#0a1926]" : "text-slate-400"}`} />
                      <span>{item.label}</span>
                    </div>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    )}
                  </button>
                );
              })
            )}
          </nav>
        </div>

        {/* Bottom Navigation */}
        <div className="p-3 border-t border-[#1b2d42] space-y-1">
          <button
            onClick={() => {
              if (perspective === 'partner') onSelectPartnerTab('hero');
              else onSelectMasterTab('hero');
              onCloseMobile();
            }}
            className={`
              w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer
              ${(perspective === 'partner' ? currentPartnerTab === 'hero' : currentMasterTab === 'hero')
                ? "bg-white text-[#0a1926] shadow-sm font-bold" 
                : "text-slate-300 hover:text-white hover:bg-[#13263a]"}
            `}
          >
            <div className="flex items-center gap-3">
              <ExternalLink className="w-4 h-4 text-slate-400" />
              <span>Hero page demo</span>
            </div>
          </button>

          <button
            onClick={() => {
              if (perspective === 'partner') onSelectPartnerTab('settings');
              else onSelectMasterTab('settings');
              onCloseMobile();
            }}
            className={`
              w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer
              ${(perspective === 'partner' ? currentPartnerTab === 'settings' : currentMasterTab === 'settings')
                ? "bg-white text-[#0a1926] shadow-sm font-bold" 
                : "text-slate-300 hover:text-white hover:bg-[#13263a]"}
            `}
          >
            <div className="flex items-center gap-3">
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Settings</span>
            </div>
          </button>

          {/* Perspective Switcher Button */}
          <div className="pt-2">
            <button
              onClick={onTogglePerspective}
              className="w-full group text-left px-3.5 py-2.5 rounded-xl bg-[#0e2135] hover:bg-[#142d47] border border-[#1d3550] transition-colors cursor-pointer"
            >
              <div className="text-[10px] tracking-wider font-bold text-slate-400 uppercase">Demo Perspective</div>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-xs font-semibold text-sky-400 group-hover:text-sky-300">
                  {perspective === 'partner' ? 'Switch to Master' : 'Switch to Partner'}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-sky-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
