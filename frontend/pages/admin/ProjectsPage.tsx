import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';

export function ProjectsPage({ navigate }: { navigate: (path: string) => void }) {
  const projects = [
    { name: 'Project Alpha', client: 'Acme Corp', team: 'Designers', progress: 75, status: 'On Track' },
    { name: 'Beta Mobile App', client: 'Global Tech', team: 'Mobile Team', progress: 40, status: 'At Risk' },
    { name: 'Web Portal v2', client: 'Startup Inc', team: 'Web Devs', progress: 100, status: 'Completed' },
    { name: 'Data Pipeline', client: 'Big Data Co', team: 'Data Eng', progress: 15, status: 'On Track' },
  ];

  return (
    <AdminLayout currentPath="/status/admin/projects" navigate={navigate} title="Project Management">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{project.name}</h3>
                <p className="text-sm text-slate-500">{project.client}</p>
              </div>
              <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                project.status === 'On Track' ? 'bg-emerald-500/10 text-emerald-500' : 
                project.status === 'At Risk' ? 'bg-rose-500/10 text-rose-500' : 'bg-blue-500/10 text-blue-500'
              }`}>
                {project.status}
              </span>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-400 font-medium">Progress</span>
                  <span className="text-white font-bold">{project.progress}%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((u) => (
                    <div key={u} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] text-slate-400 font-bold">
                      {u}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] text-slate-400 font-bold">
                    +2
                  </div>
                </div>
                <p className="text-xs text-slate-500 font-medium">{project.team}</p>
              </div>
            </div>
          </div>
        ))}
        
        <button className="border-2 border-dashed border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 hover:border-slate-700 hover:bg-slate-900/50 transition-all text-slate-500 hover:text-slate-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-circle"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="16"/><line x1="8" x2="16" y1="12" y2="12"/></svg>
          <span className="text-sm font-medium">Create New Project</span>
        </button>
      </div>
    </AdminLayout>
  );
}
