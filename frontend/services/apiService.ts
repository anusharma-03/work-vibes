import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const apiService = {
  submitReport: async (reportData: any) => {
    try {
      const response = await axios.post(`${API_URL}/reports`, reportData);
      return response.data;
    } catch (error) {
      console.error('Error submitting report:', error);
      throw error;
    }
  },

  getReports: async () => {
    try {
      const response = await axios.get(`${API_URL}/reports`);
      return response.data;
    } catch (error) {
      console.error('Error fetching reports:', error);
      throw error;
    }
  },

  getUsers: async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  addUser: async (userData: { name: string; role?: string; email?: string }) => {
    try {
      const response = await axios.post(`${API_URL}/users`, userData);
      return response.data;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  }
};
