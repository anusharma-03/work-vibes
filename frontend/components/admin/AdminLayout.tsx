import React from 'react';
import { AdminSidebar } from './AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  headerRight?: React.ReactNode;
}

export function AdminLayout({ children, title, subtitle, headerRight }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#111827]">
      <AdminSidebar />

      <main className="flex-1 bg-gradient-to-br from-sky-100 via-blue-100 to-blue-200 min-h-screen overflow-auto">
       
        <div className="flex items-start justify-between px-8 pt-8 pb-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h1>
            {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          {headerRight && <div>{headerRight}</div>}
        </div>

      
        <div className="px-8 pb-10">
          {children}
        </div>
      </main>
    </div>
  );
}
