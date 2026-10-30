import type { HealthRecord, RecordCategory } from './types';

export const STORAGE_KEY = 'healthvault_records_v1';

export interface UserProfile {
  id: string;
  name: string;
  relation: string;
  age: number;
  bloodGroup: string;
  emergencyContact: string;
  emergencyPhone: string;
  allergies: string[];
}

export const PROFILES: UserProfile[] = [
  {
    id: 'aman',
    name: 'Aman',
    relation: 'Self',
    age: 21,
    bloodGroup: 'O+',
    emergencyContact: 'Priya (Mother)',
    emergencyPhone: '+91 98765 43210',
    allergies: ['Penicillin', 'Peanut', 'Dust Mites'],
  },
  {
    id: 'priya',
    name: 'Priya',
    relation: 'Mother',
    age: 52,
    bloodGroup: 'B+',
    emergencyContact: 'Aman (Son)',
    emergencyPhone: '+91 98765 11111',
    allergies: ['Sulfa Drugs', 'Latex'],
  },
  {
    id: 'rajesh',
    name: 'Rajesh',
    relation: 'Father',
    age: 56,
    bloodGroup: 'A+',
    emergencyContact: 'Priya (Wife)',
    emergencyPhone: '+91 98765 22222',
    allergies: ['Aspirin'],
  },
];

