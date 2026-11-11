"use client";

import React, { useState } from "react";
import {
  X,
  Calendar,
  User,
  Clock,
  ShieldCheck,
  FileText,
  MessageSquare,
  Send,
  AlertTriangle,
  Lock,

  Edit3,
  Check,
  Building,
  Bell
} from "lucide-react";
import { Deal, DiaryNote } from "@/lib/api";

interface DealDetailModalProps {
  deal: Deal | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus?: (dealId: string, newStatus: Deal['status'], lostReason?: string) => Promise<void> | void;
  onUpdateDeal?: (dealId: string, updates: { name?: string; applicant?: string; amount?: string; type?: string; lender?: string; financedAmount?: number }) => Promise<void> | void;
  onAddNote?: (dealId: string, note: { content: string; nextSteps?: string; isInternal?: boolean; author?: string }) => Promise<void> | void;
  onUpdateNote?: (dealId: string, noteId: string, note: { author?: string; content: string; nextSteps?: string; isInternal?: boolean }) => Promise<void>;
  onAddReminder?: (dealId: string, reminder: { author: string; comment: string; dueDate: string; dueTime?: string; dueAt?: string }) => Promise<void> | void;
  onToggleReminder?: (dealId: string, reminderId: string, completed: boolean) => Promise<void> | void;
  canEdit?: boolean;
  canManage?: boolean;
}

