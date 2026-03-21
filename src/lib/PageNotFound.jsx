import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const KNOWN_PAGES = [
  { name: 'Dashboard', path: '/Dashboard', description: 'Project overview and metrics' },
  { name: 'Boards', path: '/Boards', description: 'Kanban boards and task management' },
  { name: 'Backlog', path: '/Backlog', description: 'Sprint planning and user stories' },
  { name: 'Analytics', path: '/Analytics', description: 'Charts and performance data' },
  { name: 'Calendar', path: '/Calendar', description: 'Events and scheduling' },
  { name: 'Settings', path: '/Settings', description: 'Account and app preferences' },
];

function getErrorHint(pathname) {
  const path = pathname.toLowerCase().replace(/^\//, '');
  if (!path) return null;

  // Check for close matches (typos)
  const match = KNOWN_PAGES.find(p =>
    p.name.toLowerCase().startsWith(path.slice(0, 3)) ||
    path.startsWith(p.name.toLowerCase().slice(0, 3))
  );
  if (match) {
    return `Did you mean "${match.name}"?`;
  }

  // Check for common patterns
  if (path.includes('board') && path !== 'boards' && path !== 'board') {
    return 'Board pages require an ID parameter — try visiting Boards first.';
  }

  return null;
}

export default function PageNotFound() {
  const location = useLocation();
  const navigate = useNavigate();
  const pageName = decodeURIComponent(location.pathname.substring(1)) || 'unknown';
  const hint = getErrorHint(location.pathname);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-lg w-full">
        <div className="text-center space-y-8">
          {/* Illustration */}
          <div className="relative mx-auto w-48 h-48">
            <div className="absolute inset-0 rounded-full bg-blue-50 dark:bg-blue-950/30" />
            <div className="absolute inset-4 rounded-full bg-blue-100/60 dark:bg-blue-900/20 flex items-center justify-center">
              <span className="text-8xl font-bold bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-300 dark:to-blue-500 bg-clip-text text-transparent select-none">
                404
              </span>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
              Page not found
            </h1>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
              There's no page at <span className="font-medium text-slate-700 dark:text-slate-300 break-all">/{pageName}</span>.
              It may have been moved or the URL might be incorrect.
            </p>
          </div>

          {/* Hint */}
          {hint && (
            <div className="mx-auto max-w-sm p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50">
              <div className="flex items-center gap-2 justify-center">
                <Search className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                <p className="text-sm text-amber-700 dark:text-amber-300">{hint}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors"
            >
              <Home className="w-4 h-4" />
              Go to Dashboard
            </button>
          </div>

          {/* Quick Links */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">Or jump to:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {KNOWN_PAGES.map(page => (
                <button
                  key={page.path}
                  onClick={() => navigate(page.path)}
                  title={page.description}
                  className="px-3 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                >
                  {page.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
