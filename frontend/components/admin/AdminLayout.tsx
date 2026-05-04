import React from 'react';
import { AdminSidebar } from './AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  headerRight?: React.ReactNode;
}

export function AdminLayout({ children, title, subtitle, headerRight }: AdminLayoutProps) {
  const selectedUser = localStorage.getItem('selectedUser');

  return (
    <div className="flex min-h-screen bg-[#111827]">
      <AdminSidebar />

      <main className="flex-1 bg-gradient-to-br from-sky-100 via-blue-100 to-blue-200 min-h-screen overflow-auto">
        <div className="flex items-start justify-between px-8 pt-8 pb-5">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h1>
              {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {selectedUser && (
              <div className="flex items-center gap-3 bg-white/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {selectedUser[0]}
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase leading-none">Admin View</span>
                  <span className="text-sm font-bold text-gray-800">{selectedUser}</span>
                </div>
              </div>
            )}
            {headerRight && <div>{headerRight}</div>}
          </div>
        </div>

      
        <div className="px-8 pb-10">
          {children}
        </div>
      </main>
    </div>
  );
}
