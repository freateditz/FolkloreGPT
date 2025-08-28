// Local Storage Manager for FolkloreGPT
// Professional local data storage system

class LocalStorageManager {
  constructor() {
    this.keys = {
      STORIES: 'folkloreGPT_stories',
      SUBMISSIONS: 'folkloreGPT_submissions', 
      SETTINGS: 'folkloreGPT_settings',
      CONTACTS: 'folkloreGPT_contacts',
      USER_DATA: 'folkloreGPT_userData'
    };
    
    // Initialize storage if it doesn't exist
    this.initializeStorage();
  }

  initializeStorage() {
    // Initialize each storage key if it doesn't exist
    Object.values(this.keys).forEach(key => {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify([]));
      }
    });

    // Initialize settings with defaults
    if (!localStorage.getItem(this.keys.SETTINGS)) {
      const defaultSettings = {
        voiceSpeed: 1.0,
        voicePitch: 1.0,
        voiceVolume: 0.8,
        preferredLanguage: 'English',
        autoTranslate: false,
        showTranscript: true,
        theme: 'system',
        fontSize: 'medium',
        autoPlay: false,
        continueListening: true,
        skipIntros: false,
        emailNotifications: true,
        newStoryAlerts: true,
        communityUpdates: false,
        weeklyDigest: true,
        shareListeningHistory: false,
        allowPersonalization: true,
        dataCollection: 'minimal'
      };
      localStorage.setItem(this.keys.SETTINGS, JSON.stringify(defaultSettings));
    }
  }

  // Generic CRUD operations
  save(key, data) {
    try {
      const existingData = this.getAll(key);
      const newItem = {
        ...data,
        id: data.id || this.generateId(),
        createdAt: data.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const updatedData = [...existingData, newItem];
      localStorage.setItem(this.keys[key.toUpperCase()], JSON.stringify(updatedData));
      return newItem;
    } catch (error) {
      console.error(`Error saving to ${key}:`, error);
      return null;
    }
  }

  getAll(key) {
    try {
      const data = localStorage.getItem(this.keys[key.toUpperCase()]);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error getting ${key}:`, error);
      return [];
    }
  }

  getById(key, id) {
    try {
      const data = this.getAll(key);
      return data.find(item => item.id === id) || null;
    } catch (error) {
      console.error(`Error getting ${key} by ID:`, error);
      return null;
    }
  }

  update(key, id, updates) {
    try {
      const data = this.getAll(key);
      const index = data.findIndex(item => item.id === id);
      
      if (index === -1) return null;
      
      data[index] = {
        ...data[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem(this.keys[key.toUpperCase()], JSON.stringify(data));
      return data[index];
    } catch (error) {
      console.error(`Error updating ${key}:`, error);
      return null;
    }
  }

  delete(key, id) {
    try {
      const data = this.getAll(key);
      const filteredData = data.filter(item => item.id !== id);
      localStorage.setItem(this.keys[key.toUpperCase()], JSON.stringify(filteredData));
      return true;
    } catch (error) {
      console.error(`Error deleting from ${key}:`, error);
      return false;
    }
  }

  // Specific methods for different data types
  
  // Story submissions
  saveStorySubmission(submission) {
    return this.save('SUBMISSIONS', {
      ...submission,
      status: 'pending',
      submittedDate: new Date().toISOString()
    });
  }

  getStorySubmissions() {
    return this.getAll('SUBMISSIONS');
  }

  // Contact form submissions  
  saveContactSubmission(contact) {
    return this.save('CONTACTS', contact);
  }

  getContactSubmissions() {
    return this.getAll('CONTACTS');
  }

  // Settings
  saveSettings(settings) {
    try {
      localStorage.setItem(this.keys.SETTINGS, JSON.stringify(settings));
      return settings;
    } catch (error) {
      console.error('Error saving settings:', error);
      return null;
    }
  }

  getSettings() {
    try {
      const data = localStorage.getItem(this.keys.SETTINGS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting settings:', error);
      return null;
    }
  }

  // Stories (for browsing/listening)
  saveStory(story) {
    return this.save('STORIES', story);
  }

  getStories() {
    return this.getAll('STORIES');
  }

  // Utility methods
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  exportAllData() {
    try {
      const allData = {};
      Object.entries(this.keys).forEach(([name, key]) => {
        allData[name.toLowerCase()] = JSON.parse(localStorage.getItem(key) || '[]');
      });
      return allData;
    } catch (error) {
      console.error('Error exporting data:', error);
      return null;
    }
  }

  clearAllData() {
    try {
      Object.values(this.keys).forEach(key => {
        localStorage.removeItem(key);
      });
      this.initializeStorage();
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }

  // Get statistics
  getStats() {
    try {
      const stories = this.getStories();
      const submissions = this.getStorySubmissions();
      const contacts = this.getContactSubmissions();
      
      return {
        totalStories: stories.length,
        totalSubmissions: submissions.length,
        totalContacts: contacts.length,
        pendingSubmissions: submissions.filter(s => s.status === 'pending').length,
        approvedSubmissions: submissions.filter(s => s.status === 'approved').length
      };
    } catch (error) {
      console.error('Error getting stats:', error);
      return {
        totalStories: 0,
        totalSubmissions: 0,
        totalContacts: 0,
        pendingSubmissions: 0,
        approvedSubmissions: 0
      };
    }
  }
}

// Create a singleton instance
const localStorageManager = new LocalStorageManager();

export default localStorageManager;