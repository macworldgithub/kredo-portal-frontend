"use client";

import React, { useState } from "react";
import { DollarSign, CheckCircle2, Clock, Check, Download, AlertCircle } from "lucide-react";
import { ApiCommission } from "@/lib/api";

interface MasterCommissionsViewProps {
  commissions: ApiCommission[];
  onUpdateCommission?: (dealId: string, updates: { status?: "Confirmed" | "Paid" | "Processing"; commissionAmount?: string }) => Promise<void>;
}

export const MasterCommissionsView: React.FC<MasterCommissionsViewProps> = ({
  commissions,
  onUpdateCommission,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<"Confirmed" | "Paid" | "Processing">("Confirmed");
  const [newAmount, setNewAmount] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const getStatusBadge = (status: ApiCommission["status"]) => {
    switch (status) {
      case "Paid":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "Confirmed":
        return "bg-sky-50 text-sky-800 border-sky-200";
      default:
        return "bg-amber-50 text-amber-800 border-amber-200";
    }
  };

  const startEdit = (c: ApiCommission) => {
    setEditingId(c.id);
    setNewStatus(c.status);
    setNewAmount(c.commissionAmount);
  };

  const saveEdit = async (dealId: string) => {
    if (!onUpdateCommission) return;
    setIsUpdating(true);
    try {
      await onUpdateCommission(dealId, {
        status: newStatus,
        commissionAmount: newAmount,
      });
      setEditingId(null);
    } finally {
      setIsUpdating(false);
    }
  };

  const exportCsv = () => {
    const rows = [
      "DEAL ID,CLIENT / DEAL,SETTLED AMOUNT,RATE,COMMISSION,STATUS,PAID DATE",
      ...commissions.map((c) =>
        [c.id, c.dealName, c.settledAmount, c.rate, c.commissionAmount, c.status, c.paidDate || ""]
          .map((v) => `"${String(v).replaceAll('"', '""')}"`)
          .join(","),
      ),
    ];
    const url = URL.createObjectURL(new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "kredo-commissions-ledger.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <span className="w-4 h-0.5 bg-slate-300"></span>
            <span>COMMISSION LEDGER & AUDIT</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a1926] tracking-tight mt-1">
            Master Commissions
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Confirm, adjust, or mark commissions as paid across all partner accounts (Section 4.1).
          </p>
        </div>

        <button
          onClick={exportCsv}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs shadow-2xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-4 sm:px-6">Deal ID</th>
                <th className="py-3.5 px-4">Deal / Client</th>
                <th className="py-3.5 px-4">Settled Amount</th>
                <th className="py-3.5 px-4">Rate</th>
                <th className="py-3.5 px-4">Commission</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Paid Date</th>
                <th className="py-3.5 px-4 text-right">Master Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {commissions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No commission rows available.
                  </td>
                </tr>
              ) : (
                commissions.map((c) => {
                  const isEditing = editingId === c.id;
                  return (
                    <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-slate-900">{c.id}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{c.dealName}</div>
                        <div className="text-[11px] text-slate-500">{c.client}</div>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-800">{c.settledAmount}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-600">{c.rate}</td>
                      <td className="py-3.5 px-4">
                        {isEditing ? (
                          <input
                            type="text"
                            value={newAmount}
                            onChange={(e) => setNewAmount(e.target.value)}
                            className="px-2 py-1 text-xs border border-slate-300 rounded-lg w-24"
                          />
                        ) : (
                          <span className="font-bold text-emerald-700">{c.commissionAmount}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        {isEditing ? (
                          <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value as any)}
                            className="px-2 py-1 text-xs border border-slate-300 rounded-lg"
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Paid">Paid</option>
                            <option value="Processing">Processing</option>
                          </select>
                        ) : (
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getStatusBadge(c.status)}`}>
                            {c.status}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">{c.paidDate || "—"}</td>
                      <td className="py-3.5 px-4 text-right">
                        {isEditing ? (
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-2.5 py-1 text-[11px] rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => void saveEdit(c.dealId || c.id)}
                              disabled={isUpdating}
                              className="px-3 py-1 text-[11px] rounded-lg bg-[#0a1926] text-white font-bold"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => startEdit(c)}
                            className="text-[11px] font-bold text-sky-700 hover:underline"
                          >
                            Adjust / Mark Paid
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
