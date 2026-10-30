import {
  LayoutDashboard,
  Upload,
  FileText,
  HeartPulse,
  X,
  Droplet,
  Home,
} from 'lucide-react';
import type { UserProfile } from '../data';
import { PROFILES } from '../data';

export type TabId = 'dashboard' | 'upload' | 'summary';

interface SidebarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  recordCount: number;
  activeProfile: UserProfile;
  onProfileChange: (p: UserProfile) => void;
  onShowWelcome: () => void;
}

const NAV_ITEMS: { id: TabId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard / Timeline', icon: LayoutDashboard },
  { id: 'upload', label: 'Upload New Record', icon: Upload },
  { id: 'summary', label: 'Appointment Summary', icon: FileText },
];

export function Sidebar({
  activeTab,
  onTabChange,
  mobileOpen,
  onCloseMobile,
  recordCount,
  activeProfile,
  onProfileChange,
  onShowWelcome,
}: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy-900/50 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-navy-900 text-white transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-500 shadow-lg">
              <HeartPulse className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-display text-xl font-extrabold tracking-tight">HealthVault</h1>
              <p className="text-xs text-navy-300">Health Record Organizer</p>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="rounded-lg p-1.5 text-navy-200 hover:bg-navy-800 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User Profile Switcher */}
        <div className="mx-4 mb-2 rounded-2xl bg-navy-800 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
            Active Profile
          </p>
          <div className="space-y-1.5">
            {PROFILES.map((p) => (
              <button
                key={p.id}
                onClick={() => onProfileChange(p)}
                className={`flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition-all ${
                  p.id === activeProfile.id
                    ? 'bg-teal-500 text-white shadow-lg'
                    : 'hover:bg-navy-700'
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-white">
                  {p.name[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {p.name} <span className="text-xs opacity-70">({p.relation})</span>
                  </p>
                  <p className="truncate text-xs text-navy-300">
                    Age {p.age} · {p.bloodGroup} Blood
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-navy-400">Menu</p>
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onTabChange(item.id);
                      onCloseMobile();
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-teal-500 text-white shadow-lg'
                        : 'text-navy-200 hover:bg-navy-800 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Welcome screen link */}
          <div className="mt-4 border-t border-navy-700 pt-4">
            <button
              onClick={onShowWelcome}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-navy-200 transition-colors hover:bg-navy-800 hover:text-white"
            >
              <Home className="h-5 w-5 shrink-0" />
              Welcome Screen
            </button>
          </div>
        </nav>

        {/* Footer disclaimer */}
        <div className="px-4 pb-4">
          <div className="rounded-xl bg-navy-800 p-4">
            <p className="text-[11px] leading-relaxed text-navy-300">
              HealthVault is a personal organizer and does not provide medical diagnoses or replace
              clinical advice.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
