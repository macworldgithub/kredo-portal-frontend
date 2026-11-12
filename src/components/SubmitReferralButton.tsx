"use client";

import { PlusCircle } from "lucide-react";

export function SubmitReferralButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title="Submit Referral"
      className="flex h-8 sm:h-10 shrink-0 items-center gap-1 sm:gap-1.5 whitespace-nowrap rounded-full bg-emerald-600 px-2.5 sm:px-4 text-xs font-bold text-white shadow-xs transition-colors hover:bg-emerald-700"
    >
      <PlusCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
      <span className="hidden sm:inline">Submit Referral</span>
      <span className="sm:hidden text-[11px]">Submit</span>
    </button>
  );
}
