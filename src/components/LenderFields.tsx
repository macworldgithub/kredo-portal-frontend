"use client";

export const LENDER_OPTIONS = [
  "Shift", "Lumi", "Dynamoney", "Moneytech", "Banjo", "Prospa", "Bizcap", "Capify",
];

interface LenderFieldsProps {
  idPrefix: string;
  lender: string;
  customLender: string;
  onLenderChange: (value: string) => void;
  onCustomLenderChange: (value: string) => void;
}

export function LenderFields({ idPrefix, lender, customLender, onLenderChange, onCustomLenderChange }: LenderFieldsProps) {
  const fieldClassName = "w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 font-medium";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
      <div>
        <label htmlFor={`${idPrefix}-lender`} className="block text-xs font-semibold text-slate-700 mb-1">Lender / Funder</label>
        <select id={`${idPrefix}-lender`} value={lender} onChange={(event) => onLenderChange(event.target.value)} className={fieldClassName}>
          <option value="">Not assigned</option>
          {LENDER_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
          <option value="Other">Other (Specify funder)</option>
        </select>
      </div>
      {lender === "Other" && (
        <div>
          <label htmlFor={`${idPrefix}-custom-lender`} className="block text-xs font-semibold text-slate-700 mb-1">Specify Lender Name *</label>
          <input id={`${idPrefix}-custom-lender`} type="text" required value={customLender} onChange={(event) => onCustomLenderChange(event.target.value)} placeholder="e.g. Liberty Financial" className={fieldClassName} />
        </div>
      )}
    </div>
  );
}
