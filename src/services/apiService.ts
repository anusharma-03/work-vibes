import axios from 'axios';

// Use environment variable with fallback to local API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create a configured axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Response Interceptor: Centralized error handling and response unwrapping
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export const apiService = {
  submitReport: async (reportData: any) => {
    return await apiClient.post('/reports', reportData);
  },

  getReports: async () => {
    return await apiClient.get('/reports');
  },

  getUsers: async () => {
    return await apiClient.get('/users');
  },

  addUser: async (userData: { name: string; group?: string; team?: string; projects?: string[] }) => {
    return await apiClient.post('/users', userData);
  },
  updateUser: async (id: string, userData: { name: string; group?: string; team?: string; projects?: string[] }) => {
    return await apiClient.put(`/users/${id}`, userData);
  },
  deleteUser: async (id: string) => {
    return await apiClient.delete(`/users/${id}`);
  },
  getProjects: async () => {
    return await apiClient.get('/projects');
  },
  getProject: async (id: string) => {
    return await apiClient.get(`/projects/${id}`);
  },
  addProject: async (projectData: { name: string; account: string; trackingUrl?: string }) => {
    return await apiClient.post('/projects', projectData);
  },
  updateProject: async (id: string, projectData: any) => {
    return await apiClient.put(`/projects/${id}`, projectData);
  },
  deleteProject: async (id: string) => {
    return await apiClient.delete(`/projects/${id}`);
  },

  getTeams: async () => {
    return await apiClient.get('/teams');
  },
  addTeam: async (teamData: { name: string; users?: string[]; technologies?: string[] }) => {
    return await apiClient.post('/teams', teamData);
  },
  getSettings: async () => {
    return await apiClient.get('/settings');
  },
  updateSetting: async (key: string, value: any) => {
    return await apiClient.post('/settings', { key, value });
  },
  getCommits: async (params: { repoUrl: string; account: string; date: string }) => {
    return await apiClient.get('/github/commits', { params });
  }
};
