import { WifiOff, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ConnectionLost() {
  const [checking, setChecking] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Auto-reload when back online
  useEffect(() => {
    if (isOnline) {
      window.location.reload();
    }
  }, [isOnline]);

  const handleRetry = () => {
    setChecking(true);
    setTimeout(() => {
      if (navigator.onLine) {
        window.location.reload();
      } else {
        setChecking(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-lg w-full">
        <div className="text-center space-y-8">
          {/* Illustration */}
          <div className="relative mx-auto w-48 h-48">
            <div className="absolute inset-0 rounded-full bg-slate-100 dark:bg-slate-800/50" />
            <div className="absolute inset-4 rounded-full bg-slate-200/60 dark:bg-slate-700/30 flex items-center justify-center">
              <WifiOff className="w-20 h-20 text-slate-400 dark:text-slate-500" />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
              No Connection
            </h1>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
              It looks like you've lost your internet connection. Check your network and try again — the page will reload automatically when you're back online.
            </p>
          </div>

          {/* Action */}
          <div>
            <button
              onClick={handleRetry}
              disabled={checking}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-slate-700 hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-500 rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${checking ? 'animate-spin' : ''}`} />
              {checking ? 'Checking...' : 'Try Again'}
            </button>
          </div>

          {/* Status indicator */}
          <div className="flex items-center justify-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-400 animate-pulse'}`} />
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {isOnline ? 'Connected' : 'Offline'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
