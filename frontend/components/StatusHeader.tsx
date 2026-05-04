import React from 'react';

interface StatusHeaderProps {
  navigate?: (path: string) => void;
  userName?: string;
  onChangeUser?: () => void;
}

export function StatusHeader({ navigate, userName, onChangeUser }: StatusHeaderProps) {
  return (
    <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
      <div className="mx-auto px-10 py-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate?.('/')}>
            <div className="p-2 rounded-lg text-white">
              <img width="40" src="https://task.vipankumar.in/static/logo.png" alt="Logo" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-gray-800 leading-none">ReportPro</h1>
              <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest mt-1">Esfera Solution</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          {userName && (
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
              <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold text-sm border border-rose-200">
                {userName[0]}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase leading-none">Reporting as</span>
                <span className="text-sm font-bold text-gray-800">{userName}</span>
              </div>
              <button 
                onClick={onChangeUser}
                className="ml-2 p-1.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                title="Change User"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              </button>
            </div>
          )}

          <div className="h-8 w-[1px] bg-gray-200 mx-1 hidden sm:block"></div>

          <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all bg-rose-50 text-rose-700 hover:bg-rose-100 group">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles group-hover:rotate-12 transition-transform" aria-hidden="true">
              <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path>
            </svg>
            AI Refine
          </button>

          <button 
            onClick={() => navigate?.('/status/admin')}
            className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-lg font-medium transition-all shadow-lg shadow-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard" aria-hidden="true">
              <rect width="7" height="9" x="3" y="3" rx="1"></rect>
              <rect width="7" height="5" x="14" y="3" rx="1"></rect>
              <rect width="7" height="9" x="14" y="12" rx="1"></rect>
              <rect width="7" height="5" x="3" y="16" rx="1"></rect>
            </svg>
            <span className="hidden sm:inline">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
}
