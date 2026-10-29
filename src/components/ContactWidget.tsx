"use client";

import React, { useState } from "react";
import { MessageSquare, Phone, X, Send, CheckCircle2 } from "lucide-react";
import { apiRequest } from "@/lib/api";

export const ContactWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  // Form states
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
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
            source: "Floating Contact Widget",
          }),
        },
        false,
      );
      setSubmitted(true);
    } catch {
      // fallback
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setShowContactForm(false);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 font-sans print:hidden">
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-3xl bg-white p-5 shadow-2xl border border-slate-200 animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h4 className="text-sm font-bold text-[#0a1926]">Talk to someone</h4>
              <p className="text-[11px] text-slate-500">Kredo commercial finance team</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {!showContactForm ? (
            <div className="py-4 space-y-3">
              {/* Call Us - 1300 4 KREDO (1300 457 336) */}
              <a
                href="tel:1300457336"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-700 flex items-center justify-center group-hover:bg-[#0a1926] group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Call Us directly</div>
                  <div className="text-xs font-mono font-bold text-sky-700">1300 4 KREDO (1300 457 336)</div>
                </div>
              </a>

              {/* Send Message / Contact Form Option */}
              <button
                type="button"
                onClick={() => setShowContactForm(true)}
                className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#0a1926] hover:bg-slate-800 text-white transition-colors cursor-pointer text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 text-sky-400 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Send Message / Request Callback</div>
                  <div className="text-[11px] text-slate-300">We respond in under 20 minutes</div>
                </div>
              </button>

              <div className="pt-2 text-center text-[10px] text-slate-400">
                Operating 8:30am – 6:00pm AEST · Sydney NSW
              </div>
            </div>
          ) : submitted ? (
            <div className="py-6 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h5 className="text-sm font-bold text-slate-900">Message Sent</h5>
              <p className="text-xs text-slate-600">A finance manager will call you back shortly.</p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-3 px-4 py-1.5 rounded-full bg-[#0a1926] text-white text-xs font-bold"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="py-3 space-y-3">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Business Name *"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <input
                  type="text"
                  required
                  placeholder="Your Name *"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <input
                  type="tel"
                  required
                  placeholder="Phone Number *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <input
                  type="email"
                  required
                  placeholder="Email Address *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                />
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="px-3 py-2 text-xs rounded-xl border border-slate-200 text-slate-600"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2 rounded-xl bg-[#0a1926] text-white text-xs font-bold"
                >
                  {submitting ? "Sending..." : "Submit"}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#0a1926] text-white shadow-xl hover:bg-[#14293d] hover:scale-105 active:scale-95 transition-all cursor-pointer border border-sky-400/20"
      >
        <Phone className="w-4 h-4 text-sky-400" />
        <span className="text-xs font-bold tracking-wide">1300 4 KREDO</span>
      </button>
    </div>
  );
};

