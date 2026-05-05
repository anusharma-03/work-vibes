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

// Request Interceptor: Attach tokens or other common headers here
apiClient.interceptors.request.use(
  (config) => {
    // Example: Attach an authorization token if available
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Centralized error handling and response unwrapping
apiClient.interceptors.response.use(
  (response) => {
    // Automatically return response.data to match the original API signature
    return response.data;
  },
  (error) => {
    console.error('API Error:', error.response?.data?.message || error.message);
    // You can handle global errors here (e.g., redirect to login on 401)
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

  addUser: async (userData: { name: string; role?: string; email?: string }) => {
    return await apiClient.post('/users', userData);
  },

  getProjects: async () => {
    return await apiClient.get('/projects');
  },

  addProject: async (projectData: { name: string; client: string; team: string; progress: number; status: string }) => {
    return await apiClient.post('/projects', projectData);
  }
};
