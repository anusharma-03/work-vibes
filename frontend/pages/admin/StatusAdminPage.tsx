// @ts-nocheck
import React from 'react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { AdminLoginForm } from '../../components/admin/AdminLoginForm';

export function StatusAdminPage({ navigate }: { navigate?: (path: string) => void }) {
  return (
    <div className="status-page-wrapper">
      <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
        <div className="w-full max-w-md">
          <div className="bg-slate-800 rounded-2xl shadow-xl border border-slate-700 overflow-hidden">
            <AdminHeader />
            <AdminLoginForm navigate={navigate} />
          </div>
          <p className="text-center text-slate-500 text-xs mt-6">Admin panel</p>
        </div>
      </div>
      <div data-rht-toaster="" style={{ position: 'fixed', zIndex: '9999', inset: '16px', pointerEvents: 'none' }}></div>
    </div>
  );
}

