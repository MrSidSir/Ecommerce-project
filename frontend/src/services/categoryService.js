import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class CategoryService {
  // Get all categories
  async getCategories(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/categories`, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get category by slug
  async getCategoryBySlug(slug) {
    try {
      const response = await axios.get(`${API_URL}/categories/slug/${slug}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Search categories
  async searchCategories(searchTerm) {
    try {
      const response = await axios.get(`${API_URL}/categories`, {
        params: { search: searchTerm }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Handle API errors
  handleError(error) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data.message || 'API Error',
        status: error.response.status
      };
    } else if (error.request) {
      return {
        success: false,
        message: 'Network Error - Please check your connection',
        status: 0
      };
    } else {
      return {
        success: false,
        message: error.message || 'Unknown Error',
        status: 0
      };
    }
  }
}

export default new CategoryService();