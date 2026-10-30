import { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  visible: boolean;
  onHide: () => void;
  duration?: number;
}

export function Toast({ message, visible, onHide, duration = 2500 }: ToastProps) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onHide, duration);
    return () => clearTimeout(timer);
  }, [visible, onHide, duration]);

  if (!visible) return null;

  return (
    <div className="no-print fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0">
      <div className="animate-fade-in-up flex items-center gap-3 rounded-2xl bg-green-600 px-5 py-3.5 shadow-card-hover">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/30">
          <CheckCircle className="h-5 w-5 text-white" />
        </div>
        <p className="text-sm font-semibold text-white">{message}</p>
        <button onClick={onHide} className="ml-2 rounded-lg p-1 text-green-200 hover:text-white">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
