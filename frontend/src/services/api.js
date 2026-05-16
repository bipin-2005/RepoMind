import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Repository API
export const repositoryAPI = {
  // Analyze repository
  analyze: async (data) => {
    const response = await api.post('/repository/analyze', data);
    return response.data;
  },

  // Get repository by ID
  getById: async (id) => {
    const response = await api.get(`/repository/${id}`);
    return response.data;
  },

  // Get all repositories
  getAll: async () => {
    const response = await api.get('/repository');
    return response.data;
  },

  // Upload repository ZIP
  uploadZip: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/repository/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Generate README
  generateReadme: async (id) => {
    const response = await api.post(`/repository/${id}/generate-readme`);
    return response.data;
  },
};

// Documentation API
export const documentationAPI = {
  // Generate README
  generateReadme: async (repositoryId) => {
    const response = await api.post('/documentation/generate', { repositoryId });
    return response.data;
  },

  // Generate API docs
  generateApiDocs: async (repositoryId) => {
    const response = await api.post('/documentation/api-docs', { repositoryId });
    return response.data;
  },

  // Get documentation
  getDocumentation: async (repositoryId) => {
    const response = await api.get(`/documentation/${repositoryId}`);
    return response.data;
  },
};

// Test API
export const testAPI = {
  // Generate unit tests
  generateTests: async (repositoryId, options) => {
    const response = await api.post('/test/generate', { repositoryId, ...options });
    return response.data;
  },

  // Get test coverage
  getCoverage: async (repositoryId) => {
    const response = await api.get(`/test/coverage/${repositoryId}`);
    return response.data;
  },
};

// AI API
export const aiAPI = {
  // Chat with AI
  chat: async (message, context) => {
    const response = await api.post('/ai/chat', { message, context });
    return response.data;
  },

  // Get AI insights
  getInsights: async (repositoryId) => {
    const response = await api.get(`/ai/insights/${repositoryId}`);
    return response.data;
  },

  // Get AI summary for repository
  getSummary: async (repositoryId) => {
    const response = await api.get(`/repository/${repositoryId}`);
    return response.data?.data?.aiSummary || null;
  },

  // Explain code
  explainCode: async (code, language) => {
    const response = await api.post('/ai/explain', { code, language });
    return response.data;
  },
};

export default api;

// Made with Bob
