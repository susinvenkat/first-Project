import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/backend';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const api = {
  // Authentication
  login: async (username, password, remember = false) => {
    const response = await apiClient.post('/auth/login.php', {
      username,
      password,
      remember,
    });
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.get('/auth/logout.php');
    return response.data;
  },

  checkSession: async () => {
    const response = await apiClient.get('/auth/check_session.php');
    return response.data;
  },

  register: async (userData) => {
    const response = await apiClient.post('/auth/register.php', userData);
    return response.data;
  },

  // Career Applications
  submitApplication: async (formData) => {
    const response = await apiClient.post('/api/submit_application.php', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getApplications: async () => {
    const response = await apiClient.get('/api/get_applications.php');
    return response.data;
  },

  // Contact
  submitContact: async (contactData) => {
    const response = await apiClient.post('/api/contact.php', contactData);
    return response.data;
  },
};

export default api;
