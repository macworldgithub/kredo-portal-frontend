"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

export const ForgotPasswordView: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const requestCode = async (event: React.FormEvent) => {
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
      setError(requestError instanceof Error ? requestError.message : "Could not request a verification code.");
    } finally {
      setSubmitting(false);
    }
  };

  const verifyCode = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const result = await apiRequest<{ resetToken: string }>("/auth/verify-reset-code", {
        method: "POST",
        body: JSON.stringify({ email, code }),
      }, false);
      window.sessionStorage.setItem("kredo.passwordResetToken", result.resetToken);
      router.push("/reset-password");
    } catch (verifyError) {
      setError(verifyError instanceof Error ? verifyError.message : "Could not verify the code.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f9fa] flex items-center justify-center p-4">
      <form onSubmit={sent ? verifyCode : requestCode} className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-extrabold text-[#0a1926]">Forgot password?</h1>
        <p className="text-sm text-slate-500 mt-1 mb-6">
          {sent ? `Enter the 6-digit verification code sent to ${email}.` : "Enter the email associated with your account to receive a verification code."}
        </p>
        {error && <p role="alert" className="mb-4 rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700">{error}</p>}
        {sent ? (
          <>
            <label htmlFor="reset-code" className="mb-1 block text-xs font-semibold text-slate-700">Verification code</label>
            <input
              id="reset-code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]{6}"
              maxLength={6}
              required
              value={code}
              onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
              className="mb-6 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-center font-mono text-lg tracking-[0.4em] text-slate-900"
            />
            <button type="submit" disabled={submitting || code.length !== 6} className="w-full rounded-xl bg-[#0a1926] px-4 py-3 text-sm font-bold text-white disabled:opacity-60">
              {submitting ? "Verifying..." : "Verify code"}
            </button>
            <button type="button" onClick={() => { setSent(false); setCode(""); setError(""); }} className="mt-4 w-full text-xs font-semibold text-sky-800 hover:underline">
              Use a different email
            </button>
          </>
        ) : (
          <>
            <label htmlFor="reset-email" className="mb-1 block text-xs font-semibold text-slate-700">Email</label>
            <input id="reset-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 mb-6" />
            <button type="submit" disabled={submitting} className="w-full rounded-xl bg-[#0a1926] px-4 py-3 text-sm font-bold text-white disabled:opacity-60">
              {submitting ? "Sending..." : "Send verification code"}
            </button>
          </>
        )}
        <p className="mt-5 text-center text-xs text-slate-500"><Link href="/" className="font-semibold text-sky-800 hover:underline">Back to sign in</Link></p>
      </form>
    </main>
  );
};
