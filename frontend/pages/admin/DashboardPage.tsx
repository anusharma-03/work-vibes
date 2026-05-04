import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../services/apiService';

export function DashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState([
    { label: 'Total Users', value: '0', change: '0%', positive: true },
    { label: 'Reports Today', value: '0', change: '0%', positive: true },
    { label: 'Active Projects', value: '0', change: '0%', positive: true },
    { label: 'Teams', value: '1', change: '0%', positive: true },
  ]);
  const [activity, setActivity] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [users, reports] = await Promise.all([
        apiService.getUsers(),
        apiService.getReports()
      ]);

      // Calculate stats
      const totalUsers = users.length;
      const reportsToday = reports.filter((r: any) => 
        new Date(r.createdAt).toDateString() === new Date().toDateString()
      ).length;
      
      const uniqueProjects = new Set();
      reports.forEach((r: any) => r.projects.forEach((p: any) => uniqueProjects.add(p.name)));

      setStats([
        { label: 'Total Users', value: totalUsers.toString(), change: '+0%', positive: true },
        { label: 'Reports Today', value: reportsToday.toString(), change: '+0%', positive: true },
        { label: 'Active Projects', value: uniqueProjects.size.toString(), change: '+0%', positive: true },
        { label: 'Workspace Health', value: 'Active', change: 'Live', positive: true },
      ]);

      setActivity(reports.slice(0, 5));
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout title="Dashboard" subtitle="Overview of workspace activity and performance">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{isLoading ? '...' : stat.value}</p>
            <p className={`text-xs font-medium mt-1 ${stat.positive ? 'text-emerald-600' : 'text-red-500'}`}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chart (Static for now) */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-gray-900">Status Overview</h3>
            <div className="text-xs text-gray-400">Weekly Activity</div>
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
            {isLoading ? (
              <p className="text-sm text-gray-500 italic">Loading activity...</p>
            ) : activity.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No recent activity found.</p>
            ) : (
              activity.map((item, i) => (
                <div key={item._id} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold shrink-0">
                    {item.userName[0]}
                  </div>
                  <div>
                    <p className="text-xs text-gray-800">
                      <span className="font-semibold">{item.userName}</span> submitted a {item.reportType} report
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
              ))
            )}
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
