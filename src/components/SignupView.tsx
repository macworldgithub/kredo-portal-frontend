"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";
import { apiRequest, clearAccessToken, PASSWORD_PATTERN } from "@/lib/api";

export const SignupView: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [partnerCode, setPartnerCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!PASSWORD_PATTERN.test(password)) {
      setError("Password must be exactly 6 letters and/or digits, with no symbols or spaces.");
      return;
    }
    setSubmitting(true);
    try {
      await apiRequest<{ message: string }>("/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, partnerCode, password }),
      }, false);
      clearAccessToken();
      router.replace("/");
    } catch (signupError) {
      setError(signupError instanceof Error ? signupError.message : "Could not create account.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f9fa] flex items-center justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <img src="/logo.png" alt="Kredo" className="h-10 w-auto object-contain mb-8" />
        <h1 className="text-2xl font-extrabold text-[#0a1926]">Create partner account</h1>
        <p className="text-sm text-slate-500 mt-1 mb-6">Register with your organization’s active referral code.</p>
        {error && <p role="alert" className="mb-4 rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700">{error}</p>}
        <label className="block text-xs font-semibold text-slate-700 mb-1">Full name</label>
        <input required maxLength={120} autoComplete="name" value={name} onChange={(event) => setName(event.target.value)}
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 mb-4" />
        <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
        <input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 mb-4" />
        <label className="block text-xs font-semibold text-slate-700 mb-1">Partner referral code</label>
        <input required autoCapitalize="characters" value={partnerCode} onChange={(event) => setPartnerCode(event.target.value.toUpperCase())}
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-mono text-slate-900 mb-4" />
        <label className="block text-xs font-semibold text-slate-700 mb-1">Password (exactly 6 letters or digits)</label>
        <input type="password" required minLength={6} maxLength={6} pattern={PASSWORD_PATTERN.source} title="Enter exactly 6 letters and/or digits."
          autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 mb-4" />
        <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm password</label>
        <input type="password" required minLength={6} maxLength={6} pattern={PASSWORD_PATTERN.source} title="Enter exactly 6 letters and/or digits."
          autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 mb-6" />
        <button type="submit" disabled={submitting} className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0a1926] px-4 py-3 text-sm font-bold text-white disabled:opacity-60">
          <UserPlus className="w-4 h-4" />
          {submitting ? "Creating account..." : "Create account"}
        </button>
        <p className="mt-5 text-center text-xs text-slate-500">
          Already registered? <Link href="/" className="font-semibold text-sky-800 hover:underline">Sign in</Link>
        </p>
      </form>
    </main>
  );
};
