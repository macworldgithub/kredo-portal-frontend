"use client";

import React, { useState } from "react";
import { 
  Building, 
  Mail, 
  Phone, 
  CreditCard, 
  Bell, 
  Shield, 
  Check, 
  Save,
  CheckCircle
} from "lucide-react";
import { PartnerProfile } from "../data/mockData";

interface SettingsViewProps {
  partner: PartnerProfile;
  onUpdatePartner: (updated: PartnerProfile) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  partner,
  onUpdatePartner,
}) => {
  const [formData, setFormData] = useState<PartnerProfile>({ ...partner });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePartner(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a1926] tracking-tight">
          Partner Settings
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Configure company profile, settlement remittance bank account, and commission alerts.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business details */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building className="w-4 h-4 text-slate-700" />
            <h3 className="text-sm font-bold text-slate-900">Partner Details</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Partner Organization</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/10"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Partner Code (System Generated)</label>
              <input
                type="text"
                disabled
                value={formData.code}
                className="w-full px-3 py-2 text-xs font-mono border border-slate-200 rounded-lg bg-slate-100 text-slate-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Email</label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Remittance & Bank account */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <CreditCard className="w-4 h-4 text-slate-700" />
            <h3 className="text-sm font-bold text-slate-900">Commission Remittance Bank Details</h3>
          </div>

          <p className="text-xs text-slate-500">
            Commissions are deposited every Friday upon client loan settlement. Ensure your Australian banking details are accurate.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">BSB Code</label>
              <input
                type="text"
                value={formData.bsb}
                onChange={(e) => setFormData({ ...formData, bsb: e.target.value })}
                className="w-full px-3 py-2 text-xs font-mono border border-slate-200 rounded-lg focus:outline-hidden"
                placeholder="062-000"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Account Number</label>
              <input
                type="text"
                value={formData.bankAccount}
                onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                className="w-full px-3 py-2 text-xs font-mono border border-slate-200 rounded-lg focus:outline-hidden"
                placeholder="1098 4421"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Business ABN</label>
              <input
                type="text"
                value={formData.abn}
                onChange={(e) => setFormData({ ...formData, abn: e.target.value })}
                className="w-full px-3 py-2 text-xs font-mono border border-slate-200 rounded-lg focus:outline-hidden"
                placeholder="48 192 847 219"
              />
            </div>
          </div>
        </div>

        {/* Notifications & Preferences */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Bell className="w-4 h-4 text-slate-700" />
            <h3 className="text-sm font-bold text-slate-900">Alerts & Notifications</h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.notificationsEnabled}
                onChange={(e) => setFormData({ ...formData, notificationsEnabled: e.target.checked })}
                className="w-4 h-4 rounded-sm border-slate-300 text-[#0a1926] focus:ring-0"
              />
              <span className="text-xs text-slate-700 font-medium">Real-time SMS alerts on loan assessment updates</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.settlementAlerts}
                onChange={(e) => setFormData({ ...formData, settlementAlerts: e.target.checked })}
                className="w-4 h-4 rounded-sm border-slate-300 text-[#0a1926] focus:ring-0"
              />
              <span className="text-xs text-slate-700 font-medium">Settlement notification & commission remittance receipt emails</span>
            </label>
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0a1926] hover:bg-[#14293d] text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
          {savedSuccess && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold animate-in fade-in">
              <CheckCircle className="w-4 h-4" />
              <span>Settings saved successfully!</span>
            </span>
          )}
        </div>
      </form>
    </div>
  );
};
