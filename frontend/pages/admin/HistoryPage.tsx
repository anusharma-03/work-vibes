import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';

export function HistoryPage({ navigate }: { navigate: (path: string) => void }) {
  const events = [
    { type: 'Update', user: 'John Doe', target: 'Project Alpha', time: '10:45 AM', date: 'May 4, 2026', color: 'indigo' },
    { type: 'Creation', user: 'Sarah Smith', target: 'New Team: Mobile', time: '09:30 AM', date: 'May 4, 2026', color: 'emerald' },
    { type: 'Deletion', user: 'Admin', target: 'Obsolete Project X', time: '05:15 PM', date: 'May 3, 2026', color: 'rose' },
    { type: 'Setting', user: 'Mike Johnson', target: 'System Notifications', time: '02:00 PM', date: 'May 3, 2026', color: 'amber' },
  ];

  return (
    <AdminLayout currentPath="/status/admin/history" navigate={navigate} title="Action History">
      <div className="max-w-4xl">
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
          {events.map((event, i) => (
            <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-800 bg-slate-900 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <svg className="fill-current" viewBox="0 0 12 12" width="12" height="12"><path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z"></path></svg>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl group-hover:border-slate-700 transition-all">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <div className="font-bold text-white">{event.type}</div>
                  <time className="font-mono text-xs text-indigo-500">{event.time}</time>
                </div>
                <div className="text-slate-400 text-sm mb-4">
                  <span className="text-white font-medium">{event.user}</span> performed an action on <span className="text-white font-medium">{event.target}</span>.
                </div>
                <div className="text-xs text-slate-500 font-medium">{event.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
