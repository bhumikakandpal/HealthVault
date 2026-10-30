import { useState, useMemo } from 'react';
import {
  CheckSquare,
  Square,
  FileText,
  Sparkles,
  Calendar,
  User,
  ChevronRight,
} from 'lucide-react';
import type { HealthRecord } from '../types';
import { CATEGORY_META } from '../types';
import { SummaryPreviewModal } from '../components/SummaryPreviewModal';

interface SummaryPageProps {
  records: HealthRecord[];
  allergies: string[];
  patientName: string;
  patientAge: string;
  patientBloodGroup: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function SummaryPage({ records, allergies, patientName, patientAge, patientBloodGroup }: SummaryPageProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [modalOpen, setModalOpen] = useState(false);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedRecords = useMemo(
    () =>
      records
        .filter((r) => selected.has(r.id))
        .sort((a, b) => a.date.localeCompare(b.date)),
    [records, selected],
  );

  const allergyRecords = selectedRecords.filter((r) => r.category === 'Allergy Details');

  const allSelected = selected.size === records.length;
  const toggleAll = () => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(records.map((r) => r.id)));
  };

  const handleGenerate = () => {
    if (selected.size === 0) return;
    setModalOpen(true);
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Selection Section */}
      <div className="card p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-bold text-navy-900">Select Records to Include</h2>
            <p className="mt-0.5 text-sm text-navy-400">
              Pick the records you want in your appointment summary. {selected.size} of {records.length} selected.
            </p>
          </div>
          <button
            onClick={toggleAll}
            className="shrink-0 rounded-xl border border-navy-200 bg-white px-4 py-2 text-sm font-semibold text-navy-700 transition-colors hover:bg-navy-50"
          >
            {allSelected ? 'Deselect All' : 'Select All'}
          </button>
        </div>

        <div className="space-y-2">
          {records.map((record) => {
            const meta = CATEGORY_META[record.category];
            const isSelected = selected.has(record.id);
            return (
              <button
                key={record.id}
                onClick={() => toggle(record.id)}
                className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                  isSelected
                    ? 'border-teal-300 bg-teal-50'
                    : 'border-navy-100 bg-white hover:border-navy-200 hover:bg-navy-50'
                }`}
              >
                {isSelected ? (
                  <CheckSquare className="h-5 w-5 shrink-0 text-teal-500" />
                ) : (
                  <Square className="h-5 w-5 shrink-0 text-navy-300" />
                )}
                <div className={`h-8 w-1 rounded-full ${meta.dot} shrink-0`} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-navy-900">{record.title}</p>
                  <p className="text-xs text-navy-400">
                    {record.category} · {formatDate(record.date)} · {record.doctor}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-navy-300" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating Generate Button */}
      <div className="sticky bottom-6 z-30 flex justify-center no-print">
        <button
          onClick={handleGenerate}
          disabled={selected.size === 0}
          className="group flex items-center gap-3 rounded-2xl bg-teal-500 px-7 py-4 text-base font-bold text-white shadow-card-hover transition-all hover:bg-teal-600 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
        >
          <Sparkles className="h-5 w-5 transition-transform group-hover:scale-110" />
          Generate Appointment Summary
          {selected.size > 0 && (
            <span className="ml-1 rounded-full bg-white/25 px-2.5 py-0.5 text-xs font-bold">
              {selected.size}
            </span>
          )}
        </button>
      </div>

      {/* Preview Modal */}
      <SummaryPreviewModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedRecords={selectedRecords}
        allergyRecords={allergyRecords}
        staticAllergies={allergies}
        patientName={patientName}
        patientAge={patientAge}
        patientBloodGroup={patientBloodGroup}
      />
    </div>
  );
}
