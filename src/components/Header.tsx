"use client";

import React, { useState, useRef, useEffect } from "react";
import { Eye, LogOut, Menu, Bell, Clock, ChevronRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { SubmitReferralButton } from "./SubmitReferralButton";
import { Deal } from "@/lib/api";

interface HeaderProps {
  partnerName: string;
  perspective: 'partner' | 'master';
  onTogglePerspective: () => void;
  onOpenMobileSidebar: () => void;
  canSwitchPerspective: boolean;
  onLogout: () => void;
  onSubmitReferral?: () => void;
  deals?: Deal[];
  onSelectDeal?: (deal: Deal) => void;
  onNavigateToSettings?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  partnerName,
  perspective,
  onTogglePerspective,
  onOpenMobileSidebar,
  canSwitchPerspective,
  onLogout,
  onSubmitReferral,
  deals = [],
  onSelectDeal,
  onNavigateToSettings,
}) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close notifications dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter deals with status updates or requiring attention (e.g. Waiting on customer)
  const statusNotifications = deals.filter(
    (d) => d.statusUpdatedAt || d.status === "Waiting on customer" || d.status === "Approved" || d.status === "Settled"
  );
  const unreadCount = statusNotifications.length;

  return (
    <header className="sticky top-0 z-30 bg-[#f7f9fa]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
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

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        {perspective === 'partner' && onSubmitReferral && (
          <SubmitReferralButton onClick={onSubmitReferral} />
        )}

        {/* In-Portal Notification Bell (Issue #3) */}
        {perspective === 'partner' && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-2xs transition-colors cursor-pointer"
              title="Application Status Notifications"
              aria-label="Application Status Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-amber-500 text-[10px] font-extrabold text-white ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Panel */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-slate-200 shadow-2xl z-50 overflow-hidden animate-in fade-in duration-150">
                <div className="p-4 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#0a1926]" />
                    <span className="text-xs font-bold text-slate-900">Application Updates</span>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  {onNavigateToSettings && (
                    <button
                      onClick={() => {
                        setNotificationsOpen(false);
                        onNavigateToSettings();
                      }}
                      className="text-[11px] font-semibold text-sky-700 hover:underline cursor-pointer"
                    >
                      Email settings
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {statusNotifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400">
                      No recent status changes. You are all caught up!
                    </div>
                  ) : (
                    statusNotifications.map((deal) => {
                      const isWaiting = deal.status === "Waiting on customer";
                      const isApproved = deal.status === "Approved" || deal.status === "Settled";
                      return (
                        <div
                          key={deal.id}
                          onClick={() => {
                            setNotificationsOpen(false);
                            if (onSelectDeal) onSelectDeal(deal);
                          }}
                          className="p-3.5 hover:bg-slate-50 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-start gap-2.5">
                            <div className="mt-0.5 shrink-0">
                              {isWaiting ? (
                                <AlertCircle className="w-4 h-4 text-amber-600" />
                              ) : isApproved ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <Clock className="w-4 h-4 text-sky-600" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-900 group-hover:text-sky-700">
                                  {deal.name}
                                </span>
                                <span className="text-[10px] font-mono text-slate-400">{deal.id}</span>
                              </div>
                              <p className="text-[11px] text-slate-600 mt-0.5">
                                Stage updated to <strong className="text-slate-900">{deal.status}</strong>
                              </p>
                              {isWaiting && (
                                <p className="text-[10.5px] text-amber-800 bg-amber-50 rounded-md px-1.5 py-0.5 mt-1 border border-amber-200">
                                  Action Needed: Awaiting customer documents or review.
                                </p>
                              )}
                              <div className="flex items-center justify-between mt-1.5 text-[10px] text-slate-400">
                                <span>{deal.lastActivity || "Updated recently"}</span>
                                <span className="font-bold text-sky-700 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                                  Review deal <ChevronRight className="w-3 h-3" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                  <span className="text-[11px] text-slate-500">
                    Emails are sent when status updates occurs.
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* LIVE DEMO Pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4faee] border border-[#d6f0be] text-[11px] font-semibold text-[#3b7c1e] shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#52a42b] animate-pulse"></span>
          <span>LIVE DEMO</span>
        </div>

        {/* Perspective Toggle Pill */}
        {canSwitchPerspective && (
          <button
            onClick={onTogglePerspective}
            className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#0a1926] hover:bg-[#13273c] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">{perspective === 'partner' ? 'Kredo Master' : 'Partner View'}</span>
          </button>
        )}
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
