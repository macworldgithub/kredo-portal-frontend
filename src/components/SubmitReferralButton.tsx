"use client";

import { PlusCircle } from "lucide-react";

export function SubmitReferralButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-emerald-600 px-2.5 py-2 text-xs font-bold text-white shadow-xs transition-colors hover:bg-emerald-700 sm:min-h-0 sm:px-4"
    >
      <PlusCircle className="h-3.5 w-3.5" aria-hidden="true" />
      <span>Submit Referral</span>
    </button>
  );
}
