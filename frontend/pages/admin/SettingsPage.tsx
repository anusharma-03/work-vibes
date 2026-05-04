import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';

export function SettingsPage() {
  return (
    <AdminLayout title="Settings" subtitle="Configure system-wide admin preferences">
      <div className="max-w-2xl space-y-6">
        {/* General Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">General Settings</h3>
            <p className="text-xs text-gray-500 mt-0.5">Manage your basic admin configurations.</p>
          </div>
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Site Name</label>
                <input
                  type="text"
                  defaultValue="ReportPro"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Admin Email</label>
                <input
                  type="email"
                  defaultValue="admin@reportpro.com"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <p className="text-sm font-medium text-gray-900">Maintenance Mode</p>
                <p className="text-xs text-gray-500 mt-0.5">Temporarily disable public access to the dashboard.</p>
              </div>
              <div className="w-10 h-5 bg-gray-300 rounded-full relative cursor-pointer">
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform" />
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
            <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors">
              Save Changes
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-xl shadow-sm border border-red-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-red-100">
            <h3 className="text-sm font-semibold text-red-600">Danger Zone</h3>
            <p className="text-xs text-gray-500 mt-0.5">Irreversible actions for your admin panel.</p>
          </div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Purge System Logs</p>
              <p className="text-xs text-gray-500 mt-0.5">Delete all historical data and activity logs permanently.</p>
            </div>
            <button className="px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 text-sm font-semibold rounded-lg transition-colors">
              Purge All
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
