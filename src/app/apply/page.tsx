"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ApplicationForm } from "@/components/ApplicationForm";
import { apiRequest } from "@/lib/api";

function ApplyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Extract referral code from query params (?ref=HAYES01 or ?code=HAYES01)
  const refCode = searchParams.get("ref") || searchParams.get("code") || "HAYES01";

  const handleSubmitApplication = async (application: {
    tradingName: string;
    abn: string;
    amount: string;
    purpose: string;
    directorName: string;
    email: string;
    phone: string;
    directors?: any[];
    referralCode: string;
  }) => {
    await apiRequest(
      "/portal/applications",
      {
        method: "POST",
        body: JSON.stringify(application),
      },
      false,
    );
  };

  return (
    <ApplicationForm
      referralCode={refCode}
      onBackToDemo={() => router.push("/")}
      onSubmitApplication={handleSubmitApplication}
    />
  );
}

export default function ApplyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f7f9fa] flex items-center justify-center p-6 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-3 border-sky-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-slate-600">Loading Kredo Application Form...</p>
          </div>
        </div>
      }
    >
      <ApplyContent />
    </Suspense>
  );
}

