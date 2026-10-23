"use client";

import React, { useState } from "react";
import { X, Copy, Check, Send, Sparkles, Building, User, DollarSign, Mail, Phone } from "lucide-react";
import { Deal } from "../data/mockData";

interface ShareReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  referralCode: string;
  referralLink: string;
  onCreateReferral: (referral: {
    businessName: string;
    contactName: string;
    email: string;
    phone: string;
    amount: string;
    facilityType: string;
    referralCode: string;
  }) => Promise<Deal>;
}

export const ShareReferralModal: React.FC<ShareReferralModalProps> = ({
  isOpen,
  onClose,
  referralCode,
  referralLink,
  onCreateReferral
}) => {
  const [activeTab, setActiveTab] = useState<'link' | 'direct'>('link');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Direct referral form state
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [facilityType, setFacilityType] = useState("Asset & Equipment");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${referralLink}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSubmitReferral = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !contactName || !email || !phone) return;

    setIsSubmitting(true);
    setSubmitError("");
    try {
      await onCreateReferral({
        businessName,
        contactName,
        email,
        phone,
        amount,
        facilityType,
        referralCode,
      });
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        // Reset form
        setBusinessName("");
        setContactName("");
        setEmail("");
        setPhone("");
        setAmount("");
      }, 1500);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Could not submit referral.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden transition-all transform scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-sky-100 text-sky-800">
                <Sparkles className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-bold text-slate-900">Share or Submit a Referral</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Send your unique client link or introduce a deal directly for immediate assessment.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-100 bg-slate-50 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('link')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'link'
                ? 'border-[#0a1926] text-[#0a1926]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Referral Link & Code
          </button>
          <button
            onClick={() => setActiveTab('direct')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'direct'
                ? 'border-[#0a1926] text-[#0a1926]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Direct Introduction Form
          </button>
        </div>

        {/* Body content */}
        <div className="p-6">
          {activeTab === 'link' ? (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Your Client Application Link
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 font-mono select-all truncate">
                    {referralLink}
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0a1926] hover:bg-[#152e46] text-white text-xs font-semibold transition-colors shrink-0"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5">
                  All loans submitted via this link are tracked to your partner account for 90 days.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Partner Referral Code
                </label>
                <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-dashed border-slate-300 rounded-xl">
                  <div>
                    <span className="text-xl font-mono font-bold tracking-wider text-slate-900">{referralCode}</span>
                    <p className="text-[11px] text-slate-500">Clients can enter this in any application step</p>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 shadow-2xs transition-colors"
                    title="Copy code"
                  >
                    {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/60 text-xs text-amber-900 leading-relaxed">
                <span className="font-semibold">Commission rule:</span> Commercial loans originating with your tag guarantee a 0.70% – 1.00% trail settlement commission paid upon funding.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitReferral} className="space-y-3.5">
              {submitError && <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700">{submitError}</p>}
              {isSuccess ? (
                <div className="py-8 text-center space-y-2 animate-in zoom-in-95 duration-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Referral Lodged Successfully!</h4>
                  <p className="text-xs text-slate-500">KRD deal created. Our credit team will begin assessment.</p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Business Name *</label>
                    <div className="relative">
                      <Building className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Apex Engineering Pty Ltd"
                        className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/20 focus:border-[#0a1926]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Name *</label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="e.g. Alex Walker"
                          className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/20 focus:border-[#0a1926]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Requested Amount ($)</label>
                      <div className="relative">
                        <DollarSign className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                        <input
                          type="text"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="e.g. 250,000"
                          className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/20 focus:border-[#0a1926]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="alex@business.com.au"
                          className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Facility Type</label>
                      <select
                        value={facilityType}
                        onChange={(e) => setFacilityType(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden"
                      >
                        <option>Asset & Equipment</option>
                        <option>Working Capital</option>
                        <option>Commercial Term Facility</option>
                        <option>Invoice Finance</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#0a1926] hover:bg-[#152e46] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Lodge Direct Referral</span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
