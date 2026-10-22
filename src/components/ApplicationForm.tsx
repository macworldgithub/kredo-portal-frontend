"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Lock, 
  Briefcase, 
  User, 
  FileCheck, 
  Building2,
  CheckCircle2,
  Sparkles
} from "lucide-react";

interface ApplicationFormProps {
  onBackToDemo: () => void;
  referralCode?: string;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  onBackToDemo,
  referralCode = "SPUD",
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [tradingName, setTradingName] = useState("");
  const [abn, setAbn] = useState("");
  const [amount, setAmount] = useState("$50,000 – $100,000");
  const [purpose, setPurpose] = useState("Cashflow assistance");

  // Step 2 State
  const [directorName, setDirectorName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Step 3 Completion State
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (!tradingName) return;
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!directorName || !email) return;
      setCurrentStep(3);
    } else {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fa] flex flex-col font-sans">
      {/* Top Header with official logo */}
      <header className="px-6 sm:px-12 py-3.5 flex items-center justify-between border-b border-slate-200/80 bg-white">
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="Kredo Business Finance"
            className="h-8 w-auto object-contain"
          />
        </div>

        <button
          onClick={onBackToDemo}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to demo</span>
        </button>
      </header>

      {/* Main Application Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-10">
        <div className="max-w-5xl w-full bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          {/* Left Dark Sidebar with Progress Steps */}
          <div className="lg:col-span-5 bg-[#0a1926] text-white p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <span className="px-3 py-1 rounded-full bg-[#182f48] text-sky-300 text-[10px] font-bold tracking-wider uppercase border border-[#23456b]">
                SECURE KREDO APPLICATION
              </span>

              <h2 className="text-3xl font-black tracking-tight text-white mt-4 leading-tight">
                Business finance,<br />simplified.
              </h2>

              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Tell us a little about your business. This first step takes around two minutes.
              </p>

              {/* Progress Milestones */}
              <div className="mt-10 space-y-6">
                <div className="flex items-center gap-3.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    currentStep === 1 
                      ? 'bg-white text-[#0a1926] ring-4 ring-white/20' 
                      : currentStep > 1 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-[#182f48] text-slate-400'
                  }`}>
                    {currentStep > 1 ? <Check className="w-4 h-4 stroke-[3]" /> : <Briefcase className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Business details</div>
                    <div className="text-[11px] text-slate-400">ABN and funding needs</div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    currentStep === 2 
                      ? 'bg-white text-[#0a1926] ring-4 ring-white/20' 
                      : currentStep > 2 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-[#182f48] text-slate-400'
                  }`}>
                    {currentStep > 2 ? <Check className="w-4 h-4 stroke-[3]" /> : <User className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Director details</div>
                    <div className="text-[11px] text-slate-400">Identity and consent</div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    currentStep === 3 
                      ? 'bg-white text-[#0a1926] ring-4 ring-white/20' 
                      : 'bg-[#182f48] text-slate-400'
                  }`}>
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Review & submit</div>
                    <div className="text-[11px] text-slate-400">Secure final check</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Security Note */}
            <div className="pt-8 border-t border-slate-800/80">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <Lock className="w-3.5 h-3.5 text-sky-400" />
                <span>Bank-grade encryption</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                Your information is handled in line with Australian privacy and credit requirements.
              </p>
            </div>
          </div>

          {/* Right Interactive Form Area strictly matching screenshot */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4 my-auto animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-black text-[#0a1926]">Application Received!</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Your loan assessment has been initiated under partner code <strong className="font-mono text-slate-900">{referralCode}</strong>. A dedicated credit analyst will contact you within two hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={onBackToDemo}
                    className="px-6 py-2.5 rounded-full bg-[#0a1926] text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Return to Partner Platform
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleNextStep} className="space-y-6">
                {/* Step indicator header */}
                <div className="flex items-center justify-between pb-2">
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      STEP {currentStep} OF 3
                    </div>
                    <h3 className="text-2xl font-black text-[#0a1926] mt-0.5">
                      {currentStep === 1 && "About your business"}
                      {currentStep === 2 && "Director & contact info"}
                      {currentStep === 3 && "Confirm & submit application"}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-sky-600">
                    {currentStep === 1 ? "33%" : currentStep === 2 ? "66%" : "100%"}
                  </span>
                </div>

                {/* Progress bar line */}
                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#1e4868] h-full transition-all duration-300"
                    style={{ width: currentStep === 1 ? '33%' : currentStep === 2 ? '66%' : '100%' }}
                  ></div>
                </div>

                {/* Step 1 Fields */}
                {currentStep === 1 && (
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        BUSINESS TRADING NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={tradingName}
                        onChange={(e) => setTradingName(e.target.value)}
                        placeholder="e.g. South Coast Plumbing"
                        className="w-full px-4 py-2.5 text-xs text-slate-900 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/10 focus:border-[#0a1926] placeholder:text-slate-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        ABN *
                      </label>
                      <input
                        type="text"
                        value={abn}
                        onChange={(e) => setAbn(e.target.value)}
                        placeholder="11 digit Australian Business Number"
                        className="w-full px-4 py-2.5 text-xs text-slate-900 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/10 focus:border-[#0a1926] placeholder:text-slate-400"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          FUNDING AMOUNT
                        </label>
                        <select
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full px-3 py-2.5 text-xs text-slate-900 border border-slate-200 rounded-xl focus:outline-hidden"
                        >
                          <option>$50,000 – $100,000</option>
                          <option>$100,000 – $250,000</option>
                          <option>$250,000 – $500,000</option>
                          <option>$500,000 – $1,000,000</option>
                          <option>$1,000,000+</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          PRIMARY PURPOSE
                        </label>
                        <select
                          value={purpose}
                          onChange={(e) => setPurpose(e.target.value)}
                          className="w-full px-3 py-2.5 text-xs text-slate-900 border border-slate-200 rounded-xl focus:outline-hidden"
                        >
                          <option>Cashflow assistance</option>
                          <option>Asset & Equipment Purchase</option>
                          <option>Refinance Existing Facility</option>
                          <option>Business Expansion</option>
                        </select>
                      </div>
                    </div>

                    {/* Attribution box strictly matching screenshot */}
                    <div className="pt-2">
                      <div className="p-3.5 bg-slate-50 border-l-3 border-amber-500 rounded-r-xl border border-slate-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                              PARTNER / REFERRAL CODE
                            </span>
                            <span className="font-mono text-base font-black text-[#0a1926] tracking-wider mt-0.5 block">
                              {referralCode}
                            </span>
                          </div>
                          <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        </div>
                        <div className="text-[11px] text-amber-800 font-medium mt-1">
                          Referred by Mark Carroll · attribution locked
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-sky-50/70 rounded-xl border border-sky-100 flex items-start gap-2 text-[11px] text-sky-900 leading-relaxed">
                      <Lock className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      <span>
                        By continuing, you agree Kredo may use these details to assess eligibility and contact you about business finance.
                      </span>
                    </div>
                  </div>
                )}

                {/* Step 2 Fields */}
                {currentStep === 2 && (
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        PRIMARY DIRECTOR / APPLICANT NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={directorName}
                        onChange={(e) => setDirectorName(e.target.value)}
                        placeholder="e.g. Marcus Vance"
                        className="w-full px-4 py-2.5 text-xs text-slate-900 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/10"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="marcus@business.com.au"
                        className="w-full px-4 py-2.5 text-xs text-slate-900 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/10"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        MOBILE PHONE
                      </label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+61 400 000 000"
                        className="w-full px-4 py-2.5 text-xs text-slate-900 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/10"
                      />
                    </div>
                  </div>
                )}

                {/* Step 3 Fields */}
                {currentStep === 3 && (
                  <div className="space-y-4 pt-2">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-500">Business Trading Name</span>
                        <strong className="text-slate-900">{tradingName}</strong>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-500">Facility Amount</span>
                        <strong className="text-slate-900">{amount}</strong>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-500">Director Contact</span>
                        <strong className="text-slate-900">{directorName} ({email})</strong>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-500">Attribution Tag</span>
                        <strong className="font-mono text-sky-700">{referralCode} (Attribution Secured)</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit / Continue Button strictly matching screenshot */}
                <div className="pt-4 flex items-center justify-between gap-3">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={() => setCurrentStep((prev) => (prev - 1) as any)}
                      className="px-4 py-3 rounded-full text-slate-600 font-bold text-xs hover:bg-slate-100 transition-colors"
                    >
                      Back
                    </button>
                  )}

                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#0a1926] hover:bg-[#14293d] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                  >
                    <span>{currentStep === 3 ? "Submit application" : "Continue securely"}</span>
                    <ArrowRight className="w-4 h-4 text-sky-400" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
