import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const newsApi = {
  // Get all news articles
  getAllNews: async (category = '', search = '') => {
    try {
      const params = {};
      if (category) params.category = category;
      if (search) params.search = search;
      
      const response = await api.get('/news', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  },

  // Get single news article
  getNewsById: async (id) => {
    try {
      const response = await api.get(`/news/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  },

  // Create news article
  createNews: async (newsData) => {
    try {
      const response = await api.post('/news', newsData);
      return response.data;
    } catch (error) {
      console.error('Error creating news:', error);
      throw error;
    }
  },

  // Update news article
  updateNews: async (id, newsData) => {
    try {
      const response = await api.put(`/news/${id}`, newsData);
      return response.data;
    } catch (error) {
      console.error('Error updating news:', error);
      throw error;
    }
  },

  // Delete news article
  deleteNews: async (id) => {
    try {
      const response = await api.delete(`/news/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting news:', error);
      throw error;
    }
  },
};

export default api;
