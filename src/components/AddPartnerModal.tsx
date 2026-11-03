"use client";

import React, { useState } from "react";
import { X, ArrowRight, ChevronDown, Percent, Phone, Hash } from "lucide-react";

interface AddPartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPartner: (partner: {
    tradingName: string;
    primaryContact: string;
    email: string;
    phone?: string;
    abn?: string;
    commissionRate?: string;
    bankAccount?: string;
    bsb?: string;
    accountName?: string;
    partnerType: string;
    uniqueCode: string;
  }) => Promise<void>;
}

export const AddPartnerModal: React.FC<AddPartnerModalProps> = ({
  isOpen,
  onClose,
  onAddPartner,
}) => {
  const [tradingName, setTradingName] = useState("");
  const [primaryContact, setPrimaryContact] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [abn, setAbn] = useState("");
  const [commissionRate, setCommissionRate] = useState("1.00%");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankBsb, setBankBsb] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [partnerType, setPartnerType] = useState("Standard");
  const [uniqueCode, setUniqueCode] = useState("PARTNE2");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleGenerateCode = () => {
    const prefix = tradingName ? tradingName.substring(0, 6).toUpperCase().replace(/[^A-Z]/g, '') : "PARTNE";
    const num = Math.floor(1 + Math.random() * 9);
    setUniqueCode(`${prefix || 'PARTNE'}${num}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tradingName) return;

    setSubmitting(true);
    setError("");
    try {
      await onAddPartner({
        tradingName,
        primaryContact,
        email,
        phone: phone || "1300 4 KREDO",
        abn: abn || "48 000 000 000",
        commissionRate: commissionRate || "1.00%",
        bankAccount: bankAccountNumber || "",
        bsb: bankBsb || "",
        accountName: bankAccountName || "",
        partnerType,
        uniqueCode,
      });
      onClose();
      setTradingName("");
      setPrimaryContact("");
      setEmail("");
      setPhone("");
      setAbn("");
      setCommissionRate("1.00%");
      setBankAccountName("");
      setBankBsb("");
      setBankAccountNumber("");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Could not create partner.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button top right */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200/60"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-black text-[#0a1926] tracking-tight">
            Add a referral partner
          </h2>
          <p className="text-xs text-slate-500 mt-1.5">
            Create the organisation, set commission structure, and send their automated welcome invite.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {error && <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700">{error}</p>}
          
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              TRADING NAME *
            </label>
            <input
              type="text"
              required
              value={tradingName}
              onChange={(e) => {
                setTradingName(e.target.value);
                if (uniqueCode === "PARTNE2" && e.target.value.length > 2) {
                  setUniqueCode(e.target.value.substring(0, 6).toUpperCase().replace(/[^A-Z]/g, '') + "1");
                }
              }}
              placeholder="e.g. Rowan Advisory"
              className="w-full px-4 py-2 text-xs text-slate-800 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/10 focus:border-[#0a1926] placeholder:text-slate-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                PRIMARY CONTACT
              </label>
              <input
                type="text"
                value={primaryContact}
                onChange={(e) => setPrimaryContact(e.target.value)}
                placeholder="Full name"
                className="w-full px-4 py-2 text-xs text-slate-800 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/10 focus:border-[#0a1926] placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                EMAIL *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@firm.com.au"
                className="w-full px-4 py-2 text-xs text-slate-800 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/10 focus:border-[#0a1926] placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                PHONE NUMBER
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0412 345 678"
                  className="w-full px-4 py-2 text-xs text-slate-800 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/10 focus:border-[#0a1926] placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                ABN
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={abn}
                  onChange={(e) => setAbn(e.target.value)}
                  placeholder="48 192 847 219"
                  className="w-full px-4 py-2 text-xs text-slate-800 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/10 focus:border-[#0a1926] placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                COMMISSION STRUCTURE
              </label>
              <div className="relative">
                <select
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(e.target.value)}
                  className="w-full px-4 py-2 text-xs text-slate-800 border border-slate-200 rounded-xl focus:outline-hidden appearance-none bg-white pr-8 font-medium"
                >
                  <option value="0.70%">0.70% (Standard Tier)</option>
                  <option value="0.80%">0.80%</option>
                  <option value="1.00%">1.00% (Default Advisory)</option>
                  <option value="1.25%">1.25% (Growth Tier)</option>
                  <option value="1.50%">1.50% (Hero / Elite)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                PARTNER TYPE
              </label>
              <div className="relative">
                <select
                  value={partnerType}
                  onChange={(e) => setPartnerType(e.target.value)}
                  className="w-full px-4 py-2 text-xs text-slate-800 border border-slate-200 rounded-xl focus:outline-hidden appearance-none bg-white pr-8 font-medium"
                >
                  <option>Standard</option>
                  <option>Hero</option>
                  <option>Corporate</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Bank Details for Commission Payments */}
          <div className="pt-2 mt-1 border-t border-slate-100">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              COMMISSION BANK DETAILS
            </p>
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  ACCOUNT NAME
                </label>
                <input
                  type="text"
                  value={bankAccountName}
                  onChange={(e) => setBankAccountName(e.target.value)}
                  placeholder="e.g. Rowan Advisory Pty Ltd"
                  className="w-full px-4 py-2 text-xs text-slate-800 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/10 focus:border-[#0a1926] placeholder:text-slate-400"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    BSB
                  </label>
                  <input
                    type="text"
                    value={bankBsb}
                    onChange={(e) => setBankBsb(e.target.value)}
                    placeholder="e.g. 062-000"
                    className="w-full px-4 py-2 text-xs text-slate-800 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/10 focus:border-[#0a1926] placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    ACCOUNT NUMBER
                  </label>
                  <input
                    type="text"
                    value={bankAccountNumber}
                    onChange={(e) => setBankAccountNumber(e.target.value)}
                    placeholder="e.g. 1098 4421"
                    className="w-full px-4 py-2 text-xs text-slate-800 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/10 focus:border-[#0a1926] placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              UNIQUE PARTNER CODE *
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                required
                value={uniqueCode}
                onChange={(e) => setUniqueCode(e.target.value.toUpperCase())}
                className="w-full px-3.5 py-2 text-xs font-mono font-bold text-slate-900 border border-slate-200 rounded-xl uppercase focus:outline-hidden"
              />
              <button
                type="button"
                onClick={handleGenerateCode}
                className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold shrink-0 cursor-pointer transition-colors"
              >
                Generate
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0a1926] hover:bg-[#14293d] text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
            >
              <span>{submitting ? "Creating & Sending Invite..." : "Create partner"}</span>
              <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
