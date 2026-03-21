import React from 'react';
import { RefreshCw, Home, ChevronDown, ChevronUp, Bug } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null, showDetails: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  toggleDetails = () => {
    this.setState(prev => ({ showDetails: !prev.showDetails }));
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
          <div className="max-w-lg w-full">
            <div className="text-center space-y-8">
              {/* Illustration */}
              <div className="relative mx-auto w-48 h-48">
                <div className="absolute inset-0 rounded-full bg-red-50 dark:bg-red-950/30" />
                <div className="absolute inset-4 rounded-full bg-red-100/60 dark:bg-red-900/20 flex items-center justify-center">
                  <Bug className="w-20 h-20 text-red-400 dark:text-red-500" />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-3">
                <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
                  Something went wrong
                </h1>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
                  An unexpected error occurred. This has been logged and we'll look into it. Try reloading the page.
                </p>
              </div>

              {/* Error Details (collapsible) */}
              {this.state.error && (
                <div className="mx-auto max-w-sm">
                  <button
                    onClick={this.toggleDetails}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    {this.state.showDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    {this.state.showDetails ? 'Hide' : 'Show'} error details
                  </button>
                  {this.state.showDetails && (
                    <div className="mt-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 text-left">
                      <p className="font-mono text-xs text-red-700 dark:text-red-300 break-all whitespace-pre-wrap">
                        {this.state.error?.toString()}
                      </p>
                      {this.state.errorInfo?.componentStack && (
                        <pre className="mt-2 font-mono text-xs text-red-600/70 dark:text-red-400/60 overflow-x-auto max-h-32 overflow-y-auto">
                          {this.state.errorInfo.componentStack.slice(0, 500)}
                        </pre>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={this.handleReload}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reload Page
                </button>
                <button
                  onClick={this.handleGoHome}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <Home className="w-4 h-4" />
                  Go to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
