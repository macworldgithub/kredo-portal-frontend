"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiRequest, clearAccessToken, PASSWORD_PATTERN } from "@/lib/api";

export const ResetPasswordView: React.FC = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!complete) return;
    const redirectTimer = window.setTimeout(() => router.replace("/"), 1200);
    return () => window.clearTimeout(redirectTimer);
  }, [complete, router]);

  useEffect(() => {
    let active = true;
    void Promise.resolve().then(() => {
      if (active) {
        const resetToken = window.sessionStorage.getItem("kredo.passwordResetToken") || "";
        window.sessionStorage.removeItem("kredo.passwordResetToken");
        setToken(resetToken);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    if (!token) {
      setError("The verified reset session is missing or expired. Request a new code.");
      return;
    }
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
      await apiRequest("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, newPassword: password }),
      }, false);
      clearAccessToken();
      setComplete(true);
    } catch (resetError) {
      setError(resetError instanceof Error ? resetError.message : "Could not reset password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f9fa] flex items-center justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-extrabold text-[#0a1926]">Reset your password</h1>
        <p className="text-sm text-slate-500 mt-1 mb-6">Choose a password using exactly 6 letters and/or digits, with no symbols or spaces.</p>
        {complete ? (
          <div>
            <p role="status" className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">Password reset. Redirecting you to sign in...</p>
            <Link href="/" className="mt-5 block text-center text-xs font-semibold text-sky-800 hover:underline">Go to sign in</Link>
          </div>
        ) : (
          <>
            {error && <p role="alert" className="mb-4 rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700">{error}</p>}
            <label className="block text-xs font-semibold text-slate-700 mb-1">New password</label>
            <input type="password" required minLength={6} maxLength={6} pattern={PASSWORD_PATTERN.source} title="Enter exactly 6 letters and/or digits."
              autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 mb-4" />
            <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm new password</label>
            <input type="password" required minLength={6} maxLength={6} pattern={PASSWORD_PATTERN.source} title="Enter exactly 6 letters and/or digits."
              autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 mb-6" />
            <button type="submit" disabled={submitting || !token} className="w-full rounded-xl bg-[#0a1926] px-4 py-3 text-sm font-bold text-white disabled:opacity-60">
              {submitting ? "Resetting..." : "Reset password"}
            </button>
          </>
        )}
      </form>
    </main>
  );
};
