import React from 'react';
import { AdminSidebar } from './AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPath: string;
  navigate: (path: string) => void;
  title: string;
}

export function AdminLayout({ children, currentPath, navigate, title }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      <AdminSidebar currentPath={currentPath} navigate={navigate} />
      
      <main className="flex-1 flex flex-col">
        <header className="h-20 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-10">
          <h1 className="text-xl font-bold text-white">{title}</h1>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-950"></span>
            </button>
            <div className="h-8 w-px bg-slate-800"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white">Admin User</p>
                <p className="text-xs text-slate-500">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold border-2 border-slate-800">
                A
              </div>
            </div>
          </div>
        </header>
        
        <div className="flex-1 p-8 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
