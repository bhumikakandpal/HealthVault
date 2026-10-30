import {
  X,
  Calendar,
  User,
  Building2,
  Tag,
  FileText,
  Download,
  Trash2,
  FileBadge,
  ClipboardList,
} from 'lucide-react';
import type { HealthRecord } from '../types';
import { CATEGORY_META } from '../types';
import { downloadRecord } from '../downloadUtils';

interface RecordDetailModalProps {
  record: HealthRecord | null;
  onClose: () => void;
  onDelete: (id: string) => void;
}

function generateReportSummary(record: HealthRecord): { label: string; value: string }[] {
  // Generate a simulated report summary based on category and notes
  const summaries: { label: string; value: string }[] = [];

  switch (record.category) {
    case 'Lab Report':
      summaries.push(
        { label: 'Specimen Type', value: 'Blood' },
        { label: 'Collection Date', value: new Date(record.date).toLocaleDateString() },
        { label: 'Status', value: 'Completed' },
      );
      break;
    case 'Prescription':
      summaries.push(
        { label: 'Prescribed On', value: new Date(record.date).toLocaleDateString() },
        { label: 'Prescribing Doctor', value: record.doctor },
        { label: 'Follow-up', value: 'As needed' },
      );
      break;
    case 'Allergy Details':
      summaries.push(
        { label: 'Test Type', value: 'IgE Panel' },
        { label: 'Test Date', value: new Date(record.date).toLocaleDateString() },
        { label: 'Status', value: 'Completed' },
      );
      break;
    case 'Imaging':
      summaries.push(
        { label: 'Modality', value: record.title.includes('X-Ray') ? 'X-Ray' : 'Imaging' },
        { label: 'Study Date', value: new Date(record.date).toLocaleDateString() },
        { label: 'Status', value: 'Final Report' },
      );
      break;
    case 'Vaccination':
      summaries.push(
        { label: 'Vaccine Type', value: record.title },
        { label: 'Administered On', value: new Date(record.date).toLocaleDateString() },
        { label: 'Route', value: 'Intramuscular' },
      );
      break;
    case 'Surgical Report':
      summaries.push(
        { label: 'Procedure', value: record.title },
        { label: 'Procedure Date', value: new Date(record.date).toLocaleDateString() },
        { label: 'Status', value: 'Post-op follow-up' },
      );
      break;
    case 'Diagnosis':
      summaries.push(
        { label: 'Assessment Date', value: new Date(record.date).toLocaleDateString() },
        { label: 'Diagnosing Doctor', value: record.doctor },
        { label: 'Status', value: 'Active' },
      );
      break;
  }
  return summaries;
}

export function RecordDetailModal({ record, onClose, onDelete }: RecordDetailModalProps) {
  if (!record) return null;
  const meta = CATEGORY_META[record.category];
  const reportSummary = generateReportSummary(record);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative max-h-[90vh] w-full max-w-2xl animate-scale-in overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-navy-100 p-6">
          <div className="flex items-start gap-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${meta.color}`}>
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-navy-900">{record.title}</h2>
              <span className={`badge mt-1 ${meta.color}`}>{record.category}</span>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-navy-400 hover:bg-navy-50">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[65vh] space-y-5 overflow-y-auto p-6">
          {/* Metadata grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl bg-navy-50 p-3">
              <Calendar className="h-5 w-5 text-teal-500" />
              <div>
                <p className="text-xs text-navy-400">Date</p>
                <p className="text-sm font-semibold text-navy-900">
                  {new Date(record.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-navy-50 p-3">
              <User className="h-5 w-5 text-teal-500" />
              <div>
                <p className="text-xs text-navy-400">Doctor</p>
                <p className="text-sm font-semibold text-navy-900">{record.doctor}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-navy-50 p-3">
              <Building2 className="h-5 w-5 text-teal-500" />
              <div>
                <p className="text-xs text-navy-400">Clinic</p>
                <p className="text-sm font-semibold text-navy-900">{record.clinic}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-navy-50 p-3">
              <FileText className="h-5 w-5 text-teal-500" />
              <div>
                <p className="text-xs text-navy-400">Document</p>
                <p className="truncate text-sm font-semibold text-navy-900">{record.fileName}</p>
              </div>
            </div>
          </div>

          {/* Report Summary Preview */}
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-navy-700">
              <FileBadge className="h-4 w-4 text-teal-500" />
              Report Summary
            </p>
            <div className="rounded-xl border border-navy-100 bg-gradient-to-br from-navy-50 to-white p-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {reportSummary.map((item) => (
                  <div key={item.label} className="rounded-lg bg-white/80 p-3 shadow-sm">
                    <p className="text-[11px] font-medium uppercase tracking-wide text-navy-400">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-navy-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Clinical Notes */}
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-navy-700">
              <ClipboardList className="h-4 w-4 text-teal-500" />
              Clinical Notes
            </p>
            <div className="rounded-xl border border-navy-100 bg-navy-50 p-4">
              <p className="text-sm leading-relaxed text-navy-700">{record.notes}</p>
            </div>
          </div>

          {/* Tags */}
          {record.tags.length > 0 && (
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-navy-700">
                <Tag className="h-4 w-4 text-teal-500" />
                Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {record.tags.map((tag) => (
                  <span key={tag} className="badge bg-teal-50 text-teal-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-navy-100 p-4">
          <button
            onClick={() => {
              onDelete(record.id);
              onClose();
            }}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
          <div className="flex gap-2">
            <button onClick={onClose} className="btn-secondary">
              Close
            </button>
            <button onClick={() => downloadRecord(record)} className="btn-teal">
              <Download className="h-4 w-4" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
