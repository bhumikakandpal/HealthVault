import { useEffect } from 'react';
import {
  X,
  Printer,
  HeartPulse,
  AlertCircle,
  Droplet,
  Calendar,
  User,
  Building2,
  FileText,
  Tag,
  Download,
} from 'lucide-react';
import type { HealthRecord } from '../types';
import { CATEGORY_META } from '../types';
import { downloadSummary, downloadSummaryAsText, printSummary } from '../downloadUtils';

interface SummaryPreviewModalProps {
  open: boolean;
  onClose: () => void;
  selectedRecords: HealthRecord[];
  allergyRecords: HealthRecord[];
  staticAllergies: string[];
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

export function SummaryPreviewModal({
  open,
  onClose,
  selectedRecords,
  allergyRecords,
  staticAllergies,
  patientName,
  patientAge,
  patientBloodGroup,
}: SummaryPreviewModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  const handlePrint = () => {
    printSummary(selectedRecords, allergyRecords, staticAllergies, patientName, patientAge, patientBloodGroup);
  };

  const handleDownloadHtml = () => {
    downloadSummary(selectedRecords, allergyRecords, staticAllergies, patientName, patientAge, patientBloodGroup);
  };

  const handleDownloadText = () => {
    downloadSummaryAsText(selectedRecords, allergyRecords, staticAllergies, patientName, patientAge, patientBloodGroup);
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-2 sm:p-4">
      <div className="absolute inset-0 bg-navy-900/50 backdrop-blur-sm no-print" onClick={onClose} />

      <div className="relative w-full max-w-3xl animate-scale-in overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="no-print absolute right-3 top-3 z-10 rounded-lg p-2 text-navy-400 hover:bg-navy-50"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Printable content */}
        <div id="print-area" className="max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-navy-900 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500">
                  <HeartPulse className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="font-display text-2xl font-extrabold">Appointment Summary</h1>
                  <p className="text-sm text-navy-300">HealthVault — Personal Health Record</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-navy-200">Patient: {patientName}</p>
                <p className="text-xs text-navy-400">Age {patientAge} · Blood Group: {patientBloodGroup}</p>
                <p className="mt-1 text-xs text-navy-400">
                  Generated: {new Date().toLocaleDateString('en-US', { dateStyle: 'long' })}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 p-6 sm:p-8">
            {/* Patient Basic Info */}
            <section>
              <h2 className="mb-3 font-display text-lg font-bold text-navy-900">Patient Information</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="flex items-center gap-2.5 rounded-xl bg-navy-50 p-3">
                  <User className="h-5 w-5 text-teal-500" />
                  <div>
                    <p className="text-xs text-navy-400">Name</p>
                    <p className="text-sm font-semibold text-navy-900">{patientName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl bg-navy-50 p-3">
                  <Droplet className="h-5 w-5 text-teal-500" />
                  <div>
                    <p className="text-xs text-navy-400">Blood Group</p>
                    <p className="text-sm font-semibold text-navy-900">{patientBloodGroup}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl bg-navy-50 p-3">
                  <Calendar className="h-5 w-5 text-teal-500" />
                  <div>
                    <p className="text-xs text-navy-400">Age</p>
                    <p className="text-sm font-semibold text-navy-900">{patientAge} years</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Allergies Section */}
            <section>
              <div className="mb-3 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <h2 className="font-display text-lg font-bold text-navy-900">Current Allergies</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {staticAllergies.map((a) => (
                  <span
                    key={a}
                    className="badge border border-amber-200 bg-amber-50 text-amber-800"
                  >
                    <AlertCircle className="h-3.5 w-3.5" />
                    {a}
                  </span>
                ))}
              </div>
              {allergyRecords.length > 0 && (
                <div className="mt-3 space-y-2">
                  {allergyRecords.map((rec) => (
                    <div
                      key={rec.id}
                      className="rounded-xl border border-amber-200 bg-amber-50 p-4"
                    >
                      <p className="text-sm font-semibold text-amber-900">{rec.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-amber-800">{rec.notes}</p>
                      {rec.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {rec.tags.map((t) => (
                            <span key={t} className="badge bg-amber-100 text-amber-700">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Medical History */}
            <section>
              <div className="mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-teal-500" />
                <h2 className="font-display text-lg font-bold text-navy-900">Medical History</h2>
              </div>
              <div className="space-y-3">
                {selectedRecords.map((rec, idx) => {
                  const meta = CATEGORY_META[rec.category];
                  return (
                    <div key={rec.id} className="rounded-xl border border-navy-100 p-4">
                      <div className="mb-2 flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy-100 text-xs font-bold text-navy-700">
                            {idx + 1}
                          </span>
                          <h3 className="text-sm font-bold text-navy-900">{rec.title}</h3>
                        </div>
                        <span className={`badge ${meta.color}`}>{rec.category}</span>
                      </div>
                      <div className="mb-3 grid grid-cols-1 gap-2 text-xs text-navy-500 sm:grid-cols-2">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-teal-500" /> {formatDate(rec.date)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-teal-500" /> {rec.doctor}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Building2 className="h-3.5 w-3.5 text-teal-500" /> {rec.clinic}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FileText className="h-3.5 w-3.5 text-teal-500" /> {rec.fileName}
                        </span>
                      </div>
                      <div className="rounded-lg bg-navy-50 p-3">
                        <p className="text-sm leading-relaxed text-navy-700">{rec.notes}</p>
                      </div>
                      {rec.tags.length > 0 && (
                        <div className="mt-2 flex items-center gap-1.5">
                          <Tag className="h-3.5 w-3.5 text-navy-400" />
                          {rec.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-md bg-navy-50 px-2 py-0.5 text-[11px] font-medium text-navy-400"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="border-t border-navy-100 bg-navy-50 px-6 py-4 sm:px-8">
            <p className="text-xs text-navy-400">
              This summary was generated by HealthVault. It is a personal organizer and does not
              provide medical diagnoses or replace clinical advice. Please consult your healthcare
              provider for medical guidance.
            </p>
          </div>
        </div>

        {/* Action bar */}
        <div className="no-print flex items-center justify-between border-t border-navy-100 bg-white px-6 py-4">
          <p className="text-sm text-navy-400">
            {selectedRecords.length} record{selectedRecords.length === 1 ? '' : 's'} included
          </p>
          <div className="flex flex-wrap gap-2">
            <button onClick={onClose} className="btn-secondary">
              Close
            </button>
            <button onClick={handleDownloadText} className="btn-secondary">
              <FileText className="h-4 w-4" />
              Download as Text
            </button>
            <button onClick={handleDownloadHtml} className="btn-teal">
              <Download className="h-4 w-4" />
              Download as HTML
            </button>
            <button onClick={handlePrint} className="btn-primary">
              <Printer className="h-4 w-4" />
              Print / PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
