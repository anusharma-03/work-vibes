import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useNavigate } from 'react-router-dom';

export function DashboardPage() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Users', value: '1,284', change: '+12%', positive: true },
    { label: 'Active Projects', value: '42', change: '+5%', positive: true },
    { label: 'Team Members', value: '156', change: '+8%', positive: true },
    { label: 'Avg. Reports/Day', value: '89', change: '-2%', positive: false },
  ];

  const activity = [
    { user: 'Shobhit', action: 'submitted a status report', project: 'Loveable clone', time: '2m ago' },
    { user: 'Uday', action: 'submitted a status report', project: 'Inhouse-Backend', time: '15m ago' },
    { user: 'Pardeep', action: 'submitted a status report', project: 'Archer', time: '32m ago' },
    { user: 'Monika', action: 'submitted a status report', project: 'Brett', time: '1h ago' },
  ];

  return (
    <AdminLayout title="Dashboard" subtitle="Overview of workspace activity and performance">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
            <p className={`text-xs font-medium mt-1 ${stat.positive ? 'text-emerald-600' : 'text-red-500'}`}>
              {stat.change} this week
            </p>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-gray-900">Status Overview</h3>
            <select className="text-xs text-gray-500 border border-gray-200 rounded-md px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500 bg-white">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-52 flex items-end gap-2">
            {[40, 65, 45, 90, 55, 75, 85].map((h, i) => (
              <div key={i} className="flex-1 bg-gray-100 rounded-t-md relative group">
                <div
                  className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t-md transition-all duration-500 group-hover:bg-blue-600"
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 text-[11px] text-gray-400 font-medium">
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => <span key={d}>{d}</span>)}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {activity.map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold shrink-0">
                  {item.user[0]}
                </div>
                <div>
                  <p className="text-xs text-gray-800">
                    <span className="font-semibold">{item.user}</span> {item.action} on{' '}
                    <span className="text-blue-600">{item.project}</span>
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/status/admin/history')}
            className="w-full mt-5 py-2 text-xs font-semibold text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
          >
            View All Activity
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
