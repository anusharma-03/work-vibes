import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';

export function TeamsPage() {
  const teams = [
    { name: 'JS Team', lead: 'Shobhit', members: ['Shobhit', 'Uday', 'Pardeep', 'Monika', 'Prince Raj', 'Nitin'], projects: 18 },
    { name: 'Mobile Team', lead: 'Alex Brown', members: ['Alex Brown', 'Emma Wilson', 'Mike J'], projects: 5 },
    { name: 'Design Team', lead: 'Sarah Smith', members: ['Sarah Smith', 'John Doe'], projects: 3 },
  ];

  const headerRight = (
    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
      New Team
    </button>
  );

  return (
    <AdminLayout title="Teams" subtitle="Manage and organize your project teams" headerRight={headerRight}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">S.No</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Team Name</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Lead</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Members</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Projects</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {teams.map((team, i) => (
              <tr key={i} className="hover:bg-gray-50/70 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-400">{i + 1}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{team.name}</td>
                <td className="px-6 py-4 text-sm text-blue-600">{team.lead}</td>
                <td className="px-6 py-4">
                  <div className="flex -space-x-1.5">
                    {team.members.slice(0, 5).map((m, mi) => (
                      <div key={mi} title={m} className="w-7 h-7 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-blue-700">
                        {m[0]}
                      </div>
                    ))}
                    {team.members.length > 5 && (
                      <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-500">
                        +{team.members.length - 5}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{team.projects} projects</td>
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
          <p className="text-sm text-gray-500">Showing 1 to 3 of 3</p>
          <div className="flex items-center gap-1">
            <button className="p-1.5 text-gray-400 disabled:opacity-30" disabled>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <span className="px-3 py-1 text-sm text-gray-600 font-medium">Page 1 of 1</span>
            <button className="p-1.5 text-gray-400 disabled:opacity-30" disabled>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
