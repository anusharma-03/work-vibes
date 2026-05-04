import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';

export function TeamsPage({ navigate }: { navigate: (path: string) => void }) {
  const teams = [
    { name: 'Core Development', lead: 'John Doe', members: 12, projects: 5 },
    { name: 'Creative Design', lead: 'Sarah Smith', members: 8, projects: 3 },
    { name: 'Marketing Ops', lead: 'Emma Wilson', members: 6, projects: 2 },
    { name: 'Quality Assurance', lead: 'Alex Brown', members: 5, projects: 8 },
  ];

  return (
    <AdminLayout currentPath="/status/admin/teams" navigate={navigate} title="Team Management">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white mb-4">Active Teams</h3>
          {teams.map((team, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between hover:bg-slate-800/50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-600/10 rounded-xl flex items-center justify-center text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users-2"><path d="M14 19a6 6 0 0 0-12 0"/><circle cx="8" cy="9" r="4"/><path d="M22 19a6 6 0 0 0-6-6 4 4 0 1 0 0-8"/></svg>
                </div>
                <div>
                  <h4 className="font-bold text-white">{team.name}</h4>
                  <p className="text-xs text-slate-500">Lead: {team.lead}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-300">{team.members} Members</p>
                <p className="text-xs text-slate-500">{team.projects} Projects</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center text-slate-500 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Build Your Team</h3>
          <p className="text-slate-500 text-sm max-w-xs mb-8">Create a new team, assign a lead and add members to start collaborating on projects.</p>
          <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-indigo-600/20">
            Create New Team
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