export const DealDetailModal: React.FC<DealDetailModalProps> = ({
  deal,
  isOpen,
  onClose,
  onUpdateStatus,
  onUpdateDeal,
  onAddNote,
  onUpdateNote,
  onAddReminder,
  onToggleReminder,
  canEdit = true,
  canManage = false,
}) => {
  const [activeTab, setActiveTab] = useState<"details" | "notes" | "reminders">("details");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteError, setNoteError] = useState("");
  const [editFinancedAmount, setEditFinancedAmount] = useState("");
  const [noteAuthor, setNoteAuthor] = useState("Craig");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [newNextSteps, setNewNextSteps] = useState("");
  const [isInternal, setIsInternal] = useState(true);
  const [savingNote, setSavingNote] = useState(false);

  // Edit Lead State (Issue #5 & Change #5: Lender)
  const [isEditingLead, setIsEditingLead] = useState(false);
  const [editName, setEditName] = useState("");
  const [editApplicant, setEditApplicant] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editType, setEditType] = useState("");
  const [editLender, setEditLender] = useState("");
  const [customLender, setCustomLender] = useState("");
  const [savingLead, setSavingLead] = useState(false);
  const [leadEditError, setLeadEditError] = useState("");

  // Follow-up Reminder State (Change #7)
  const [reminderAuthor, setReminderAuthor] = useState("Craig");
  const [reminderDueDate, setReminderDueDate] = useState("");
  const [reminderDueTime, setReminderDueTime] = useState("");
  const [reminderComment, setReminderComment] = useState("");
  const [savingReminder, setSavingReminder] = useState(false);
  const [reminderError, setReminderError] = useState("");

  // Lost modal state
  const [showLostPrompt, setShowLostPrompt] = useState(false);
  const [lostReasonInput, setLostReasonInput] = useState("");

  const toggleLeadEditor = () => {
    if (deal) {
      setEditName(deal.name || "");
      setEditFinancedAmount(deal.financedAmount?.toString() || "");
      setEditApplicant(deal.applicant || "");
      setEditAmount(deal.amount || "");
      setEditType(deal.type || "Asset & Equipment");
      const currentLender = deal.lender || "";
      if (['Shift', 'Lumi', 'Dynamoney', 'Moneytech', 'Banjo', 'Prospa', 'Bizcap', 'Capify'].includes(currentLender)) {
        setEditLender(currentLender);
        setCustomLender("");
      } else if (currentLender) {
        setEditLender("Other");
        setCustomLender(currentLender);
      } else {
        setEditLender("");
        setCustomLender("");
      }
      setIsEditingLead(!isEditingLead);
      setLeadEditError("");
    }
  };

  if (!isOpen || !deal) return null;

  const getStatusBadge = (status: Deal['status']) => {
    switch (status) {
      case 'In assessment':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Approved':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Docs / settlement':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'Settled':
        return 'bg-teal-50 text-teal-800 border-teal-200';
      case 'Closed Lost':
      case 'Declined':
      case 'Declined / withdrawn':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'Lead received':
      case 'Customer invited':
      case 'Application submitted':
      case 'Waiting on customer':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const steps = [
    { label: "Lead / App", active: true },
    { label: "In assessment", active: ['In assessment', 'Approved', 'Docs / settlement', 'Settled'].includes(deal.status) },
    { label: "Approved", active: ['Approved', 'Docs / settlement', 'Settled'].includes(deal.status) },
    { label: "Docs / settlement", active: ['Docs / settlement', 'Settled'].includes(deal.status) },
    { label: "Settled", active: deal.status === 'Settled' },
  ];

  
  const handleAddReminderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onAddReminder || !deal || !reminderDueDate || !reminderDueTime || !reminderComment.trim()) return;
    setSavingReminder(true);
    setReminderError("");
    try {
      await onAddReminder(deal.id, {
        author: reminderAuthor,
        dueDate: reminderDueDate,
        dueTime: reminderDueTime,
        dueAt: new Date(`${reminderDueDate}T${reminderDueTime}`).toISOString(),
        comment: reminderComment.trim(),
      });
      setReminderComment("");
      setReminderDueDate("");
      setReminderDueTime("");
    } catch (err) {
      setReminderError(err instanceof Error ? err.message : "Failed to schedule follow-up reminder");
    } finally {
      setSavingReminder(false);
    }
  };

  const handleAddNoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim() || !onAddNote) return;
    setSavingNote(true);
    try {
      const note = {
        author: noteAuthor,
        content: newNoteContent,
        nextSteps: newNextSteps || undefined,
        isInternal,
      };
      if (editingNoteId && onUpdateNote) await onUpdateNote(deal.id, editingNoteId, note);
      else await onAddNote(deal.id, note);
      setEditingNoteId(null);
      setNoteError("");
      setNewNoteContent("");
      setNewNextSteps("");
    } catch (error) {
      setNoteError(error instanceof Error ? error.message : "Could not save note.");
    } finally {
      setSavingNote(false);
    }
  };

  const handleSaveLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onUpdateDeal) return;
    setSavingLead(true);
    setLeadEditError("");
    try {
      await onUpdateDeal(deal.id, {
        name: editName.trim(),
        applicant: editApplicant.trim(),
        amount: editAmount.trim(),
        type: editType.trim(),
        ...(canManage ? {
          lender: editLender === "Other" ? (customLender.trim() || "Other") : editLender,
          financedAmount: editFinancedAmount === "" ? undefined : Number(editFinancedAmount),
        } : {}),
      });
      setIsEditingLead(false);
    } catch (err) {
      setLeadEditError(err instanceof Error ? err.message : "Failed to update lead details.");
    } finally {
      setSavingLead(false);
    }
  };

  const handleStatusChange = (status: Deal['status']) => {
    if (status === 'Closed Lost' || status === 'Declined') {
      setShowLostPrompt(true);
    } else if (onUpdateStatus) {
      void onUpdateStatus(deal.id, status);
    }
  };

  const confirmLost = () => {
    if (onUpdateStatus) {
      void onUpdateStatus(deal.id, 'Closed Lost', lostReasonInput || 'Declined / Closed Lost');
    }
    setShowLostPrompt(false);
    setLostReasonInput("");
  };

  const notes: DiaryNote[] = deal.diaryNotes || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden transition-all flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="font-mono text-xs font-bold text-slate-500 bg-white px-2.5 py-0.5 rounded-md border border-slate-200">
                {deal.id}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(deal.status)}`}>
                {deal.status}
              </span>
            </div>
            <h2 className="text-xl font-bold text-[#0a1926]">{deal.name}</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Introduced under partner code <span className="font-mono font-bold text-[#0a1926]">{deal.code}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            {canEdit && onUpdateDeal && (
              <button
                onClick={toggleLeadEditor}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${isEditingLead
                    ? 'bg-slate-200 text-slate-800 border-slate-300'
                    : 'bg-white hover:bg-slate-100 text-[#0a1926] border-slate-200 shadow-2xs'
                  }`}
                title="Edit lead details or amounts"
              >
                <Edit3 className="w-3.5 h-3.5 text-sky-600" />
                <span>{isEditingLead ? "Cancel Edit" : "Edit Lead"}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-4 px-6 border-b border-slate-100 bg-white">
          <button
            onClick={() => setActiveTab("details")}
            className={`py-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${activeTab === "details"
                ? "border-[#0a1926] text-[#0a1926]"
                : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
          >
            Deal Details
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`py-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === "notes"
                ? "border-[#0a1926] text-[#0a1926]"
                : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Diary Notes ({notes.length})</span>
          </button>
          {canManage && <button
            onClick={() => setActiveTab("reminders")}
            className={`py-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === "reminders"
                ? "border-[#0a1926] text-[#0a1926]"
                : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Follow-ups ({deal.followUpReminders?.length || 0})</span>
          </button>}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {activeTab === "details" ? (
            <>
              {/* EDIT LEAD FORM (Issue #5: Allow partner to edit existing lead) */}
              {isEditingLead ? (
                <form onSubmit={handleSaveLead} className="p-5 bg-sky-50/50 border border-sky-200 rounded-2xl space-y-4 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between border-b border-sky-100 pb-2">
                    <div className="flex items-center gap-2">
                      <Edit3 className="w-4 h-4 text-sky-700" />
                      <h4 className="text-xs font-bold text-sky-950 uppercase tracking-wider">Edit Lead Details & Facility</h4>
                    </div>
                    <span className="text-[11px] text-sky-600">Changes will be logged in audit trail</span>
                  </div>

                  {leadEditError && (
                    <p className="text-xs text-rose-700 bg-rose-50 p-2 rounded-lg border border-rose-200">{leadEditError}</p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Business Name *</label>
                      <input
                        type="text"
                        required
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500/20"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Primary Contact / Director *</label>
                      <input
                        type="text"
                        required
                        value={editApplicant}
                        onChange={(e) => setEditApplicant(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Requested Facility Amount ($) *</label>
                      <input
                        type="text"
                        required
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                        placeholder="e.g. $250,000"
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Facility Type</label>
                      <select
                        value={editType}
                        onChange={(e) => setEditType(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 font-medium"
                      >
                        <option value="Asset & Equipment">Asset & Equipment</option>
                        <option value="Working Capital">Working Capital</option>
                        <option value="Commercial Term Facility">Commercial Term Facility</option>
                        <option value="Invoice Finance">Invoice Finance</option>
                        <option value="Refinance & Expansion">Refinance & Expansion</option>
                        <option value="Machinery Line">Machinery Line</option>
                      </select>
                    </div>
                  </div>

                  {canManage && <label className="block text-xs font-bold text-slate-600">
                    Amount Financed ($)
                    <input type="number" min="0" step="0.01" value={editFinancedAmount} onChange={(event) => setEditFinancedAmount(event.target.value)} className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2" />
                    <span className="text-xs font-normal">Enter the actual funded value. Older records use the facility amount until updated.</span>
                  </label>}
                  {/* Lender selection (Change #5) */}
                  {canManage && <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Lender / Funder</label>
                      <select
                        value={editLender}
                        onChange={(e) => setEditLender(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 font-medium"
                      >
                        <option value="">-- Select Lender --</option>
                        <option value="Shift">Shift</option>
                        <option value="Lumi">Lumi</option>
                        <option value="Dynamoney">Dynamoney</option>
                        <option value="Moneytech">Moneytech</option>
                        <option value="Banjo">Banjo</option>
                        <option value="Prospa">Prospa</option>
                        <option value="Bizcap">Bizcap</option>
                        <option value="Capify">Capify</option>
                        <option value="Other">Other (Specify funder)</option>
                      </select>
                    </div>
                    {editLender === "Other" && (
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Specify Lender Name *</label>
                        <input
                          type="text"
                          required
                          value={customLender}
                          onChange={(e) => setCustomLender(e.target.value)}
                          placeholder="e.g. Liberty Financial"
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 font-medium"
                        />
                      </div>
                    )}
                  </div>}

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-sky-100">
                    <button
                      type="button"
                      onClick={() => setIsEditingLead(false)}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={savingLead}
                      className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#0a1926] hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{savingLead ? "Saving..." : "Save Changes"}</span>
                    </button>
                  </div>
                </form>
              ) : null}

              {/* Timeline tracker */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Facility Progress</div>
                <div className="flex items-center justify-between relative">
                  <div className="absolute left-2 right-2 top-3 h-0.5 bg-slate-200 -z-0"></div>
                  {steps.map((st, i) => (
                    <div key={i} className="flex flex-col items-center relative z-10 text-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${st.active
                          ? 'bg-[#0a1926] text-white ring-4 ring-slate-100'
                          : 'bg-white border-2 border-slate-300 text-slate-400'
                        }`}>
                        {st.active ? "✓" : i + 1}
                      </div>
                      <span className={`text-[10px] font-medium mt-1.5 max-w-[70px] leading-tight ${st.active ? 'text-slate-900 font-semibold' : 'text-slate-400'}`}>
                        {st.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amount & Commission cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Facility Amount</span>
                  <span className="text-xl font-bold text-slate-900">{deal.amount}</span>
                  {deal.financedAmount !== undefined && <p className="mt-1 text-xs text-slate-600">Financed: {deal.financedAmount.toLocaleString("en-AU", { style: "currency", currency: "AUD" })}</p>}
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{deal.type}</span>
                  </div>
                </div>

                {canManage && <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Partner Commission</span>
                  <span className="text-xl font-bold text-emerald-600">{deal.commission}</span>
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Status: <strong className="text-slate-800">{deal.commissionStatus}</strong></span>
                  </div>
                </div>}
              </div>

              {/* Lost Reason Display (Section 4.2) */}
              {deal.lostReason && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-rose-900">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Closed Lost Reason:</span>
                  </div>
                  <p>{deal.lostReason}</p>
                </div>
              )}

              {/* Applicant & Meta */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between py-2 border-b border-slate-100 text-xs">
                  <span className="text-slate-500 flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-400" />
                    Applicant / Director
                  </span>
                  <span className="font-semibold text-slate-800">{deal.applicant}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100 text-xs">
                  <span className="text-slate-500 flex items-center gap-2">
                    <Building className="w-4 h-4 text-slate-400" />
                    Lender / Funder
                  </span>
                  <span className="font-semibold text-slate-800">
                    {deal.lender ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-50 text-sky-800 border border-sky-200">
                        {deal.lender}
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">Not assigned</span>
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100 text-xs">
                  <span className="text-slate-500 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    Submitted Date
                  </span>
                  <span className="font-semibold text-slate-800">{deal.submittedDate}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100 text-xs">
                  <span className="text-slate-500 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    Last Activity
                  </span>
                  <span className="font-semibold text-slate-800">{deal.lastActivity}</span>
                </div>
              </div>

              {/* Stage Transition Control */}
              {canManage && onUpdateStatus && (
                <div className="pt-3 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-700 mb-2">Update Stage:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'Lead received',
                      'Customer invited',
                      'Application submitted',
                      'Waiting on customer',
                      'In assessment',
                      'Approved',
                      'Docs / settlement',
                      'Settled',
                      'Closed Lost',
                    ].map((st) => (
                      <button
                        key={st}
                        onClick={() => handleStatusChange(st as Deal['status'])}
                        className={`px-3 py-1.5 text-xs rounded-xl border font-semibold transition-colors cursor-pointer ${deal.status === st
                            ? 'bg-[#0a1926] text-white border-[#0a1926]'
                            : st === 'Closed Lost'
                              ? 'bg-white hover:bg-rose-50 text-rose-700 border-rose-200'
                              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : activeTab === "notes" ? (
            /* Diary Notes Section */
            <div className="space-y-5">
              {/* Add Note Form */}
              {canManage && <form onSubmit={handleAddNoteSubmit} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-sky-600" />
                  <span>{editingNoteId ? "Update Diary Note" : "Add Timestamped Diary Note"}</span>
                </div>

                <div className="w-full sm:w-1/2">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    User Name *
                  </label>
                  <select
                    value={noteAuthor}
                    onChange={(e) => setNoteAuthor(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/10 font-bold text-slate-900"
                  >
                    <option value="Craig">Craig</option>
                    <option value="Martin">Martin</option>
                    <option value="George">George</option>
                    <option value="Anderson">Anderson</option>
                    <option value="Elin">Elin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Steps Taken / Current Update *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    placeholder="e.g. Spoke with applicant regarding trust deed and 2026 BAS."
                    className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/10"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Next Steps Required (Optional)
                  </label>
                  <input
                    type="text"
                    value={newNextSteps}
                    onChange={(e) => setNewNextSteps(e.target.value)}
                    placeholder="e.g. Awaiting accountant confirmation by Thursday 3pm."
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0a1926]/10"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isInternal}
                      onChange={(e) => setIsInternal(e.target.checked)}
                      className="rounded border-slate-300 text-[#0a1926]"
                    />
                    <span className="flex items-center gap-1">
                      <Lock className="w-3 h-3 text-slate-400" />
                      Internal note (Kredo staff only)
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={savingNote || !newNoteContent.trim()}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0a1926] hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3 h-3 text-sky-400" />
                    <span>{savingNote ? "Saving..." : editingNoteId ? "Update Note" : "Add Note"}</span>
                  </button>
                </div>
              </form>}
              {editingNoteId && <button type="button" className="text-xs underline" onClick={() => { setEditingNoteId(null); setNewNoteContent(""); setNewNextSteps(""); setNoteError(""); }}>Cancel note edit</button>}
              {noteError && <p role="alert" className="text-xs text-rose-700">{noteError}</p>}

              {/* Notes Timeline List */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Audit Trail & History ({notes.length})
                </div>

                {notes.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl border border-slate-200/60">
                    No diary notes recorded yet. Add the first operational note above.
                  </div>
                ) : (
                  notes.map((note) => (
                    <div
                      key={note.id}
                      className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs space-y-2"
                    >
                      <div className="flex items-center justify-between text-[11px] border-b border-slate-100 pb-1.5">
                        <span className="font-bold text-[#0a1926]">{note.author}</span>
                        <div className="flex items-center gap-2">
                          {note.isInternal && (
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-slate-600 flex items-center gap-1">
                              <Lock className="w-2.5 h-2.5" />
                              Internal
                            </span>
                          )}
                          <span className="text-slate-400">{note.createdAt}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-800 leading-relaxed">{note.content}</p>
                      {canManage && onUpdateNote && <button type="button" className="text-xs text-sky-800 underline" onClick={() => {
                        setEditingNoteId(note.id); setNoteAuthor(["Craig", "Martin", "George", "Anderson", "Elin"].includes(note.author) ? note.author : "Craig"); setNewNoteContent(note.content); setNewNextSteps(note.nextSteps || ""); setIsInternal(note.isInternal);
                      }}>Edit note</button>}
                      {note.nextSteps && (
                        <div className="p-2.5 bg-sky-50/70 border-l-2 border-sky-500 rounded-r-xl text-[11px] text-sky-900 font-medium">
                          <strong>Next step:</strong> {note.nextSteps}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            /* Follow-up Reminders Section (Change #7) */
            <div className="space-y-5">
              {/* Add Follow-up Form */}
              <form onSubmit={handleAddReminderSubmit} className="p-4 bg-sky-50/50 rounded-2xl border border-sky-200 space-y-3">
                <div className="text-xs font-bold text-sky-950 uppercase tracking-wider flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-sky-700" />
                  <span>Schedule Follow-up Reminder</span>
                </div>

                {reminderError && (
                  <p className="text-xs text-rose-700 bg-rose-50 p-2 rounded-lg border border-rose-200">{reminderError}</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Assigned To *
                    </label>
                    <select
                      value={reminderAuthor}
                      onChange={(e) => setReminderAuthor(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl bg-white focus:outline-hidden font-bold"
                    >
                      <option value="Craig">Craig</option>
                      <option value="Martin">Martin</option>
                      <option value="George">George</option>
                      <option value="Anderson">Anderson</option>
                      <option value="Elin">Elin</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Follow-up Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={reminderDueDate}
                      onChange={(e) => setReminderDueDate(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl bg-white focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Follow-up Time (local) *
                    </label>
                    <input
                      type="time"
                      required
                      value={reminderDueTime}
                      onChange={(e) => setReminderDueTime(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl bg-white focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Action Required / Comment *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={reminderComment}
                    onChange={(e) => setReminderComment(e.target.value)}
                    placeholder="e.g. Bank statement follow up. Call John and remind him to upload 2026 BAS."
                    className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    disabled={savingReminder || !reminderComment.trim() || !reminderDueDate || !reminderDueTime}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0a1926] hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Bell className="w-3 h-3 text-sky-400" />
                    <span>{savingReminder ? "Saving..." : "Schedule Reminder"}</span>
                  </button>
                </div>
              </form>

              {/* Reminders List */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Active & Scheduled Follow-ups ({deal.followUpReminders?.length || 0})
                </div>

                {(!deal.followUpReminders || deal.followUpReminders.length === 0) ? (
                  <div className="p-8 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl border border-slate-200/60">
                    No follow-up reminders scheduled for this lead. Use the form above to schedule return actions.
                  </div>
                ) : (
                  deal.followUpReminders.map((rem) => (
                    <div
                      key={rem.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        rem.completed
                          ? 'bg-slate-50/80 border-slate-200 opacity-70'
                          : 'bg-white border-sky-200 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] border-b border-slate-100 pb-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#0a1926]">{rem.author}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-200 flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" />
                            Due: {rem.dueDate} {rem.dueTime ? `at ${rem.dueTime}` : ''}
                          </span>
                        </div>
                        {onToggleReminder && (
                          <button
                            type="button"
                            onClick={() => onToggleReminder(deal.id, rem.id, !rem.completed)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
                              rem.completed
                                ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                                : 'bg-emerald-600 text-white hover:bg-emerald-700'
                            }`}
                          >
                            {rem.completed ? "Mark Incomplete" : "✓ Mark Done"}
                          </button>
                        )}
                      </div>
                      <p className={`text-xs leading-relaxed ${rem.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                        {rem.comment}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Kredo Australia Referral Platform · 1300 4 KREDO
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>

      {/* Lost Reason Modal prompt */}
      {showLostPrompt && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-rose-200">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <span>Mark Deal as Closed Lost</span>
            </div>
            <p className="text-xs text-slate-600">
              Provide a reason note so the partner and operations team get closure (Section 4.2):
            </p>
            <textarea
              rows={3}
              required
              value={lostReasonInput}
              onChange={(e) => setLostReasonInput(e.target.value)}
              placeholder="e.g. Client withdrew; opted for captive OEM dealer finance rate."
              className="w-full p-2.5 text-xs border border-slate-200 rounded-xl"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowLostPrompt(false)}
                className="flex-1 py-2 text-xs rounded-xl border border-slate-200 text-slate-600 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmLost}
                className="flex-1 py-2 text-xs rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold cursor-pointer"
              >
                Confirm Lost
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
