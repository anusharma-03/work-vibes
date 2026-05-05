import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { apiService } from '../../../src/services/apiService';
import toast, { Toaster } from 'react-hot-toast';

export function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Add/Edit Modal State
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  
  // Form State
  const [userName, setUserName] = useState('');
  const [userGroup, setUserGroup] = useState('');
  const [userTeam, setUserTeam] = useState('');
  const [userProjects, setUserProjects] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    Promise.all([fetchUsers(), fetchTeamsAndProjects()]).finally(() => setIsLoading(false));
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await apiService.getUsers();
      setUsers(data);
    } catch (error) {
      toast.error('Failed to fetch users');
    }
  };

  const fetchTeamsAndProjects = async () => {
    try {
      const [teamsData, projectsData] = await Promise.all([
        apiService.getTeams(),
        apiService.getProjects()
      ]);
      setTeams(teamsData);
      setProjects(projectsData);
    } catch (error) {
      console.error('Failed to fetch teams/projects');
    }
  };

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentUserId(null);
    setUserName('');
    setUserGroup('');
    setUserTeam('');
    setUserProjects([]);
    setShowModal(true);
  };

  const openEditModal = (user: any) => {
    setIsEditing(true);
    setCurrentUserId(user._id);
    setUserName(user.name);
    setUserGroup(user.group || '');
    setUserTeam(user.team?._id || '');
    setUserProjects(user.projects?.map((p: any) => p._id) || []);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName) {
      toast.error('Name is required');
      return;
    }

    setIsSubmitting(true);
    try {
      const userData = {
        name: userName,
        group: userGroup,
        team: userTeam || undefined,
        projects: userProjects
      };

      if (isEditing && currentUserId) {
        await apiService.updateUser(currentUserId, userData);
        toast.success('User updated successfully');
      } else {
        await apiService.addUser(userData);
        toast.success('User added successfully');
      }
      
      setShowModal(false);
      fetchUsers();
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Failed to save user';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!userToDelete) return;

    setIsDeleting(true);
    try {
      await apiService.deleteUser(userToDelete._id);
      toast.success('User deleted successfully');
      setShowDeleteModal(false);
      setUserToDelete(null);
      fetchUsers();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete user');
    } finally {
      setIsDeleting(false);
    }
  };

  const headerRight = (
    <button
      onClick={openAddModal}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
      Add User
    </button>
  );

  return (
    <AdminLayout
      title="User Management"
      subtitle="Manage team members and their roles"
      headerRight={headerRight}
    >
      <Toaster position="top-right" />

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-6">
        {isLoading ? (
          <div className="p-12 text-center text-gray-500">Loading users...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-16">S.No</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Team</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Projects</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user, i) => (
                <tr key={user._id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-400">{i + 1}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    <div>{user.name}</div>
                    {user.group && <div className="text-xs text-gray-500 font-normal">{user.group}</div>}
                  </td>
                  <td className="px-6 py-4 text-sm text-blue-600 font-medium">{user.team?.name || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex flex-wrap gap-1">
                      {user.projects?.length > 0 ? (
                        user.projects.map((p: any) => (
                          <span key={p._id} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md text-[10px] font-bold uppercase tracking-tight">
                            {p.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 italic">None</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-3">
                      <button 
                        onClick={() => openEditModal(user)}
                        className="text-gray-400 hover:text-blue-600 transition-colors" 
                        title="Edit"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
                      </button>
                      <button 
                        onClick={() => {
                          setUserToDelete(user);
                          setShowDeleteModal(true);
                        }}
                        className="text-gray-400 hover:text-red-600 transition-colors" 
                        title="Delete"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">No users found. Add some team members!</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit User Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="max-w-xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-800">{isEditing ? 'Edit User' : 'Add User'}</h2>
                <p className="text-xs text-slate-500 mt-0.5">Configure team member details and access</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  autoFocus
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-2.5 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Group</label>
                <input
                  value={userGroup}
                  onChange={(e) => setUserGroup(e.target.value)}
                  placeholder="e.g. MERN Stack Development"
                  className="w-full px-4 py-2.5 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Team</label>
                  <select
                    value={userTeam}
                    onChange={(e) => setUserTeam(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all cursor-pointer"
                  >
                    <option value="">Select Team</option>
                    {teams.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
                  </select>
                </div>
                
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Projects</label>
                  <div className="relative group">
                    <select
                      multiple
                      value={userProjects}
                      onChange={(e) => {
                        const options = Array.from(e.target.selectedOptions);
                        setUserProjects(options.map(o => o.value));
                      }}
                      className="w-full px-4 py-2.5 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all min-h-[100px] text-sm"
                    >
                      {projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                    </select>
                    <p className="text-[10px] text-slate-400 mt-1 italic">Hold Ctrl/Cmd to select multiple</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2.5 bg-white text-slate-600 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : isEditing ? 'Update User' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
            </div>
            <h3 className="text-xl font-bold text-center text-slate-800 mb-2">Delete User</h3>
            <p className="text-sm text-center text-slate-500 mb-8">
              Are you sure you want to delete <span className="font-bold text-slate-700">{userToDelete?.name}</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors"
              >
                No, Keep
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 shadow-lg shadow-red-500/20 transition-all active:scale-95 disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
