import { HeartPulse, FileText, Activity, ArrowRight, Shield } from 'lucide-react';

interface WelcomeScreenProps {
  onEnter: () => void;
}

export function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-navy-900">
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-teal-400/10 blur-3xl" />

      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-8">
        {/* Logo */}
        <div className="animate-scale-in flex flex-col items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-500 shadow-2xl shadow-teal-500/30">
            <HeartPulse className="h-11 w-11 text-white" />
          </div>
          <h1 className="mt-6 font-display text-5xl font-extrabold tracking-tight text-white">
            HealthVault
          </h1>
          <p className="mt-2 text-lg text-navy-300">Your family's health, organized and secure</p>
        </div>

        {/* Taglines */}
        <div className="mt-10 max-w-2xl text-center">
          <p className="text-base leading-relaxed text-navy-200">
            Keep all your medical records, prescriptions, lab reports, and appointment summaries
            in one secure place. Built for individuals and families.
          </p>
        </div>

        {/* Feature pills */}
        <div className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
          <FeaturePill icon={Shield} label="Secure Storage" />
          <FeaturePill icon={FileText} label="Smart Summaries" />
          <FeaturePill icon={Activity} label="Family Profiles" />
        </div>

        {/* CTA */}
        <button
          onClick={onEnter}
          className="group mt-10 inline-flex items-center gap-3 rounded-2xl bg-teal-500 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-teal-500/30 transition-all hover:bg-teal-400 hover:shadow-2xl active:scale-[0.98]"
        >
          Enter HealthVault
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>

        <p className="mt-8 text-xs text-navy-400">
          HealthVault is a personal organizer and does not provide medical diagnoses or replace
          clinical advice.
        </p>
      </div>
    </div>
  );
}

function FeaturePill({
  icon: Icon,
  label,
}: {
  icon: typeof Shield;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-navy-700 bg-navy-800/50 px-4 py-3 backdrop-blur-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20">
        <Icon className="h-5 w-5 text-teal-400" />
      </div>
      <span className="text-sm font-semibold text-navy-100">{label}</span>
    </div>
  );
}
