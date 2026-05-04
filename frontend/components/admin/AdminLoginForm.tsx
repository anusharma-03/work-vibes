import React from 'react';

interface AdminLoginFormProps {
  navigate?: (path: string) => void;
}

export function AdminLoginForm({ navigate }: AdminLoginFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login and navigate to dashboard
    navigate?.('/status/admin');
  };

  return (
    <form className="px-8 pb-10 pt-4" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Username</label>
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" aria-hidden="true">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <input 
              placeholder="Enter username" 
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" 
              autoComplete="username" 
              required 
              type="text" 
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" aria-hidden="true">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <input 
              placeholder="Enter password" 
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" 
              autoComplete="current-password" 
              required 
              type="password" 
            />
          </div>
        </div>
      </div>
      <button 
        type="submit" 
        className="mt-6 w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium flex items-center justify-center gap-2 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-in" aria-hidden="true">
          <path d="m10 17 5-5-5-5"></path>
          <path d="M15 12H3"></path>
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
        </svg>
        Sign in
      </button>
    </form>
  );
}

