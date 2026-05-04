import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';

export function UsersPage({ navigate }: { navigate: (path: string) => void }) {
  const users = [
    { name: 'John Doe', email: 'john@example.com', role: 'Developer', status: 'Active', avatar: 'J' },
    { name: 'Sarah Smith', email: 'sarah@example.com', role: 'Designer', status: 'Active', avatar: 'S' },
    { name: 'Mike Johnson', email: 'mike@example.com', role: 'Manager', status: 'Inactive', avatar: 'M' },
    { name: 'Emma Wilson', email: 'emma@example.com', role: 'Developer', status: 'Active', avatar: 'E' },
    { name: 'Alex Brown', email: 'alex@example.com', role: 'QA', status: 'Pending', avatar: 'A' },
  ];

  return (
    <AdminLayout currentPath="/status/admin/users" navigate={navigate} title="User Management">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-64">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input 
              type="text" 
              placeholder="Search users..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border-none rounded-xl text-sm text-slate-200 placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <button className="w-full sm:w-auto px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-all shadow-lg shadow-indigo-600/20">
            Add New User
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {users.map((user, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-indigo-400 font-bold border border-slate-700">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-300">{user.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                      user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 
                      user.status === 'Inactive' ? 'bg-slate-700 text-slate-400' : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-slate-500 hover:text-white transition-colors" title="Edit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-edit-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
                      </button>
                      <button className="p-2 text-slate-500 hover:text-rose-500 transition-colors" title="Delete">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 border-t border-slate-800 flex justify-between items-center">
          <p className="text-xs text-slate-500">Showing 5 of 1,284 users</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-lg bg-slate-800 text-slate-400 text-xs font-medium hover:text-white disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 rounded-lg bg-slate-800 text-slate-400 text-xs font-medium hover:text-white">Next</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
