"use client";

import React, { useState, useEffect } from "react";
import { X, Building, Mail, Phone, Tag, ShieldCheck, Check, Percent, FileText, Hash } from "lucide-react";
import { PartnerDirectoryItem } from "@/lib/api";

interface EditPartnerModalProps {
  partner: PartnerDirectoryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdatePartner: (code: string, updates: {
    name: string;
    contactEmail: string;
    partnerType: string;
    status: string;
    phone?: string;
    abn?: string;
    commissionRate?: string;
    bankAccount?: string;
    bsb?: string;
    accountName?: string;
  }) => Promise<void>;
}

export const EditPartnerModal: React.FC<EditPartnerModalProps> = ({
  partner,
  isOpen,
  onClose,
  onUpdatePartner,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [partnerType, setPartnerType] = useState<"Hero" | "Standard" | "Corporate">("Standard");
  const [status, setStatus] = useState<"Active" | "Paused">("Active");
  const [phone, setPhone] = useState("");
  const [abn, setAbn] = useState("");
  const [commissionRate, setCommissionRate] = useState("1.00%");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankBsb, setBankBsb] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (partner) {
      setName(partner.name || "");
      setEmail(partner.email || "");
      setPartnerType(partner.badge === "Hero" ? "Hero" : "Standard");
      setStatus(partner.status || "Active");
      setPhone(partner.phone || "1300 4 KREDO");
      setAbn(partner.abn || "48 000 000 000");
      setCommissionRate(partner.commissionRate || "1.00%");
      setBankAccountName(partner.accountName || "");
      setBankBsb(partner.bsb || "");
      setBankAccountNumber(partner.bankAccount || "");
      setError("");
    }
  }, [partner]);

  if (!isOpen || !partner) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please provide Partner Name and Email.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    try {
      await onUpdatePartner(partner.code, {
        name: name.trim(),
        contactEmail: email.trim(),
        partnerType,
        status,
        phone: phone.trim(),
        abn: abn.trim(),
        commissionRate: commissionRate.trim(),
        bankAccount: bankAccountNumber.trim(),
        bsb: bankBsb.trim(),
        accountName: bankAccountName.trim(),
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update partner.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden max-h-[90vh] overflow-y-auto transition-all transform scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#0a1926] text-white">
                <Building className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-bold text-slate-900">Edit Partner Details</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Update partner details, ABN, and commission structure for <span className="font-mono font-bold text-slate-800">{partner.code}</span>.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-3.5">
          {error && (
            <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700 border border-rose-200">
              {error}
            </p>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Trading / Company Name *</label>
            <div className="relative">
              <Building className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Hayes Partners"
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/20 focus:border-[#0a1926]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Email *</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@partner.com.au"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/20 focus:border-[#0a1926]"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="1300 4 KREDO"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/20 focus:border-[#0a1926]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">ABN</label>
              <div className="relative">
                <FileText className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={abn}
                  onChange={(e) => setAbn(e.target.value)}
                  placeholder="48 192 847 219"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/20 focus:border-[#0a1926]"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Commission Structure</label>
              <div className="relative">
                <Percent className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <select
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/20 bg-white"
                >
                  <option value="0.70%">0.70% (Standard Tier)</option>
                  <option value="0.80%">0.80%</option>
                  <option value="1.00%">1.00% (Default Advisory)</option>
                  <option value="1.25%">1.25% (Growth Tier)</option>
                  <option value="1.50%">1.50% (Hero / Elite)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tier / Badge</label>
              <div className="relative">
                <Tag className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <select
                  value={partnerType}
                  onChange={(e) => setPartnerType(e.target.value as any)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/20 bg-white"
                >
                  <option value="Standard">Standard</option>
                  <option value="Hero">Hero Tier</option>
                  <option value="Corporate">Corporate</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
              <div className="relative">
                <ShieldCheck className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "Active" | "Paused")}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/20 bg-white"
                >
                  <option value="Active">Active</option>
                  <option value="Paused">Paused</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bank Details for Commission Payments */}
          <div className="pt-2 mt-1 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-700 mb-2">Commission Bank Details</p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Account Name</label>
                <div className="relative">
                  <Building className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={bankAccountName}
                    onChange={(e) => setBankAccountName(e.target.value)}
                    placeholder="e.g. Hayes Partners Pty Ltd"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/20 focus:border-[#0a1926]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">BSB</label>
                  <div className="relative">
                    <Hash className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={bankBsb}
                      onChange={(e) => setBankBsb(e.target.value)}
                      placeholder="e.g. 062-000"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/20 focus:border-[#0a1926]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Account Number</label>
                  <div className="relative">
                    <Hash className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={bankAccountNumber}
                      onChange={(e) => setBankAccountNumber(e.target.value)}
                      placeholder="e.g. 1098 4421"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/20 focus:border-[#0a1926]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-[#0a1926] hover:bg-[#14293d] text-white text-xs font-bold shadow-md transition-colors disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Saving...</span>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