export const PROFILE_RECORDS: Record<string, HealthRecord[]> = {
  aman: [
    {
      id: 'aman-001',
      title: 'Complete Blood Count (CBC) Report',
      category: 'Lab Report',
      date: '2026-10-05',
      doctor: 'Dr. Priya Sharma',
      clinic: 'CityCare Diagnostics',
      tags: ['hemoglobin', 'WBC', 'RBC', 'platelets'],
      notes:
        'Hemoglobin: 14.2 g/dL (normal). WBC: 6,800/µL (normal). RBC: 5.1 million/µL. Platelets: 2.4 lakh/µL. All values within normal range. Next routine check recommended in 6 months.',
      fileName: 'cbc-report-oct2026.pdf',
      fileSize: '1.2 MB',
      fileType: 'application/pdf',
      fileData: '',
      createdAt: '2026-10-05T10:30:00Z',
    },
    {
      id: 'aman-002',
      title: 'Allergy Test Report — Panel A',
      category: 'Allergy Details',
      date: '2026-06-18',
      doctor: 'Dr. Anjali Verma',
      clinic: 'Allergy & Immunology Center',
      tags: ['dust-mites', 'pollen', 'peanut', 'latex'],
      notes:
        'Positive reaction to dust mites (class 3), pollen (class 2), and peanut (class 4). Negative for latex. Advised to carry antihistamine and avoid peanut-containing foods. EpiPen prescribed for emergencies.',
      fileName: 'allergy-panel-a-jun2026.pdf',
      fileSize: '760 KB',
      fileType: 'application/pdf',
      fileData: '',
      createdAt: '2026-06-18T09:00:00Z',
    },
    {
      id: 'aman-003',
      title: 'Tetanus Booster Vaccination',
      category: 'Vaccination',
      date: '2026-03-22',
      doctor: 'Dr. Priya Sharma',
      clinic: 'CityCare Diagnostics',
      tags: ['tetanus', 'booster', 'tdap'],
      notes:
        'Administered Tdap booster (0.5 mL IM, deltoid). No adverse reaction observed. Next booster due in 10 years. Lot #TTX-2026-044.',
      fileName: 'tetanus-vaccine-mar2026.pdf',
      fileSize: '320 KB',
      fileType: 'application/pdf',
      fileData: '',
      createdAt: '2026-03-22T16:00:00Z',
    },
  ],
  priya: [
    {
      id: 'priya-001',
      title: 'HbA1c Diabetes Follow-Up',
      category: 'Lab Report',
      date: '2026-10-01',
      doctor: 'Dr. Meera Krishnan',
      clinic: 'SugarFree Diabetes Center',
      tags: ['hba1c', 'diabetes', 'fasting-glucose', 'follow-up'],
      notes:
        'HbA1c: 7.2% (slightly above target of <7%). Fasting glucose: 142 mg/dL. Postprandial: 198 mg/dL. Metformin dose increased to 1000 mg BID. Advised dietary modifications and daily 30-min walk. Recheck in 3 months.',
      fileName: 'hba1c-oct2026.pdf',
      fileSize: '980 KB',
      fileType: 'application/pdf',
      fileData: '',
      createdAt: '2026-10-01T11:00:00Z',
    },
    {
      id: 'priya-002',
      title: 'Thyroid Function Panel',
      category: 'Lab Report',
      date: '2026-08-15',
      doctor: 'Dr. Meera Krishnan',
      clinic: 'SugarFree Diabetes Center',
      tags: ['tsh', 't3', 't4', 'hypothyroidism'],
      notes:
        'TSH: 4.8 µIU/mL (slightly elevated). Free T3: 3.1 pg/mL (normal). Free T4: 1.1 ng/dL (normal). Continued Levothyroxine 50 mcg daily. Recheck TSH in 6 months.',
      fileName: 'thyroid-panel-aug2026.pdf',
      fileSize: '640 KB',
      fileType: 'application/pdf',
      fileData: '',
      createdAt: '2026-08-15T09:30:00Z',
    },
    {
      id: 'priya-003',
      title: 'Blood Pressure Medication Review',
      category: 'Prescription',
      date: '2026-07-20',
      doctor: 'Dr. Vikram Rao',
      clinic: 'HeartCare Clinic',
      tags: ['hypertension', 'telmisartan', 'bp'],
      notes:
        'BP: 138/86 mmHg. Continued Telmisartan 40 mg OD. Advised low-sodium diet and stress management. Home BP monitoring recommended twice weekly. Target BP <130/80.',
      fileName: 'bp-review-jul2026.pdf',
      fileSize: '410 KB',
      fileType: 'application/pdf',
      fileData: '',
      createdAt: '2026-07-20T14:00:00Z',
    },
  ],
  rajesh: [
    {
      id: 'rajesh-001',
      title: 'Lipid Profile & Cholesterol',
      category: 'Lab Report',
      date: '2026-09-28',
      doctor: 'Dr. Vikram Rao',
      clinic: 'HeartCare Clinic',
      tags: ['cholesterol', 'ldl', 'hdl', 'triglycerides'],
      notes:
        'Total cholesterol: 218 mg/dL (borderline high). LDL: 142 mg/dL (high). HDL: 38 mg/dL (low). Triglycerides: 190 mg/dL. Started Rosuvastatin 10 mg OD. Advised Mediterranean diet and regular exercise. Recheck lipid panel in 3 months.',
      fileName: 'lipid-profile-sep2026.pdf',
      fileSize: '850 KB',
      fileType: 'application/pdf',
      fileData: '',
      createdAt: '2026-09-28T10:00:00Z',
    },
    {
      id: 'rajesh-002',
      title: 'Coronary Angioplasty Follow-Up',
      category: 'Surgical Report',
      date: '2026-06-05',
      doctor: 'Dr. Suresh Bhat',
      clinic: 'Metro Cardiac Hospital',
      tags: ['angioplasty', 'stent', 'cardiac', 'follow-up'],
      notes:
        'Status post elective PCI with drug-eluting stent to LAD. Procedure uncomplicated. Dual antiplatelet therapy (Aspirin 75 mg + Clopidogrel 75 mg) continued. Echocardiogram: LVEF 55%. Next follow-up in 6 months with stress test.',
      fileName: 'angioplasty-followup-jun2026.pdf',
      fileSize: '1.5 MB',
      fileType: 'application/pdf',
      fileData: '',
      createdAt: '2026-06-05T12:00:00Z',
    },
    {
      id: 'rajesh-003',
      title: 'Annual Cardiac Check-Up',
      category: 'Diagnosis',
      date: '2026-01-15',
      doctor: 'Dr. Suresh Bhat',
      clinic: 'Metro Cardiac Hospital',
      tags: ['ecg', 'echo', 'stress-test', 'cardiac'],
      notes:
        'ECG: normal sinus rhythm. Echocardiogram: normal LV function, no regional wall motion abnormality. TMT: negative for inducible ischemia. Overall cardiac status stable. Continue current medications.',
      fileName: 'cardiac-checkup-jan2026.pdf',
      fileSize: '1.1 MB',
      fileType: 'application/pdf',
      fileData: '',
      createdAt: '2026-01-15T11:00:00Z',
    },
  ],
};

export const DEFAULT_PROFILE_ID = 'aman';
