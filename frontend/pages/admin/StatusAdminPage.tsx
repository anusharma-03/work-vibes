// @ts-nocheck
import React from 'react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { AdminLoginForm } from '../../components/admin/AdminLoginForm';

import { Toaster } from 'react-hot-toast';

export function StatusAdminPage({ navigate }: { navigate?: (path: string) => void }) {
  React.useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    if (isAdminLoggedIn) {
      navigate?.('/status/admin');
    }
  }, [navigate]);

  return (
    <div className="status-page-wrapper">
      <Toaster position="top-right" />
      <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
        <div className="w-full max-w-md">
          <div className="bg-slate-800 rounded-2xl shadow-xl border border-slate-700 overflow-hidden">
            <AdminHeader />
            <AdminLoginForm navigate={navigate} />
          </div>
          <p className="text-center text-slate-500 text-xs mt-6">Admin panel</p>
        </div>
      </div>
    </div>
  );
}

