import { Menu, Search, HeartPulse, ChevronDown, Home } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import type { UserProfile } from '../data';
import { PROFILES } from '../data';

interface HeaderProps {
  title: string;
  subtitle: string;
  onOpenMobile: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  showSearch: boolean;
  activeProfile: UserProfile;
  onProfileChange: (p: UserProfile) => void;
  onShowWelcome: () => void;
}

export function Header({
  title,
  subtitle,
  onOpenMobile,
  searchQuery,
  onSearchChange,
  showSearch,
  activeProfile,
  onProfileChange,
  onShowWelcome,
}: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-navy-100 bg-white/80 backdrop-blur-md">
      <div className="flex items-center gap-4 px-4 py-4 sm:px-6">
        <button
          onClick={onOpenMobile}
          className="rounded-lg p-2 text-navy-600 hover:bg-navy-50 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <HeartPulse className="h-5 w-5 text-teal-500 lg:hidden" />
            <h1 className="truncate font-display text-lg font-bold text-navy-900 sm:text-xl">{title}</h1>
          </div>
          <p className="truncate text-sm text-navy-400">{subtitle}</p>
        </div>

        {showSearch && (
          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
            <input
              type="text"
              placeholder="Search records..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-56 rounded-xl border border-navy-200 bg-navy-50 py-2.5 pl-10 pr-4 text-sm text-navy-900 placeholder-navy-300 transition-all focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-100 lg:w-72"
            />
          </div>
        )}

        {/* Welcome button */}
        <button
          onClick={onShowWelcome}
          className="rounded-xl border border-navy-200 bg-white p-2.5 text-navy-600 shadow-card transition-colors hover:bg-navy-50"
          title="Back to Welcome"
        >
          <Home className="h-5 w-5" />
        </button>

        {/* Profile Switcher Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="flex items-center gap-2 rounded-xl border border-navy-200 bg-white py-1.5 pl-1.5 pr-3 shadow-card transition-colors hover:bg-navy-50"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-800 text-xs font-bold text-white">
              {activeProfile.name[0]}
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-navy-900">{activeProfile.name}</p>
              <p className="text-[11px] text-navy-400">{activeProfile.relation}</p>
            </div>
            <ChevronDown className="h-4 w-4 text-navy-400" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 animate-scale-in rounded-2xl border border-navy-100 bg-white p-2 shadow-2xl">
              <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-navy-400">
                Family Profiles
              </p>
              {PROFILES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    onProfileChange(p);
                    setDropdownOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors ${
                    p.id === activeProfile.id
                      ? 'bg-teal-50'
                      : 'hover:bg-navy-50'
                  }`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-800 text-sm font-bold text-white">
                    {p.name[0]}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-navy-900">
                      {p.name} <span className="text-navy-400">({p.relation})</span>
                    </p>
                    <p className="text-xs text-navy-400">
                      Age {p.age} · {p.bloodGroup}
                    </p>
                  </div>
                  {p.id === activeProfile.id && (
                    <div className="h-2 w-2 rounded-full bg-teal-500" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
