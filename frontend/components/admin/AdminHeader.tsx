import React from 'react';

export function AdminHeader() {
  return (
    <div className="px-8 pt-10 pb-2">
      <div className="flex justify-center mb-6">
        <div className="w-14 h-14 rounded-xl bg-rose-600 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock w-7 h-7 text-white" aria-hidden="true">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
      </div>
      <h1 className="text-2xl font-bold text-center text-white mb-1">Admin Login</h1>
      <p className="text-center text-slate-400 text-sm">Sign in to access the dashboard</p>
    </div>
  );
}
