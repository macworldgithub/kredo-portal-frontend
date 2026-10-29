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
  Plus,
  Trash2,
  PhoneCall,
  Sparkles
} from "lucide-react";
import { TalkToSomeoneModal } from "./TalkToSomeoneModal";

export interface DirectorItem {
  salutation: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface ApplicationFormProps {
  onBackToDemo: () => void;
  referralCode?: string;
  onSubmitApplication: (application: {
    tradingName: string;
    abn: string;
    amount: string;
    purpose: string;
    directorName: string;
    email: string;
    phone: string;
    directors?: DirectorItem[];
    referralCode: string;
  }) => Promise<void>;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  onBackToDemo,
  referralCode = "SPUD",
  onSubmitApplication,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form State - Step 1
  const [tradingName, setTradingName] = useState("");
  const [abn, setAbn] = useState("");
  const [amount, setAmount] = useState("$50,000 – $100,000");
  const [purpose, setPurpose] = useState("Cashflow assistance");

  // Step 2 State - Multi Directors (no DOB, per section 3.2)
  const [directors, setDirectors] = useState<DirectorItem[]>([
    {
      salutation: "Mr",
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  ]);

  // Talk to someone modal state
  const [talkModalOpen, setTalkModalOpen] = useState(false);
  const [talkContext, setTalkContext] = useState("");

  // Step 3 Completion State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const updateDirector = (index: number, field: keyof DirectorItem, value: string) => {
    setDirectors((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const addAnotherDirector = () => {
    setDirectors((prev) => [
      ...prev,
      {
        salutation: "Mr",
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phone: "",
      },
    ]);
  };

  const removeDirector = (index: number) => {
    if (directors.length <= 1) return;
    setDirectors((prev) => prev.filter((_, idx) => idx !== index));
  };

  const openTalkModal = (context: string) => {
    setTalkContext(context);
    setTalkModalOpen(true);
  };

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (!tradingName) return;
      setCurrentStep(2);
    } else if (currentStep === 2) {
      const first = directors[0];
      if (!first.firstName || !first.lastName || !first.email) return;
      setCurrentStep(3);
    } else {
      setIsSubmitting(true);
      setSubmitError("");
      try {
        const primary = directors[0];
        const primaryFullName = `${primary.firstName} ${primary.lastName}`.trim();
        await onSubmitApplication({
          tradingName,
          abn,
          amount,
          purpose,
          directorName: primaryFullName,
          email: primary.email,
          phone: primary.phone,
          directors,
          referralCode,
        });
        setIsSubmitted(true);
      } catch (error) {
        setSubmitError(error instanceof Error ? error.message : "Could not submit the application.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const primaryDirector = directors[0];

  return (
    <div className="min-h-screen bg-[#f7f9fa] flex flex-col font-sans">
      {/* Top Header with official logo that links back to homepage (Section 3.4) */}
      <header className="px-6 sm:px-12 py-3.5 flex items-center justify-between border-b border-slate-200/80 bg-white">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToDemo}
            className="flex items-center cursor-pointer group"
            title="Return to Kredo Home"
          >
            <img
              src="/logo.png"
              alt="Kredo Business Finance"
              className="h-8 w-auto object-contain transition-opacity group-hover:opacity-80"
            />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:1300457336"
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-100"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>1300 4 KREDO (1300 457 336)</span>
          </a>

          <button
            onClick={onBackToDemo}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to demo</span>
          </button>
        </div>
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
                    <div className="text-[11px] text-slate-400">Identity and contact</div>
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
                Your information is handled in line with Australian privacy and credit requirements. Phone: 1300 4 KREDO.
              </p>
            </div>
          </div>

          {/* Right Interactive Form Area */}
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
                {submitError && <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700">{submitError}</p>}
                
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
                    {/* Section 3.3 Talk to Someone button on Business Details */}
                    <div className="flex items-center justify-between p-3 bg-amber-50/80 border border-amber-200 rounded-2xl">
                      <div className="flex items-center gap-2 text-xs text-amber-900 font-medium">
                        <PhoneCall className="w-4 h-4 text-amber-600" />
                        <span>Need assistance with your loan sizing?</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => openTalkModal("Business Details page")}
                        className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-bold shadow-xs cursor-pointer"
                      >
                        Talk to someone
                      </button>
                    </div>

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
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                            FUNDING AMOUNT
                          </label>
                          <button
                            type="button"
                            onClick={() => openTalkModal("Funding Requirements")}
                            className="text-[10px] font-bold text-amber-600 hover:underline"
                          >
                            Talk to someone
                          </button>
                        </div>
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

                    {/* Attribution box */}
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
                          Attribution locked to partner {referralCode}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-sky-50/70 rounded-xl border border-sky-100 flex items-start gap-2 text-[11px] text-sky-900 leading-relaxed">
                      <Lock className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      <span>
                        By continuing, you agree Kredo may use these details to assess eligibility and contact you about business finance. Questions? Call 1300 4 KREDO.
                      </span>
                    </div>
                  </div>
                )}

                {/* Step 2 Fields - Director Details (No DOB, Salutation, First, Middle, Last, Email, Phone, + Add Another Director) */}
                {currentStep === 2 && (
                  <div className="space-y-5 pt-2 max-h-[460px] overflow-y-auto pr-1">
                    {directors.map((dir, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative"
                      >
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                            {index === 0 ? "Primary Director Details" : `Director ${index + 1}`}
                          </span>
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => removeDirector(index)}
                              className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 font-semibold cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Remove</span>
                            </button>
                          )}
                        </div>

                        {/* Name fields row */}
                        <div className="grid grid-cols-12 gap-2.5">
                          <div className="col-span-3 sm:col-span-2">
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                              Title
                            </label>
                            <select
                              value={dir.salutation}
                              onChange={(e) => updateDirector(index, "salutation", e.target.value)}
                              className="w-full px-2 py-2 text-xs border border-slate-200 rounded-xl bg-white"
                            >
                              <option>Mr</option>
                              <option>Mrs</option>
                              <option>Ms</option>
                              <option>Dr</option>
                            </select>
                          </div>

                          <div className="col-span-9 sm:col-span-4">
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                              First Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={dir.firstName}
                              onChange={(e) => updateDirector(index, "firstName", e.target.value)}
                              placeholder="Marcus"
                              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white"
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                              Middle Name
                            </label>
                            <input
                              type="text"
                              value={dir.middleName}
                              onChange={(e) => updateDirector(index, "middleName", e.target.value)}
                              placeholder="Optional"
                              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white"
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                              Last Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={dir.lastName}
                              onChange={(e) => updateDirector(index, "lastName", e.target.value)}
                              placeholder="Vance"
                              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white"
                            />
                          </div>
                        </div>

                        {/* Contact details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              required
                              value={dir.email}
                              onChange={(e) => updateDirector(index, "email", e.target.value)}
                              placeholder="marcus@business.com.au"
                              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                              Mobile Phone *
                            </label>
                            <input
                              type="tel"
                              required
                              value={dir.phone}
                              onChange={(e) => updateDirector(index, "phone", e.target.value)}
                              placeholder="0400 000 000"
                              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* + Add Another Director Button (Section 3.2) */}
                    <button
                      type="button"
                      onClick={addAnotherDirector}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-dashed border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-sky-600" />
                      <span>+ Add Another Director</span>
                    </button>
                  </div>
                )}

                {/* Step 3 Fields */}
                {currentStep === 3 && (
                  <div className="space-y-4 pt-2">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5 text-xs">
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-500">Business Trading Name</span>
                        <strong className="text-slate-900">{tradingName}</strong>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-500">ABN</span>
                        <strong className="text-slate-900">{abn || "Not provided"}</strong>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-500">Facility Amount</span>
                        <strong className="text-slate-900">{amount}</strong>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-500">Primary Contact</span>
                        <strong className="text-slate-900">
                          {primaryDirector.salutation} {primaryDirector.firstName} {primaryDirector.lastName} ({primaryDirector.email})
                        </strong>
                      </div>
                      {directors.length > 1 && (
                        <div className="flex justify-between py-1 border-b border-slate-200">
                          <span className="text-slate-500">Additional Directors</span>
                          <span className="text-slate-700 font-semibold">{directors.length - 1} additional director(s) included</span>
                        </div>
                      )}
                      <div className="flex justify-between py-1">
                        <span className="text-slate-500">Attribution Tag</span>
                        <strong className="font-mono text-sky-700">{referralCode} (Attribution Secured)</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit / Continue Button */}
                <div className="pt-4 flex items-center justify-between gap-3">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={() => setCurrentStep((prev) => (prev === 3 ? 2 : 1))}
                      className="px-4 py-3 rounded-full text-slate-600 font-bold text-xs hover:bg-slate-100 transition-colors"
                    >
                      Back
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#0a1926] hover:bg-[#14293d] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                  >
                    <span>{isSubmitting ? "Submitting..." : currentStep === 3 ? "Submit application" : "Continue securely"}</span>
                    <ArrowRight className="w-4 h-4 text-sky-400" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Talk to someone modal */}
      <TalkToSomeoneModal
        isOpen={talkModalOpen}
        onClose={() => setTalkModalOpen(false)}
        referralCode={referralCode}
        sourceContext={talkContext}
      />
    </div>
  );
};
