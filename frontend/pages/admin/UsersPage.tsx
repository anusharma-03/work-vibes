import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useNavigate } from 'react-router-dom';

export function UsersPage() {
  const navigate = useNavigate();

  const users = [
    { name: 'Shobhit', team: 'JS Team', projects: 'Joel, Krunk, Tellie, Chelvis, Joseph, Kai, Loveable clone' },
    { name: 'Uday', team: 'JS Team', projects: 'Noora, Mathiesen, Nathaniel, Inhouse-Backend, Inhouse-backend, Jace-R, Kai' },
    { name: 'Pardeep', team: 'JS Team', projects: 'Archer, Joeri' },
    { name: 'Monika', team: 'JS Team', projects: 'Brett' },
    { name: 'Prince Raj', team: 'JS Team', projects: 'Benisa, Angelia, Mario, Christian G' },
    { name: 'Nitin', team: 'JS Team', projects: 'Akinsola, Chelvis, Zenova' },
  ];

  const headerRight = (
    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
      Add User
    </button>
  );

  return (
    <AdminLayout
      title="User Management"
      subtitle="Manage team members (teams table)"
      headerRight={headerRight}
    >
      {/* Search */}
      <div className="mb-4">
        <div className="relative max-w-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            type="text"
            placeholder="Search by name, team or project..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">S.No</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Team</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Projects</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user, i) => (
              <tr key={i} className="hover:bg-gray-50/70 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-400">{i + 1}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{user.name}</td>
                <td className="px-6 py-4 text-sm text-blue-600">{user.team}</td>
                <td className="px-6 py-4 text-sm text-blue-500">{user.projects}</td>
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

        {/* Pagination */}
        <div className="px-6 py-3.5 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">Showing 1 to 6 of 18</p>
          <div className="flex items-center gap-1">
            <button className="p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed" disabled>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <span className="px-3 py-1 text-sm text-gray-600 font-medium">Page 1 of 3</span>
            <button className="p-1.5 text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
