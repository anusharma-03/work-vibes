import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';

export function DashboardPage({ navigate }: { navigate: (path: string) => void }) {
  const stats = [
    { label: 'Total Users', value: '1,284', change: '+12%', icon: 'Users' },
    { label: 'Active Projects', value: '42', change: '+5%', icon: 'Folder' },
    { label: 'Team Members', value: '156', change: '+8%', icon: 'UserCircle' },
    { label: 'Avg. Reports/Day', value: '89', change: '-2%', icon: 'BarChart' },
  ];

  return (
    <AdminLayout currentPath="/status/admin" navigate={navigate} title="Dashboard">
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-800 rounded-xl group-hover:bg-indigo-600/10 group-hover:text-indigo-400 transition-colors">
                  {/* Icon placeholder based on label */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.change.startsWith('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Activity Chart Area */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Status Overview</h3>
              <select className="bg-slate-800 border-none text-sm rounded-lg px-3 py-1 text-slate-300 outline-none focus:ring-2 focus:ring-indigo-600">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
            </div>
            <div className="h-64 flex items-end gap-2 px-2">
              {[40, 65, 45, 90, 55, 75, 85].map((h, i) => (
                <div key={i} className="flex-1 bg-slate-800 rounded-t-lg relative group">
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-indigo-600 rounded-t-lg transition-all duration-500 group-hover:bg-indigo-400"
                    style={{ height: `${h}%` }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 px-2 text-xs text-slate-500 font-medium">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2"></div>
                  <div>
                    <p className="text-sm text-slate-300 font-medium">New report submitted</p>
                    <p className="text-xs text-slate-500">Project Alpha • 2m ago</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 text-sm font-medium text-slate-400 hover:text-white border border-slate-800 rounded-xl hover:bg-slate-800 transition-all">
              View All Activity
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
