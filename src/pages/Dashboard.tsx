import { useMemo } from 'react';
import {
  Calendar,
  User,
  Eye,
  Search,
  Filter,
  ChevronDown,
  TrendingUp,
  Heart,
  Activity,
  AlertCircle,
} from 'lucide-react';
import type { HealthRecord, RecordCategory } from '../types';
import { CATEGORY_META, ALL_CATEGORIES } from '../types';

interface DashboardProps {
  records: HealthRecord[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  categoryFilter: RecordCategory | 'All';
  onCategoryChange: (c: RecordCategory | 'All') => void;
  dateFilter: string;
  onDateFilterChange: (d: string) => void;
  onView: (record: HealthRecord) => void;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function groupByDate(records: HealthRecord[]) {
  const groups: { label: string; items: HealthRecord[] }[] = [];
  let current = '';

  for (const rec of records) {
    const date = new Date(rec.date);
    const year = date.getFullYear();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const label = `${month} ${year}`;

    if (label !== current) {
      groups.push({ label, items: [rec] });
      current = label;
    } else {
      groups[groups.length - 1].items.push(rec);
    }
  }
  return groups;
}

export function Dashboard({
  records,
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  dateFilter,
  onDateFilterChange,
  onView,
}: DashboardProps) {
  const filtered = useMemo(() => {
    let result = [...records];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.doctor.toLowerCase().includes(q) ||
          r.clinic.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    if (categoryFilter !== 'All') {
      result = result.filter((r) => r.category === categoryFilter);
    }

    if (dateFilter) {
      result = result.filter((r) => r.date.startsWith(dateFilter));
    }

    return result.sort((a, b) => b.date.localeCompare(a.date));
  }, [records, searchQuery, categoryFilter, dateFilter]);

  const groups = groupByDate(filtered);

  // Stats
  const totalRecords = records.length;
  const allergyCount = records.filter((r) => r.category === 'Allergy Details').length;
  const thisYear = new Date().getFullYear();
  const recentCount = records.filter((r) => r.date.startsWith(String(thisYear))).length;
  const doctorCount = new Set(records.map((r) => r.doctor)).size;

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={Heart}
          label="Total Records"
          value={totalRecords}
          color="bg-teal-500"
          bg="bg-teal-50"
        />
        <StatCard
          icon={Activity}
          label="This Year"
          value={recentCount}
          color="bg-navy-700"
          bg="bg-navy-50"
        />
        <StatCard
          icon={AlertCircle}
          label="Allergies"
          value={allergyCount}
          color="bg-amber-500"
          bg="bg-amber-50"
        />
        <StatCard
          icon={User}
          label="Doctors"
          value={doctorCount}
          color="bg-blue-500"
          bg="bg-blue-50"
        />
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
            <input
              type="text"
              placeholder="Search by title, doctor, clinic, or tag..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
              <select
                value={categoryFilter}
                onChange={(e) => onCategoryChange(e.target.value as RecordCategory | 'All')}
                className="appearance-none rounded-xl border border-navy-200 bg-white py-2.5 pl-10 pr-9 text-sm font-medium text-navy-700 transition-all focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100"
              >
                <option value="All">All Categories</option>
                {ALL_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
            </div>
            <input
              type="month"
              value={dateFilter}
              onChange={(e) => onDateFilterChange(e.target.value)}
              className="rounded-xl border border-navy-200 bg-white px-4 py-2.5 text-sm font-medium text-navy-700 transition-all focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100"
            />
          </div>
        </div>
      </div>

      {/* Timeline */}
      {filtered.length === 0 ? (
        <div className="card flex flex-col items-center justify-center p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy-50">
            <Search className="h-8 w-8 text-navy-300" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-navy-700">No records found</h3>
          <p className="mt-1 text-sm text-navy-400">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-navy-100 sm:left-[23px]" />

          <div className="space-y-8">
            {groups.map((group) => (
              <div key={group.label} className="animate-fade-in-up">
                <div className="mb-3 flex items-center gap-3">
                  <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-navy-50 bg-navy-800 text-white sm:h-12 sm:w-12">
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <h3 className="font-display text-base font-bold text-navy-900">{group.label}</h3>
                  <span className="badge bg-navy-100 text-navy-600">{group.items.length} records</span>
                </div>

                <div className="space-y-3 sm:pl-12">
                  {group.items.map((record) => {
                    const meta = CATEGORY_META[record.category];
                    return (
                      <div
                        key={record.id}
                        className="card card-hover group animate-fade-in cursor-pointer p-4 sm:p-5"
                        onClick={() => onView(record)}
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="flex items-start gap-3">
                            <div
                              className={`h-10 w-1 rounded-full ${meta.dot} shrink-0`}
                              aria-hidden
                            />
                            <div className="min-w-0">
                              <h4 className="font-semibold text-navy-900 group-hover:text-teal-700">
                                {record.title}
                              </h4>
                              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-navy-400">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3.5 w-3.5" />
                                  {formatDate(record.date)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <User className="h-3.5 w-3.5" />
                                  {record.doctor}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`badge ${meta.color}`}>{record.category}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onView(record);
                              }}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-navy-50 px-3 py-1.5 text-xs font-semibold text-navy-700 transition-colors hover:bg-teal-50 hover:text-teal-700"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              View Details
                            </button>
                          </div>
                        </div>
                        {/* Tags row */}
                        {record.tags.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5 border-t border-navy-50 pt-3">
                            {record.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-md bg-navy-50 px-2 py-0.5 text-[11px] font-medium text-navy-400"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  bg,
}: {
  icon: typeof Heart;
  label: string;
  value: number;
  color: string;
  bg: string;
}) {
  return (
    <div className="card p-4">
      <div className="flex items-center gap-3">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${bg}`}>
          <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
        </div>
        <div>
          <p className="text-2xl font-bold text-navy-900">{value}</p>
          <p className="text-xs font-medium text-navy-400">{label}</p>
        </div>
      </div>
    </div>
  );
}
