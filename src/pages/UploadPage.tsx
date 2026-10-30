import { useState, useRef, useCallback } from 'react';
import {
  UploadCloud,
  FileText,
  X,
  Check,
  Tag,
  Calendar,
  User,
  Building2,
  ChevronDown,
  Plus,
  CheckCircle,
} from 'lucide-react';
import { Toast } from '../components/Toast';
import type { RecordCategory, HealthRecord } from '../types';
import { ALL_CATEGORIES, CATEGORY_META } from '../types';

interface UploadPageProps {
  onAddRecord: (record: Omit<HealthRecord, 'id' | 'createdAt'>) => void;
  onDone: () => void;
}

export function UploadPage({ onAddRecord, onDone }: UploadPageProps) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<RecordCategory>('Lab Report');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [doctor, setDoctor] = useState('');
  const [clinic, setClinic] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [notes, setNotes] = useState('');
  const [success, setSuccess] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const inputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (f: File) => {
    setFile(f);
    if (!title) setTitle(f.name.replace(/\.[^.]+$/, ''));
  };

  const readFileAsBase64 = (f: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(f);
    });
  };

  const addTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !tags.includes(t)) {
      setTags([...tags, t]);
    }
    setTagInput('');
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!file) errs.file = 'Please upload a document.';
    if (!title.trim()) errs.title = 'Title is required.';
    if (!doctor.trim()) errs.doctor = 'Doctor name is required.';
    if (!date) errs.date = 'Date is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate() || !file) return;

    let fileData = '';
    try {
      fileData = await readFileAsBase64(file);
    } catch {
      // If reading fails, save without file data — text fallback download
    }

    onAddRecord({
      title: title.trim(),
      category,
      date,
      doctor: doctor.trim(),
      clinic: clinic.trim() || 'N/A',
      tags,
      notes: notes.trim() || 'No notes added.',
      fileName: file.name,
      fileSize: formatFileSize(file.size),
      fileType: file.type || 'application/octet-stream',
      fileData,
    });

    setToastVisible(true);
    setSuccess(true);
    setTimeout(() => {
      onDone();
    }, 1500);
  };

  const resetForm = () => {
    setFile(null);
    setTitle('');
    setCategory('Lab Report');
    setDate(new Date().toISOString().slice(0, 10));
    setDoctor('');
    setClinic('');
    setTags([]);
    setNotes('');
    setErrors({});
    setSuccess(false);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <div className="animate-scale-in flex h-20 w-20 items-center justify-center rounded-full bg-teal-50">
          <CheckCircle className="h-10 w-10 text-teal-500" />
        </div>
        <h2 className="mt-4 font-display text-xl font-bold text-navy-900">Record Saved!</h2>
        <p className="mt-1 text-sm text-navy-400">Redirecting to timeline...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 sm:p-6">
      <Toast
        message="Record saved successfully!"
        visible={toastVisible}
        onHide={() => setToastVisible(false)}
      />
      {/* Drag & Drop */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
          dragActive
            ? 'border-teal-400 bg-teal-50'
            : file
              ? 'border-teal-300 bg-teal-50/30'
              : 'border-navy-200 bg-white hover:border-teal-300 hover:bg-navy-50'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png,.dcm,.docx"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
        {file ? (
          <div className="flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
              <FileText className="h-6 w-6 text-teal-600" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-navy-900">{file.name}</p>
              <p className="text-xs text-navy-400">{formatFileSize(file.size)}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }}
              className="ml-2 rounded-lg p-1.5 text-navy-400 hover:bg-rose-50 hover:text-rose-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-full transition-colors ${
                dragActive ? 'bg-teal-200' : 'bg-navy-50'
              }`}
            >
              <UploadCloud className={`h-8 w-8 ${dragActive ? 'text-teal-600' : 'text-navy-400'}`} />
            </div>
            <p className="mt-3 text-sm font-semibold text-navy-700">
              {dragActive ? 'Drop file here' : 'Drag & drop or click to upload'}
            </p>
            <p className="mt-1 text-xs text-navy-400">PDF, JPG, PNG, DOCX up to 10 MB</p>
          </div>
        )}
      </div>
      {errors.file && <p className="-mt-4 text-sm text-rose-500">{errors.file}</p>}

      {/* Form */}
      <div className="card space-y-5 p-6">
        <h2 className="font-display text-lg font-bold text-navy-900">Record Details</h2>

        {/* Title */}
        <div>
          <label className="label-text">Document Title</label>
          <input
            type="text"
            placeholder="e.g. Complete Blood Count Report"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
          />
          {errors.title && <p className="mt-1 text-sm text-rose-500">{errors.title}</p>}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Category */}
          <div>
            <label className="label-text">Category</label>
            <div className="relative">
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as RecordCategory)}
                className="appearance-none rounded-xl border border-navy-200 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-navy-900 transition-all focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100"
              >
                {ALL_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-2">
              <span className={`badge ${CATEGORY_META[category].color}`}>{category}</span>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="label-text flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-teal-500" /> Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input-field"
            />
            {errors.date && <p className="mt-1 text-sm text-rose-500">{errors.date}</p>}
          </div>

          {/* Doctor */}
          <div>
            <label className="label-text flex items-center gap-1.5">
              <User className="h-4 w-4 text-teal-500" /> Doctor Name
            </label>
            <input
              type="text"
              placeholder="e.g. Dr. Priya Sharma"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              className="input-field"
            />
            {errors.doctor && <p className="mt-1 text-sm text-rose-500">{errors.doctor}</p>}
          </div>

          {/* Clinic */}
          <div>
            <label className="label-text flex items-center gap-1.5">
              <Building2 className="h-4 w-4 text-teal-500" /> Clinic / Hospital
            </label>
            <input
              type="text"
              placeholder="e.g. CityCare Diagnostics"
              value={clinic}
              onChange={(e) => setClinic(e.target.value)}
              className="input-field"
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="label-text flex items-center gap-1.5">
            <Tag className="h-4 w-4 text-teal-500" /> Tags
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a tag and press Enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
              className="input-field"
            />
            <button onClick={addTag} className="btn-secondary px-4">
              <Plus className="h-4 w-4" />
            </button>
          </div>
          {tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-lg bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700"
                >
                  {tag}
                  <button
                    onClick={() => setTags(tags.filter((t) => t !== tag))}
                    className="ml-0.5 rounded hover:text-teal-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Notes */}
        <div>
          <label className="label-text">Clinical Notes (optional)</label>
          <textarea
            rows={3}
            placeholder="Add any key findings, results, or observations from this record..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="input-field resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between border-t border-navy-50 pt-4">
          <button onClick={resetForm} className="btn-secondary">
            <X className="h-4 w-4" />
            Clear
          </button>
          <button onClick={handleSubmit} className="btn-teal">
            <Check className="h-4 w-4" />
            Save Record
          </button>
        </div>
      </div>
    </div>
  );
}
