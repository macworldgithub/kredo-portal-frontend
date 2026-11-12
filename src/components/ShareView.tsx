"use client";

import React, { useState } from "react";
import { Copy, Check, Download, ExternalLink, Mail } from "lucide-react";
import { QRCodeDisplay } from "./QRCodeDisplay";

interface ShareViewProps {
  onOpenHeroDemo: () => void;
  referralCode: string;
  referralLink: string;
  dailyDigest: boolean;
  onToggleDailyDigest: (enabled: boolean) => Promise<void>;
}

export const ShareView: React.FC<ShareViewProps> = ({
  onOpenHeroDemo,
  referralCode,
  referralLink,
  dailyDigest,
  onToggleDailyDigest,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [preferenceError, setPreferenceError] = useState("");
  const [savingPreference, setSavingPreference] = useState(false);

  const toggleDailyDigest = async () => {
    setSavingPreference(true);
    setPreferenceError("");
    try {
      await onToggleDailyDigest(!dailyDigest);
    } catch (error) {
      setPreferenceError(error instanceof Error ? error.message : "Could not update notification preference.");
    } finally {
      setSavingPreference(false);
    }
  };

  const fullReferralUrl = referralLink.startsWith('http://') || referralLink.startsWith('https://')
    ? referralLink
    : `https://${referralLink}`;

  const shareMessage = `Hi — Kredo can help with business funding from $5,000 to $2 million. You can check eligibility and apply here: ${fullReferralUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${referralLink}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(shareMessage);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  const downloadQR = () => {
    // Generate clean PNG / SVG download
    const svgElement = document.getElementById("share-qr-svg");
    if (!svgElement) return;
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kredo-qr-${referralCode}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <span className="w-4 h-0.5 bg-slate-300"></span>
          <span>PARTNER TOOLKIT</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0a1926] tracking-tight mt-1">
          Share & QR
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Use one attributed link everywhere.           Every valid visit stores {referralCode} for 90 days.
        </p>
        <div className="w-12 h-0.5 bg-amber-600 mt-5"></div>
      </div>

      {/* Main Dark Card with QR Box matching Netlify */}
      <div className="bg-[#0a1926] text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl border border-[#1b344d]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Text and Link Input */}
          <div className="flex-1 max-w-xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-[#172c42] text-slate-300 text-[10px] font-bold tracking-wider uppercase border border-[#234263]">
              YOUR ONE-SOURCE LINK
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Ready for the next conversation.
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Text it, email it, add it to your website, or let a client scan the QR while you&apos;re together.
            </p>

            <div className="pt-2">
              <div className="bg-white rounded-xl p-1.5 pl-4 flex items-center justify-between shadow-md">
                <span className="text-xs font-mono font-medium text-slate-800 truncate mr-2 select-all">
                  {referralLink}
                </span>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#d4eaf7] hover:bg-[#bedcf0] text-[#0a1926] text-xs font-bold transition-colors cursor-pointer"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right QR Card Box */}
          <div className="bg-white text-slate-900 rounded-3xl p-6 shadow-xl flex flex-col items-center shrink-0 w-64 text-center">
            <div className="p-2 bg-white rounded-2xl flex items-center justify-center">
              <QRCodeDisplay id="share-qr-code" value={fullReferralUrl} size={160} />
            </div>

            <button
              onClick={downloadQR}
              className="mt-4 w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PNG</span>
            </button>

            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 mt-3">
              CODE {referralCode}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Two Split Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Ready-to-send message */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Ready-to-send message</h3>
                <p className="text-[11px] text-slate-400">Short, useful, and attributed</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 text-xs text-slate-700 leading-relaxed font-sans mt-3">
              Hi — Kredo can help with business funding from $5,000 to $2 million. You can check eligibility and apply here: <strong className="text-slate-900">{referralLink}</strong>
            </div>
          </div>

          <button
            onClick={handleCopyMessage}
            className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            {copiedMessage ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span>{copiedMessage ? 'Message copied!' : 'Copy message'}</span>
          </button>
        </div>

        {/* Card 2: Update preference */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Update preference</h3>
                <p className="text-[11px] text-slate-400">Choose how deal changes reach you</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 flex items-center justify-between mt-3">
              <div>
                <div className="text-xs font-bold text-slate-900">Status update emails</div>
                <div className="text-[11px] text-slate-500">An email whenever an application changes stage</div>
              </div>

              {/* Toggle switch */}
              <button
                type="button"
                onClick={() => void toggleDailyDigest()}
                disabled={savingPreference}
                className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${
                  dailyDigest ? 'bg-[#1e4868]' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                    dailyDigest ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            {preferenceError && <p role="alert" className="mt-2 text-xs text-rose-600">{preferenceError}</p>}
          </div>

          <button
            onClick={onOpenHeroDemo}
            className="mt-4 w-full flex items-center justify-between py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            <span>Open hero partner example</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
