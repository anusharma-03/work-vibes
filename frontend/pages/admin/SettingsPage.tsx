import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';

export function SettingsPage({ navigate }: { navigate: (path: string) => void }) {
  return (
    <AdminLayout currentPath="/status/admin/settings" navigate={navigate} title="Admin Settings">
      <div className="max-w-3xl space-y-8">
        <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-slate-800">
            <h3 className="text-lg font-bold text-white">General Settings</h3>
            <p className="text-sm text-slate-500">Manage your basic admin configurations.</p>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Site Name</label>
                <input type="text" defaultValue="ReportPro" className="w-full bg-slate-800 border-none rounded-xl px-4 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-indigo-600" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Admin Email</label>
                <input type="email" defaultValue="admin@reportpro.com" className="w-full bg-slate-800 border-none rounded-xl px-4 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-indigo-600" />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
              <div>
                <p className="text-sm font-medium text-white">Maintenance Mode</p>
                <p className="text-xs text-slate-500">Temporarily disable public access to the dashboard.</p>
              </div>
              <div className="w-12 h-6 bg-slate-700 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-slate-400 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="p-6 bg-slate-950/50 flex justify-end">
            <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-all">Save Changes</button>
          </div>
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-slate-800">
            <h3 className="text-lg font-bold text-white text-rose-500">Danger Zone</h3>
            <p className="text-sm text-slate-500">Irreversible actions for your admin panel.</p>
          </div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Purge System Logs</p>
              <p className="text-xs text-slate-500">Delete all historical data and activity logs.</p>
            </div>
            <button className="px-4 py-2 border border-rose-500/50 text-rose-500 hover:bg-rose-500 hover:text-white text-sm font-medium rounded-xl transition-all">
              Purge All
            </button>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
