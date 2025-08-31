import axios from 'axios';

// Use environment variable for data server URL, fallback to localhost for development
const DATA_SERVER_URL = process.env.REACT_APP_DATA_SERVER_URL || 'http://localhost:5000';
const API_BASE_URL = `${DATA_SERVER_URL}/api`;

class StoryService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 60000, // 60 seconds for file uploads
    });

    // Request interceptor for logging
    this.api.interceptors.request.use(
      (config) => {
        console.log(`📤 API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('📤 Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor for logging
    this.api.interceptors.response.use(
      (response) => {
        console.log(`📥 API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error('📥 Response Error:', error.response || error);
        return Promise.reject(error);
      }
    );
  }

  async submitStory(storyData, audioFiles = [], imageFiles = []) {
    try {
      const formData = new FormData();
      
      // Add text data
      Object.keys(storyData).forEach(key => {
        if (key === 'tags' && Array.isArray(storyData[key])) {
          formData.append(key, storyData[key].join(','));
        } else if (storyData[key] !== null && storyData[key] !== undefined) {
          formData.append(key, storyData[key]);
        }
      });

      // Add audio files
      audioFiles.forEach((file, index) => {
        formData.append('audioFiles', file, file.name || `audio-${index}.webm`);
      });

      // Add image files
      imageFiles.forEach((file, index) => {
        formData.append('imageFiles', file, file.name || `image-${index}`);
      });

      console.log('📝 Submitting story with form data...');
      
      const response = await this.api.post('/stories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('❌ Error submitting story:', error);
      throw this.handleError(error);
    }
  }

  async getStories(params = {}) {
    try {
      const response = await this.api.get('/stories', { params });
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching stories:', error);
      throw this.handleError(error);
    }
  }

  async getStory(id) {
    try {
      const response = await this.api.get(`/stories/${id}`);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching story:', error);
      throw this.handleError(error);
    }
  }

  async getStoryStats() {
    try {
      const response = await this.api.get('/stories/stats');
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching story stats:', error);
      throw this.handleError(error);
    }
  }

  async submitContact(contactData) {
    try {
      const response = await this.api.post('/contact', contactData);
      return response.data;
    } catch (error) {
      console.error('❌ Error submitting contact:', error);
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      return {
        status,
        message: data.message || 'Server error occurred',
        error: data.error || 'Unknown error'
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        status: 0,
        message: 'Network error - please check your connection',
        error: 'Network error'
      };
    } else {
      // Something else happened
      return {
        status: 0,
        message: error.message || 'An unexpected error occurred',
        error: 'Client error'
      };
    }
  }
}

export default new StoryService();