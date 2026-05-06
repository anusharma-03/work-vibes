import React, { useState, useEffect } from 'react';
import { StatusHeader } from '../components/StatusHeader';
import { StatusSidebar } from '../components/StatusSidebar';
import { UserSelectionModal } from '../components/UserSelectionModal';
import { ProjectAutocomplete } from '../components/ProjectAutocomplete';
import { apiService } from '../../src/services/apiService';
import toast, { Toaster } from 'react-hot-toast';

export function StatusWebPage({ navigate }: { navigate?: (path: string) => void }) {
  const [showModal, setShowModal] = useState(!localStorage.getItem('selectedUser'));
  const [userName, setUserName] = useState(localStorage.getItem('selectedUser') || '');
  const [reportType, setReportType] = useState('SOD');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [projects, setProjects] = useState([{ name: '', tasks: [''] }]);
  const [availableProjects, setAvailableProjects] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchAvailableProjects();
  }, []);

  const fetchAvailableProjects = async () => {
    try {
      const data = await apiService.getProjects();
      setAvailableProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const handleUserConfirm = (name: string) => {
    setUserName(name);
    localStorage.setItem('selectedUser', name);
    setShowModal(false);
  };

  const addProject = () => {
    setProjects([...projects, { name: '', tasks: [''] }]);
  };

  const addTask = (projectIndex: number) => {
    const newProjects = [...projects];
    newProjects[projectIndex].tasks.push('');
    setProjects(newProjects);
  };

  const updateProjectName = (index: number, name: string) => {
    const newProjects = [...projects];
    newProjects[index].name = name;
    setProjects(newProjects);
  };

  const handleManualFetch = (index: number) => {
    const projectName = projects[index].name;
    const selectedProject = availableProjects.find(p => p.name === projectName);
    if (selectedProject && selectedProject.trackingUrl) {
      fetchAndPopulateCommits(index, selectedProject);
    } else {
      toast.error('No tracking URL found for this project');
    }
  };

  const fetchAndPopulateCommits = async (pIndex: number, project: any) => {
    try {
      const commits: any = await apiService.getCommits({
        repoUrl: project.trackingUrl,
        account: project.account,
        date: date
      });

      if (commits && commits.length > 0) {
        const newProjects = [...projects];
        // Only replace tasks if they are empty or just have one empty task
        if (newProjects[pIndex].tasks.length === 1 && !newProjects[pIndex].tasks[0]) {
          newProjects[pIndex].tasks = commits;
        } else {
          // Otherwise append them
          newProjects[pIndex].tasks = [...newProjects[pIndex].tasks.filter(t => t), ...commits];
        }
        setProjects(newProjects);
        toast.success(`Fetched ${commits.length} commits for ${project.name}`);
      } else {
        toast.error(`No commits found for ${project.name} on ${date}`);
      }
    } catch (error: any) {
      console.error('Failed to fetch commits:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch commits');
    }
  };

  const updateTaskValue = (pIndex: number, tIndex: number, value: string) => {
    const newProjects = [...projects];
    newProjects[pIndex].tasks[tIndex] = value;
    setProjects(newProjects);
  };

  const removeTask = (pIndex: number, tIndex: number) => {
    const newProjects = [...projects];
    if (newProjects[pIndex].tasks.length > 1) {
      newProjects[pIndex].tasks.splice(tIndex, 1);
      setProjects(newProjects);
    }
  };

  const handleSubmit = async () => {
    if (!userName) {
      toast.error('Please select a user first');
      setShowModal(true);
      return;
    }

    if (projects.some(p => !p.name || p.tasks.some(t => !t))) {
      toast.error('Please fill in all project and task details');
      return;
    }

    setIsSubmitting(true);
    try {
      await apiService.submitReport({
        userName,
        reportType,
        date,
        projects
      });
      toast.success('Status report submitted successfully!');
      // Reset form or redirect
    } catch (error) {
      toast.error('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateLivePreview = () => {
    let preview = `*${reportType} | ${date}*\n*Name:* ${userName || '---'}\n\n`;
    projects.forEach((p, i) => {
      preview += `*Project:* ${p.name || '---'}\n`;
      p.tasks.forEach((t, j) => {
        preview += `- ${t || '---'}\n`;
      });
      if (i < projects.length - 1) preview += '\n';
    });
    return preview;
  };

  const copyToClipboard = async () => {
    const text = generateLivePreview();

    try {
      // Primary method: Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success('Copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
        return;
      }
      throw new Error('Clipboard API unavailable');
    } catch (err) {
      // Fallback method: execCommand('copy')
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;

        // Ensure the textarea is not visible
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '0';
        document.body.appendChild(textArea);

        textArea.focus();
        textArea.select();

        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);

        if (successful) {
          setCopied(true);
          toast.success('Copied to clipboard!');
          setTimeout(() => setCopied(false), 2000);
        } else {
          toast.error('Unable to copy text');
        }
      } catch (fallbackErr) {
        console.error('Copy fallback failed:', fallbackErr);
        toast.error('Failed to copy text');
      }
    }
  };

  return (
    <div className="status-page-wrapper">
      <Toaster position="top-right" />
      <div className="min-h-screen pb-12">
        <StatusHeader
          navigate={navigate}
          userName={userName}
          onChangeUser={() => {
            localStorage.removeItem('selectedUser');
            setShowModal(true);
          }}
        />

        <main className="max-w-[88%] mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="space-y-6">
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="group flex justify-between items-start">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">General Info</h2>
                <button
                  onClick={() => {
                    setProjects([{ name: '', tasks: [''] }]);
                    setReportType('SOD');
                  }}
                  className="text-rose-600 hover:text-rose-700 font-medium text-sm transition-all opacity-0 group-hover:opacity-100"
                >
                  Clear
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Report Type</label>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                  >
                    <option value="SOD">SOD (Start of Day)</option>
                    <option value="EOD">EOD (End of Day)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Date</label>
                  <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                    type="date"
                  />
                </div>
              </div>
            </section>

            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Projects & Tasks</h2>
                <button
                  onClick={addProject}
                  className="flex items-center gap-1 text-rose-600 hover:text-rose-700 font-medium text-sm transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-plus" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 12h8"></path>
                    <path d="M12 8v8"></path>
                  </svg>
                  Add Project
                </button>
              </div>
              <div className="space-y-8">
                {projects.map((project, pIndex) => (
                  <div key={pIndex} className="relative group border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-400 uppercase">Project Name</label>
                        <ProjectAutocomplete
                          value={project.name}
                          onChange={(name) => updateProjectName(pIndex, name)}
                          onFetchGitHub={() => handleManualFetch(pIndex)}
                          projects={availableProjects}
                          placeholder="Search or enter project name..."
                          hasTrackingUrl={!!availableProjects.find(p => p.name === project.name)?.trackingUrl}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase">Tasks</label>
                        <div className="space-y-3">
                          {project.tasks.map((task, tIndex) => (
                            <div key={tIndex} className="flex gap-2">
                              <div className="mt-2.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-circle-check ${task ? 'text-rose-500' : 'text-gray-300'}`} aria-hidden="true">
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <path d="m9 12 2 2 4-4"></path>
                                </svg>
                              </div>
                              <textarea
                                value={task}
                                onChange={(e) => updateTaskValue(pIndex, tIndex, e.target.value)}
                                placeholder="What did you work on?"
                                rows={1}
                                className="w-full bg-transparent border-b border-gray-100 text-gray-700 focus:border-rose-400 focus:outline-none resize-none overflow-hidden min-h-[36px] break-all"
                              />
                              <button
                                onClick={() => removeTask(pIndex, tIndex)}
                                className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-1 rounded transition-colors"
                                title="Remove Task"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2" aria-hidden="true">
                                  <path d="M10 11v6"></path>
                                  <path d="M14 11v6"></path>
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                                  <path d="M3 6h18"></path>
                                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={() => addTask(pIndex)}
                          className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md transition-colors mt-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus" aria-hidden="true">
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                          </svg>
                          Add Task
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-rose-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-rose-700 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send">
                    <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                    <path d="m21.854 2.147-10.94 10.939"></path>
                  </svg>
                  Generate & Send Status
                </>
              )}
            </button> */}
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            <section className="bg-gray-900 p-6 rounded-2xl shadow-xl text-gray-100 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send" aria-hidden="true">
                  <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                  <path d="m21.854 2.147-10.94 10.939"></path>
                </svg>
              </div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-rose-400">Live Preview</h2>
                <button
                  onClick={copyToClipboard}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-300 ${
                    copied 
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                      : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {copied ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-copy"
                    >
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                  )}
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    {copied ? 'Copied' : 'Copy'}
                  </span>
                </button>
              </div>
              <div className="relative group">
                <div className="bg-gray-800 rounded-xl p-4 font-mono text-sm leading-relaxed text-gray-300 min-h-[400px] whitespace-pre-wrap border border-gray-700 break-all">
                  {generateLivePreview()}
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            <StatusSidebar />
          </div>
        </main>
      </div>

      {showModal && <UserSelectionModal onConfirm={handleUserConfirm} onClose={() => setShowModal(false)} />}
    </div>
  );
}
