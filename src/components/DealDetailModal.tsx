"use client";

import React, { useState } from "react";
import { 
  X, 
  Calendar, 
  User, 
  DollarSign, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  MessageSquare, 
  Send,
  AlertTriangle,
  Lock,
  ChevronDown
} from "lucide-react";
import { Deal, DiaryNote } from "@/lib/api";

interface DealDetailModalProps {
  deal: Deal | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus?: (dealId: string, newStatus: Deal['status'], lostReason?: string) => Promise<void> | void;
  onAddNote?: (dealId: string, note: { content: string; nextSteps?: string; isInternal?: boolean }) => Promise<void> | void;
  canEdit?: boolean;
}

export const DealDetailModal: React.FC<DealDetailModalProps> = ({
  deal,
  isOpen,
  onClose,
  onUpdateStatus,
  onAddNote,
  canEdit = true,
}) => {
  const [activeTab, setActiveTab] = useState<"details" | "notes">("details");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [newNextSteps, setNewNextSteps] = useState("");
  const [isInternal, setIsInternal] = useState(true);
  const [savingNote, setSavingNote] = useState(false);

  // Lost modal state
  const [showLostPrompt, setShowLostPrompt] = useState(false);
  const [lostReasonInput, setLostReasonInput] = useState("");

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

  const handleAddNoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim() || !onAddNote) return;
    setSavingNote(true);
    try {
      await onAddNote(deal.id, {
        content: newNoteContent,
        nextSteps: newNextSteps || undefined,
        isInternal,
      });
      setNewNoteContent("");
      setNewNextSteps("");
    } finally {
      setSavingNote(false);
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
            <div className="flex items-center gap-2 mb-1.5">
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
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Overview vs Diary Notes (Section 4.5) */}
        <div className="flex items-center gap-4 px-6 border-b border-slate-100 bg-white">
          <button
            onClick={() => setActiveTab("details")}
            className={`py-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === "details"
                ? "border-[#0a1926] text-[#0a1926]"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            Deal Details
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`py-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "notes"
                ? "border-[#0a1926] text-[#0a1926]"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Diary Notes ({notes.length})</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {activeTab === "details" ? (
            <>
              {/* Timeline tracker */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Facility Progress</div>
                <div className="flex items-center justify-between relative">
                  <div className="absolute left-2 right-2 top-3 h-0.5 bg-slate-200 -z-0"></div>
                  {steps.map((st, i) => (
                    <div key={i} className="flex flex-col items-center relative z-10 text-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                        st.active 
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
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{deal.type}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Partner Commission</span>
                  <span className="text-xl font-bold text-emerald-600">{deal.commission}</span>
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Status: <strong className="text-slate-800">{deal.commissionStatus}</strong></span>
                  </div>
                </div>
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

              {/* Stage Transition Control (Section 4.1 & 4.2) */}
              {canEdit && onUpdateStatus && (
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
                        className={`px-3 py-1.5 text-xs rounded-xl border font-semibold transition-colors cursor-pointer ${
                          deal.status === st 
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
          ) : (
            /* Diary Notes Section (Section 4.5: Diary notes on deal detail) */
            <div className="space-y-5">
              {/* Add Note Form */}
              <form onSubmit={handleAddNoteSubmit} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-sky-600" />
                  <span>Add Timestamped Diary Note</span>
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
                    <span>{savingNote ? "Saving..." : "Add Note"}</span>
                  </button>
                </div>
              </form>

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
                className="flex-1 py-2 text-xs rounded-xl border border-slate-200 text-slate-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmLost}
                className="flex-1 py-2 text-xs rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold"
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
