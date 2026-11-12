"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Bell, ChevronRight, LoaderCircle, X } from "lucide-react";
import type { Deal } from "@/lib/api";

interface NotificationBellProps {
  deals: Deal[];
  onSelectDeal: (dealId: string) => Promise<boolean>;
}

export function NotificationBell({ deals, onSelectDeal }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openingDealId, setOpeningDealId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const headingId = useId();
  const updates = deals
    .filter((deal) => deal.statusUpdatedAt)
    .sort((left, right) => Date.parse(right.statusUpdatedAt!) - Date.parse(left.statusUpdatedAt!));
  const unreadCount = updates.filter((deal) => deal.statusUpdatedAt !== deal.statusSeenAt).length;

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const openDeal = async (dealId: string) => {
    setOpeningDealId(dealId);
    setError("");
    try {
      const opened = await onSelectDeal(dealId);
      if (opened) setIsOpen(false);
      else setError("Could not open this deal. Please try again.");
    } catch {
      setError("Could not open this deal. Please try again.");
    } finally {
      setOpeningDealId(null);
    }
  };

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => { setIsOpen(!isOpen); setError(""); }}
        aria-label={`Notifications, ${unreadCount} unread`}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-haspopup="dialog"
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-sky-200 hover:text-sky-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
      >
        <Bell className="h-4 w-4" aria-hidden="true" />
        {unreadCount > 0 && (
          <span aria-hidden="true" className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white ring-2 ring-[#f7f9fa]">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          id={panelId}
          role="dialog"
          aria-labelledby={headingId}
          className="fixed inset-x-3 top-[4.75rem] z-50 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-3 sm:w-96"
        >
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
            <div>
              <p id={headingId} className="text-sm font-bold text-slate-900">Notifications</p>
              <p className="mt-0.5 text-xs text-slate-500" role="status" aria-live="polite">{unreadCount} unread updates</p>
            </div>
            <button type="button" onClick={() => { setIsOpen(false); buttonRef.current?.focus(); }} aria-label="Close notifications" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100">
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          {error && <p role="alert" className="border-b border-rose-100 bg-rose-50 px-4 py-3 text-xs text-rose-800">{error}</p>}
          {updates.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-slate-500">No status updates yet.</p>
          ) : (
            <ul className="max-h-[min(65dvh,28rem)] divide-y divide-slate-100 overflow-y-auto overscroll-contain">
              {updates.map((deal) => {
                const isUnread = deal.statusUpdatedAt !== deal.statusSeenAt;
                return (
                  <li key={deal.id}>
                    <button
                      type="button"
                      disabled={openingDealId !== null}
                      onClick={() => void openDeal(deal.id)}
                      className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-100 disabled:opacity-60 ${isUnread ? "bg-sky-50" : "bg-white"}`}
                    >
                      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${isUnread ? "bg-sky-600" : "bg-slate-200"}`} aria-label={isUnread ? "Unread" : "Read"} />
                      <span className="min-w-0 flex-1">
                        <span className="block break-words text-sm font-semibold text-slate-900">{deal.name}</span>
                        <span className="mt-1 block break-words text-xs text-slate-600">Status updated to {deal.status}</span>
                        <span className="mt-1 block text-[11px] text-slate-400">{deal.id}</span>
                        <time dateTime={deal.statusUpdatedAt} className="mt-1 block text-[11px] text-slate-500">
                          {new Date(deal.statusUpdatedAt!).toLocaleString("en-AU", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" })}
                        </time>
                      </span>
                      {openingDealId === deal.id ? <LoaderCircle className="mt-1 h-4 w-4 shrink-0 animate-spin text-sky-600" aria-hidden="true" /> : <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
