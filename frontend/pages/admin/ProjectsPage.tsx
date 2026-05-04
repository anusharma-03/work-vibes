import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';

export function ProjectsPage() {
  const projects = [
    { name: 'Joel', client: 'JS Team', team: 'Shobhit', progress: 80, status: 'On Track' },
    { name: 'Loveable clone', client: 'JS Team', team: 'Shobhit', progress: 60, status: 'On Track' },
    { name: 'Inhouse-Backend', client: 'JS Team', team: 'Uday', progress: 35, status: 'At Risk' },
    { name: 'Archer', client: 'JS Team', team: 'Pardeep', progress: 100, status: 'Completed' },
    { name: 'Brett', client: 'JS Team', team: 'Monika', progress: 50, status: 'On Track' },
    { name: 'Zenova', client: 'JS Team', team: 'Nitin', progress: 20, status: 'At Risk' },
  ];

  const headerRight = (
    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
      New Project
    </button>
  );

  return (
    <AdminLayout title="Projects" subtitle="Manage and track all active projects" headerRight={headerRight}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">S.No</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Project</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Team</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Lead</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Progress</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {projects.map((project, i) => (
              <tr key={i} className="hover:bg-gray-50/70 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-400">{i + 1}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{project.name}</td>
                <td className="px-6 py-4 text-sm text-blue-600">{project.client}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{project.team}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${project.progress === 100 ? 'bg-emerald-500' : project.status === 'At Risk' ? 'bg-red-400' : 'bg-blue-500'}`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-8 shrink-0">{project.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                    project.status === 'On Track' ? 'bg-emerald-50 text-emerald-700' :
                    project.status === 'At Risk' ? 'bg-red-50 text-red-600' :
                    'bg-blue-50 text-blue-700'
                  }`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end items-center gap-3">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors" title="Edit">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
                    </button>
                    <button className="text-red-400 hover:text-red-600 transition-colors" title="Delete">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="px-6 py-3.5 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">Showing 1 to 6 of 24</p>
          <div className="flex items-center gap-1">
            <button className="p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-30" disabled>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <span className="px-3 py-1 text-sm text-gray-600 font-medium">Page 1 of 4</span>
            <button className="p-1.5 text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
