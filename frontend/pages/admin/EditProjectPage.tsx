import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { apiService } from '../../../src/services/apiService';
import toast, { Toaster } from 'react-hot-toast';

export function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [teams, setTeams] = useState<any[]>([]);

  const [project, setProject] = useState<any>({
    name: '',
    account: '',
    client: '',
    status: 'Ongoing',
    description: '',
    notes: '',
    trackingUrl: '',
    projectLink: '',
    teams: [],
    credentials: [],
    documents: {
      client: [],
      company: [],
      self: [],
      milestone: []
    },
    milestones: [],
    technologies: {
      database: '',
      backend: '',
      website: '',
      mobileApp: ''
    }
  });

  useEffect(() => {
    if (id) {
      Promise.all([fetchProject(), fetchTeams()]).finally(() => setIsLoading(false));
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const response: any = await apiService.getProject(id!);
      if (response && response.data) {
        const data = response.data;
        setProject({
          ...data,
          credentials: data.credentials || [],
          milestones: data.milestones || [],
          technologies: data.technologies || {
            database: '',
            backend: '',
            website: '',
            mobileApp: ''
          },
          documents: data.documents || {
            client: [],
            company: [],
            self: [],
            milestone: []
          }
        });
      }
    } catch (error) {
      toast.error('Failed to fetch project details');
      navigate('/admin/projects');
    }
  };

  const fetchTeams = async () => {
    try {
      const data = await apiService.getTeams();
      setTeams(data);
    } catch (error) {
      console.error('Failed to fetch teams');
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await apiService.updateProject(id!, project);
      toast.success('Project settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  // Helper functions for dynamic sections
  const addCredential = () => {
    setProject({
      ...project,
      credentials: [...project.credentials, { name: '', url: '', type: 'login', username: '', password: '', apiKeys: [''], details: '' }]
    });
  };

  const removeCredential = (index: number) => {
    const newCreds = [...project.credentials];
    newCreds.splice(index, 1);
    setProject({ ...project, credentials: newCreds });
  };

  const updateCredential = (index: number, field: string, value: any) => {
    const newCreds = [...project.credentials];
    newCreds[index] = { ...newCreds[index], [field]: value };
    setProject({ ...project, credentials: newCreds });
  };

  const addMilestone = () => {
    setProject({
      ...project,
      milestones: [...project.milestones, { heading: '', tasks: [''] }]
    });
  };

  const updateMilestone = (mIndex: number, field: string, value: any) => {
    const newMilestones = [...project.milestones];
    newMilestones[mIndex] = { ...newMilestones[mIndex], [field]: value };
    setProject({ ...project, milestones: newMilestones });
  };

  const addMilestoneTask = (mIndex: number) => {
    const newMilestones = [...project.milestones];
    newMilestones[mIndex].tasks.push('');
    setProject({ ...project, milestones: newMilestones });
  };

  const updateMilestoneTask = (mIndex: number, tIndex: number, value: string) => {
    const newMilestones = [...project.milestones];
    newMilestones[mIndex].tasks[tIndex] = value;
    setProject({ ...project, milestones: newMilestones });
  };

  const removeMilestone = (index: number) => {
    const newMilestones = [...project.milestones];
    newMilestones.splice(index, 1);
    setProject({ ...project, milestones: newMilestones });
  };

  if (isLoading) {
    return (
      <AdminLayout title="Loading..." subtitle="Fetching project details">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  const headerRight = (
    <div className="flex items-center gap-3">
      <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors">
        View Dashboard
      </button>
      <button 
        onClick={handleSave}
        disabled={isSaving}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-50"
      >
        {isSaving ? 'Saving...' : 'Save Settings'}
      </button>
    </div>
  );

  return (
    <AdminLayout 
      title="Project Settings" 
      subtitle={`Manage configuration for ${project.name}`}
      headerRight={headerRight}
    >
      <Toaster position="top-right" />
      
      <div className="mb-6">
        <Link to="/admin/projects" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back to Projects
        </Link>
      </div>

      <div className="space-y-8 pb-20">
        {/* Basic Information */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-lg font-bold text-gray-800">Basic Information</h3>
          </div>
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Project Name</label>
                <input 
                  value={project.name}
                  onChange={(e) => setProject({...project, name: e.target.value})}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none text-black font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Client Name</label>
                <input 
                  value={project.client}
                  onChange={(e) => setProject({...project, client: e.target.value})}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none text-black font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</label>
                <select 
                  value={project.status}
                  onChange={(e) => setProject({...project, status: e.target.value})}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none text-black font-medium"
                >
                  <option>Live</option>
                  <option>Ongoing</option>
                  <option>Completed</option>
                  <option>On Hold</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">GitHub Repo URL</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                  </div>
                  <input 
                    value={project.trackingUrl}
                    onChange={(e) => setProject({...project, trackingUrl: e.target.value})}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none text-black font-medium"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Project Live Link</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                  </div>
                  <input 
                    value={project.projectLink}
                    onChange={(e) => setProject({...project, projectLink: e.target.value})}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none text-black font-medium"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Description</label>
              <textarea 
                value={project.description}
                onChange={(e) => setProject({...project, description: e.target.value})}
                rows={3}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none resize-none text-black font-medium"
              />
            </div>
          </div>
        </div>

        {/* Credentials */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">Credentials</h3>
            <button 
              onClick={addCredential}
              className="px-4 py-2 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-lg hover:bg-indigo-100 transition-colors"
            >
              Add Credential
            </button>
          </div>
          <div className="p-8 space-y-8">
            {project.credentials.map((cred: any, idx: number) => (
              <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-200 relative group">
                <button 
                  onClick={() => removeCredential(idx)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Credential Name</label>
                    <input 
                      value={cred.name}
                      onChange={(e) => updateCredential(idx, 'name', e.target.value)}
                      placeholder="e.g. Server Login"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-black font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">URL</label>
                    <input 
                      value={cred.url}
                      onChange={(e) => updateCredential(idx, 'url', e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-black font-medium"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <button 
                    onClick={() => updateCredential(idx, 'type', 'login')}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${cred.type === 'login' ? 'bg-blue-600 text-white' : 'bg-white text-gray-500 border border-gray-200'}`}
                  >
                    Credentials
                  </button>
                  <button 
                    onClick={() => updateCredential(idx, 'type', 'api')}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${cred.type === 'api' ? 'bg-blue-600 text-white' : 'bg-white text-gray-500 border border-gray-200'}`}
                  >
                    API Key
                  </button>
                </div>

                {cred.type === 'login' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Username</label>
                      <input 
                        value={cred.username}
                        onChange={(e) => updateCredential(idx, 'username', e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-black font-medium"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Password</label>
                      <input 
                        type="password"
                        value={cred.password}
                        onChange={(e) => updateCredential(idx, 'password', e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-black font-medium"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">API Keys (one per line)</label>
                    <textarea 
                      value={cred.apiKeys?.join('\n')}
                      onChange={(e) => updateCredential(idx, 'apiKeys', e.target.value.split('\n'))}
                      rows={3}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none resize-none"
                    />
                  </div>
                )}
              </div>
            ))}
            {project.credentials.length === 0 && (
              <div className="text-center py-8 text-gray-400 italic">No credentials added yet.</div>
            )}
          </div>
        </div>

        {/* Milestones */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">Milestones</h3>
            <button 
              onClick={addMilestone}
              className="px-4 py-2 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-lg hover:bg-indigo-100 transition-colors"
            >
              Add Milestone
            </button>
          </div>
          <div className="p-8 space-y-8">
            {project.milestones.map((ms: any, mIdx: number) => (
              <div key={mIdx} className="p-6 bg-gray-50 rounded-2xl border border-gray-200 relative group">
                <button 
                  onClick={() => removeMilestone(mIdx)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                </button>
                <div className="mb-6">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">Milestone Heading</label>
                  <input 
                    value={ms.heading}
                    onChange={(e) => updateMilestone(mIdx, 'heading', e.target.value)}
                    placeholder="e.g. Phase 1: Planning & Setup"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none font-bold text-gray-800"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Tasks</label>
                  {ms.tasks.map((task: string, tIdx: number) => (
                    <div key={tIdx} className="flex gap-2">
                      <input 
                        value={task}
                        onChange={(e) => updateMilestoneTask(mIdx, tIdx, e.target.value)}
                        placeholder="Task description..."
                        className="flex-1 px-4 py-2 bg-white border border-gray-100 rounded-lg text-sm outline-none focus:border-blue-500"
                      />
                    </div>
                  ))}
                  <button 
                    onClick={() => addMilestoneTask(mIdx)}
                    className="text-xs text-blue-600 font-bold hover:underline ml-1"
                  >
                    + Add Task
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-lg font-bold text-gray-800">Technologies Used</h3>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Database</label>
              <input 
                value={project.technologies.database}
                onChange={(e) => setProject({...project, technologies: {...project.technologies, database: e.target.value}})}
                placeholder="e.g. MongoDB"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Backend</label>
              <input 
                value={project.technologies.backend}
                onChange={(e) => setProject({...project, technologies: {...project.technologies, backend: e.target.value}})}
                placeholder="e.g. Node.js"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Website</label>
              <input 
                value={project.technologies.website}
                onChange={(e) => setProject({...project, technologies: {...project.technologies, website: e.target.value}})}
                placeholder="e.g. React.js"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Mobile App</label>
              <input 
                value={project.technologies.mobileApp}
                onChange={(e) => setProject({...project, technologies: {...project.technologies, mobileApp: e.target.value}})}
                placeholder="e.g. React Native"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
