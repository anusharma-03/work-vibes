import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';

export function HistoryPage() {
  const events = [
    { user: 'Shobhit', action: 'submitted a status report', target: 'Loveable clone', time: '10:45 AM', date: 'May 4, 2026', type: 'Report' },
    { user: 'Uday', action: 'updated project details', target: 'Inhouse-Backend', time: '09:30 AM', date: 'May 4, 2026', type: 'Update' },
    { user: 'Admin', action: 'created a new team', target: 'Mobile Team', time: '05:15 PM', date: 'May 3, 2026', type: 'Create' },
    { user: 'Pardeep', action: 'submitted a status report', target: 'Archer', time: '02:00 PM', date: 'May 3, 2026', type: 'Report' },
    { user: 'Nitin', action: 'deleted a project', target: 'Old Project X', time: '11:20 AM', date: 'May 3, 2026', type: 'Delete' },
  ];

  const typeColors: Record<string, string> = {
    Report: 'bg-blue-50 text-blue-700',
    Update: 'bg-amber-50 text-amber-700',
    Create: 'bg-emerald-50 text-emerald-700',
    Delete: 'bg-red-50 text-red-600',
  };

  return (
    <AdminLayout title="History" subtitle="Complete log of all administrative actions">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">S.No</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Target</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {events.map((event, i) => (
              <tr key={i} className="hover:bg-gray-50/70 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-400">{i + 1}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{event.user}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{event.action}</td>
                <td className="px-6 py-4 text-sm text-blue-600">{event.target}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${typeColors[event.type]}`}>
                    {event.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 font-mono">{event.time}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{event.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="px-6 py-3.5 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">Showing 1 to 5 of 142</p>
          <div className="flex items-center gap-1">
            <button className="p-1.5 text-gray-400 disabled:opacity-30" disabled>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <span className="px-3 py-1 text-sm text-gray-600 font-medium">Page 1 of 29</span>
            <button className="p-1.5 text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
