"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ApplicationForm } from "@/components/ApplicationForm";
import { ContactWidget } from "@/components/ContactWidget";
import { apiRequest } from "@/lib/api";

function ApplyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const referralCode = searchParams.get("ref") || "SPUD";

  return (
    <div className="min-h-screen bg-[#f7f9fa]">
      <ApplicationForm
        onBackToDemo={() => router.push("/")}
        referralCode={referralCode}
        onSubmitApplication={async (application) => {
          await apiRequest(
            "/portal/applications",
            {
              method: "POST",
              body: JSON.stringify(application),
            },
            false,
          );
        }}
      />
      <ContactWidget />
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center text-sm text-slate-500">Loading Kredo Application...</div>}>
      <ApplyContent />
    </Suspense>
  );
}

