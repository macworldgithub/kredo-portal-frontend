"use client";

import React, { useState } from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/api";

export const ForgotPasswordView: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await apiRequest("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      }, false);
      setSent(true);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not request a reset link.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f9fa] flex items-center justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-extrabold text-[#0a1926]">Forgot password?</h1>
        <p className="text-sm text-slate-500 mt-1 mb-6">Enter the email associated with your account to request a reset link.</p>
        {sent ? (
          <p role="status" className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">
            If an account exists for this email, a password reset link has been sent.
          </p>
        ) : (
          <>
            {error && <p role="alert" className="mb-4 rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700">{error}</p>}
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
            <input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 mb-6" />
            <button type="submit" disabled={submitting} className="w-full rounded-xl bg-[#0a1926] px-4 py-3 text-sm font-bold text-white disabled:opacity-60">
              {submitting ? "Sending..." : "Send reset link"}
            </button>
          </>
        )}
        <p className="mt-5 text-center text-xs text-slate-500"><Link href="/" className="font-semibold text-sky-800 hover:underline">Back to sign in</Link></p>
      </form>
    </main>
  );
};
