export type RecordCategory =
  | 'Lab Report'
  | 'Prescription'
  | 'Allergy Details'
  | 'Imaging'
  | 'Vaccination'
  | 'Surgical Report'
  | 'Diagnosis';

export interface HealthRecord {
  id: string;
  title: string;
  category: RecordCategory;
  date: string; // ISO yyyy-mm-dd
  doctor: string;
  clinic: string;
  tags: string[];
  notes: string;
  fileName: string;
  fileSize: string;
  fileType: string; // MIME type, e.g. application/pdf
  fileData: string; // Base64 data URL, or empty string for dummy records
  createdAt: string; // ISO timestamp
}

export const CATEGORY_META: Record<RecordCategory, { color: string; dot: string; icon: string }> = {
  'Lab Report': { color: 'bg-teal-100 text-teal-800', dot: 'bg-teal-500', icon: 'test-tube' },
  Prescription: { color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500', icon: 'pill' },
  'Allergy Details': { color: 'bg-amber-100 text-amber-800', dot: 'bg-amber-500', icon: 'alert-triangle' },
  Imaging: { color: 'bg-indigo-100 text-indigo-700', dot: 'bg-indigo-500', icon: 'scan' },
  Vaccination: { color: 'bg-green-100 text-green-700', dot: 'bg-green-500', icon: 'syringe' },
  'Surgical Report': { color: 'bg-rose-100 text-rose-700', dot: 'bg-rose-500', icon: 'activity' },
  Diagnosis: { color: 'bg-purple-100 text-purple-700', dot: 'bg-purple-500', icon: 'stethoscope' },
};

export const ALL_CATEGORIES: RecordCategory[] = [
  'Lab Report',
  'Prescription',
  'Allergy Details',
  'Imaging',
  'Vaccination',
  'Surgical Report',
  'Diagnosis',
];
