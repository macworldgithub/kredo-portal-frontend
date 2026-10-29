"use client";

import React, { useState } from "react";
import { X, Send, CheckCircle2, Phone, Mail, Building, User } from "lucide-react";
import { apiRequest } from "@/lib/api";

interface TalkToSomeoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  referralCode?: string;
  sourceContext?: string;
}

export const TalkToSomeoneModal: React.FC<TalkToSomeoneModalProps> = ({
  isOpen,
  onClose,
  referralCode,
  sourceContext = "Business Details / Funding step",
}) => {
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await apiRequest(
        "/portal/contact-request",
        {
          method: "POST",
          body: JSON.stringify({
            businessName,
            contactName,
            phone,
            email,
            source: `Talk to someone - ${sourceContext}`,
            referralCode,
          }),
        },
        false,
      );
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit request.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-[#0a1926] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Talk to someone</h3>
              <p className="text-[11px] text-slate-300">A finance specialist will call you right back</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
              </div>
              <h4 className="text-lg font-bold text-[#0a1926]">Request received</h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                Thank you, <strong>{contactName}</strong>. Our team has received your details and will call{" "}
                <strong>{phone}</strong> shortly.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-5 py-2.5 rounded-full bg-[#0a1926] text-white font-bold text-xs hover:bg-slate-800 transition-colors"
                >
                  Back to application
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Business Name *
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Apex Transport Pty Ltd"
                    className="w-full pl-9 pr-3 py-2.5 text-xs text-slate-900 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Contact Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Marcus Vance"
                    className="w-full pl-9 pr-3 py-2.5 text-xs text-slate-900 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="1300 4 KREDO or 0400 000 000"
                    className="w-full pl-9 pr-3 py-2.5 text-xs text-slate-900 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="marcus@apextransport.com.au"
                    className="w-full pl-9 pr-3 py-2.5 text-xs text-slate-900 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/10"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#0a1926] hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-sky-400" />
                  <span>{submitting ? "Submitting..." : "Submit request"}</span>
                </button>
              </div>

              <div className="text-center pt-2">
                <span className="text-[11px] text-slate-500">
                  Or call directly:{" "}
                  <a href="tel:1300457336" className="font-bold text-[#0a1926] hover:underline">
                    1300 4 KREDO (1300 457 336)
                  </a>
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

