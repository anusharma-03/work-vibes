import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { apiService } from '../../../src/services/apiService';
import toast, { Toaster } from 'react-hot-toast';

export function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [client, setClient] = useState('');
  const [team, setTeam] = useState('');
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('On Track');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await apiService.getProjects();
      setProjects(data);
    } catch (error) {
      toast.error('Failed to fetch projects');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !client || !team) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsAdding(true);
    try {
      await apiService.addProject({
        name,
        client,
        team,
        progress: Number(progress),
        status
      });
      toast.success('Project added successfully');
      setName('');
      setClient('');
      setTeam('');
      setProgress(0);
      setStatus('On Track');
      setShowAddModal(false);
      fetchProjects();
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Failed to add project';
      toast.error(message);
    } finally {
      setIsAdding(false);
    }
  };

  const headerRight = (
    <button
      onClick={() => setShowAddModal(true)}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
      New Project
    </button>
  );

  return (
    <AdminLayout title="Projects" subtitle="Manage and track all active projects" headerRight={headerRight}>
      <Toaster position="top-right" />
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-gray-500">Loading projects...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">S.No</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Project</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Lead</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {projects.map((project, i) => (
                <tr key={project._id || i} className="hover:bg-gray-50/70 transition-colors">
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
                      project.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
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
              {projects.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">No projects found. Create your first project!</td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {!isLoading && projects.length > 0 && (
          <div className="px-6 py-3.5 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">Showing 1 to {projects.length} of {projects.length}</p>
            <div className="flex items-center gap-1">
              <button className="p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-30" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <span className="px-3 py-1 text-sm text-gray-600 font-medium">Page 1 of 1</span>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-30" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">Add New Project</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleAddProject} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Project Name</label>
                <input
                  autoFocus
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Website Redesign"
                  className="w-full px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Client Name</label>
                <input
                  required
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  placeholder="e.g. Acme Corp"
                  className="w-full px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Team Lead</label>
                <input
                  required
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Progress (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={progress}
                    onChange={(e) => setProgress(Number(e.target.value))}
                    className="w-full px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 border text-gray-700 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  >
                    <option value="On Track">On Track</option>
                    <option value="At Risk">At Risk</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAdding}
                  className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50"
                >
                  {isAdding ? 'Adding...' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
