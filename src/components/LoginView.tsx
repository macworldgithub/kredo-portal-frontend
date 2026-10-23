"use client";

import React, { useState } from "react";
import { LogIn } from "lucide-react";
import { apiRequest, AuthUser, setAccessToken, setCurrentUser } from "@/lib/api";
import Link from "next/link";

interface LoginViewProps {
  onLogin: (user: AuthUser) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const result = await apiRequest<{ accessToken: string; user: AuthUser }>(
        "/auth/login",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
        },
        false,
      );
      setAccessToken(result.accessToken);
      setCurrentUser(result.user);
      onLogin(result.user);
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Sign in failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f9fa] flex items-center justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <img src="/logo.png" alt="Kredo" className="h-10 w-auto object-contain mb-8" />
        <h1 className="text-2xl font-extrabold text-[#0a1926]">Sign in to Kredo</h1>
        <p className="text-sm text-slate-500 mt-1 mb-6">Use your partner or master account credentials.</p>
        {error && <p role="alert" className="mb-4 rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700">{error}</p>}
        <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
        <input
          type="email"
          required
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 mb-4"
        />
        <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
        <input
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 mb-6"
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0a1926] px-4 py-3 text-sm font-bold text-white disabled:opacity-60"
        >
          <LogIn className="w-4 h-4" />
          {submitting ? "Signing in..." : "Sign in"}
        </button>
        <div className="mt-5 flex justify-between text-xs">
          <Link href="/signup" className="font-semibold text-sky-800 hover:underline">Create partner account</Link>
          <Link href="/forgot-password" className="text-slate-500 hover:text-slate-800">Forgot password?</Link>
        </div>
      </form>
    </main>
  );
};
