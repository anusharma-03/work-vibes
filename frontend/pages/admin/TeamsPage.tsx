import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { apiService } from '../../../src/services/apiService';
import toast, { Toaster } from 'react-hot-toast';

export function TeamsPage() {
  const [teams, setTeams] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [technologies, setTechnologies] = useState(''); // Comma separated

  useEffect(() => {
    Promise.all([fetchTeams(), fetchUsers()]).finally(() => setIsLoading(false));
  }, []);

  const fetchTeams = async () => {
    try {
      const data = await apiService.getTeams();
      setTeams(data);
    } catch (error) {
      toast.error('Failed to fetch teams');
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await apiService.getUsers();
      setUsers(data);
    } catch (error) {
      toast.error('Failed to fetch users');
    }
  };

  const handleAddTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      toast.error('Team Name is required');
      return;
    }

    setIsAdding(true);
    try {
      await apiService.addTeam({
        name,
        users: selectedUsers,
        technologies: technologies.split(',').map(t => t.trim()).filter(Boolean)
      });
      toast.success('Team added successfully');
      setName('');
      setSelectedUsers([]);
      setTechnologies('');
      setShowAddModal(false);
      fetchTeams();
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Failed to add team';
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
      New Team
    </button>
  );

  return (
    <AdminLayout title="Teams" subtitle="Manage and organize your project teams" headerRight={headerRight}>
      <Toaster position="top-right" />
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-gray-500">Loading teams...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">S.No</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Team Name</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Users</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Technologies</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {teams.map((team, i) => (
                <tr key={team._id || i} className="hover:bg-gray-50/70 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-400">{i + 1}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{team.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex -space-x-1.5">
                      {team.users?.slice(0, 5).map((m: any, mi: number) => (
                        <div key={mi} title={m.name || m} className="w-7 h-7 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-blue-700">
                          {(m.name || m)[0]}
                        </div>
                      ))}
                      {team.users?.length > 5 && (
                        <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-500">
                          +{team.users.length - 5}
                        </div>
                      )}
                      {(!team.users || team.users.length === 0) && <span className="text-sm text-gray-500">None</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex flex-wrap gap-1">
                      {team.technologies?.map((tech: string, ti: number) => (
                        <span key={ti} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                          {tech}
                        </span>
                      ))}
                      {(!team.technologies || team.technologies.length === 0) && 'None'}
                    </div>
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
              {teams.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">No teams found. Create your first team!</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Team Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">Add New Team</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleAddTeam} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Team Name *</label>
                <input
                  autoFocus
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Frontend Ninjas"
                  className="w-full px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Users (multi-select)</label>
                <select
                  multiple
                  value={selectedUsers}
                  onChange={(e) => {
                    const options = Array.from(e.target.selectedOptions);
                    setSelectedUsers(options.map(o => o.value));
                  }}
                  className="w-full px-4 py-2 bg-gray-50 border text-gray-700 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all min-h-[100px]"
                >
                  {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Technologies (comma separated)</label>
                <input
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value)}
                  placeholder="e.g. React, Node.js, MongoDB"
                  className="w-full px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
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
                  {isAdding ? 'Adding...' : 'Create Team'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
