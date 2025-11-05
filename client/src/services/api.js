// api.js - Update baseURL to match your backend
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Your backend is on port 3000
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Enhanced request interceptor with better logging
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('🚀 Making API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    console.error('❌ Request Setup Error:', error);
    return Promise.reject(error);
  }
);

// Enhanced response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response Success:', {
      status: response.status,
      data: response.data,
      url: response.config.url
    });
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data,
      url: error.config?.url
    });
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      console.log('🔐 Unauthorized - redirecting to login');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    if (error.response?.status === 400) {
      console.log('📝 Bad Request - validation error:', error.response.data);
    }
    
    return Promise.reject(error);
  }
);

// Auth service with detailed error handling
export const authService = {
  register: async (userData) => {
    try {
      console.log('👤 Attempting registration with:', userData);
      const response = await api.post('/auth/register', userData);
      // Normalize user shape: backend may return user at top-level or under `user`.
      if (response.data.token) {
        const userObj = response.data.user ?? response.data;
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(userObj));
        // Ensure callers see a consistent shape: attach `user` field
        response.data.user = userObj;
        console.log('✅ Registration successful, user stored');
      }
      return response.data;
    } catch (error) {
      console.error('❌ Registration failed with details:', {
        status: error.response?.status,
        message: error.response?.data?.message,
        errors: error.response?.data?.errors,
        fullError: error.response?.data
      });
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      console.log('🔐 Attempting login with:', { ...credentials, password: '[HIDDEN]' });
      const response = await api.post('/auth/login', credentials);
      // Normalize user shape: backend may return user at top-level or under `user`.
      if (response.data.token) {
        const userObj = response.data.user ?? response.data;
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(userObj));
        // Ensure callers see a consistent shape: attach `user` field
        response.data.user = userObj;
        console.log('✅ Login successful');
      }
      return response.data;
    } catch (error) {
      console.error('❌ Login failed:', error.response?.data);
      throw error;
    }
  },

  logout: () => {
    console.log('👋 Logging out user');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user');
      const userObj = user && user !== 'undefined' ? JSON.parse(user) : null;
      console.log('👤 Retrieved user from storage:', userObj ? 'User exists' : 'No user');
      return userObj;
    } catch (error) {
      console.error('❌ Error parsing user data:', error);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return null;
    }
  },
};

// Post service
export const postService = {
  getAllPosts: async (page = 1, limit = 10, category = null) => {
    const params = { page, limit };
    if (category) params.category = category;
    const response = await api.get('/posts', { params });
    return response.data;
  },

  getPost: async (idOrSlug) => {
    const response = await api.get(`/posts/${idOrSlug}`);
    return response.data;
  },

  createPost: async (postData) => {
    const response = await api.post('/posts', postData);
    return response.data;
  },

  updatePost: async (id, postData) => {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  },

  deletePost: async (id) => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },

  addComment: async (postId, commentData) => {
    const response = await api.post(`/posts/${postId}/comments`, commentData);
    return response.data;
  },

  searchPosts: async (query) => {
    const response = await api.get(`/posts/search`, { params: { q: query } });
    return response.data;
  },
};

// Category service
export const categoryService = {
  getAllCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  createCategory: async (categoryData) => {
    const response = await api.post('/categories', categoryData);
    return response.data;
  },
};

export default api;