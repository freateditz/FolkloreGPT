import React, { createContext, useContext, useEffect, useState } from 'react';
import localStorageManager from '../lib/localStorageManager';

// Create context for data management
const DataContext = createContext();

// Custom hook to use data context
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// Data Provider Component
export const DataProvider = ({ children }) => {
  const [stories, setStories] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [settings, setSettings] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Initialize data on mount
  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsLoading(true);
        
        // Load all data from localStorage
        const storiesData = localStorageManager.getStories();
        const submissionsData = localStorageManager.getStorySubmissions();
        const contactsData = localStorageManager.getContactSubmissions();
        const settingsData = localStorageManager.getSettings();
        
        setStories(storiesData);
        setSubmissions(submissionsData);
        setContacts(contactsData);
        setSettings(settingsData || {});
        
        console.log('Data initialized successfully');
      } catch (error) {
        console.error('Error initializing data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  // Story management functions
  const saveStory = async (storyData) => {
    try {
      const newStory = localStorageManager.saveStory(storyData);
      if (newStory) {
        setStories(prev => [...prev, newStory]);
        return newStory;
      }
    } catch (error) {
      console.error('Error saving story:', error);
      throw error;
    }
  };

  const updateStory = async (id, updates) => {
    try {
      const updatedStory = localStorageManager.update('stories', id, updates);
      if (updatedStory) {
        setStories(prev => prev.map(s => s.id === id ? updatedStory : s));
        return updatedStory;
      }
    } catch (error) {
      console.error('Error updating story:', error);
      throw error;
    }
  };

  const deleteStory = async (id) => {
    try {
      const success = localStorageManager.delete('stories', id);
      if (success) {
        setStories(prev => prev.filter(s => s.id !== id));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting story:', error);
      throw error;
    }
  };

  // Submission management functions
  const saveSubmission = async (submissionData) => {
    try {
      const newSubmission = localStorageManager.saveStorySubmission(submissionData);
      if (newSubmission) {
        setSubmissions(prev => [...prev, newSubmission]);
        return newSubmission;
      }
    } catch (error) {
      console.error('Error saving submission:', error);
      throw error;
    }
  };

  const updateSubmission = async (id, updates) => {
    try {
      const updatedSubmission = localStorageManager.update('submissions', id, updates);
      if (updatedSubmission) {
        setSubmissions(prev => prev.map(s => s.id === id ? updatedSubmission : s));
        return updatedSubmission;
      }
    } catch (error) {
      console.error('Error updating submission:', error);
      throw error;
    }
  };

  // Contact management functions
  const saveContact = async (contactData) => {
    try {
      const newContact = localStorageManager.saveContactSubmission(contactData);
      if (newContact) {
        setContacts(prev => [...prev, newContact]);
        return newContact;
      }
    } catch (error) {
      console.error('Error saving contact:', error);
      throw error;
    }
  };

  // Settings management functions
  const saveSettings = async (settingsData) => {
    try {
      const updatedSettings = localStorageManager.saveSettings(settingsData);
      if (updatedSettings) {
        setSettings(updatedSettings);
        return updatedSettings;
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      throw error;
    }
  };

  // Statistics
  const getStats = () => {
    return localStorageManager.getStats();
  };

  // Export functionality
  const exportData = () => {
    return localStorageManager.exportAllData();
  };

  // Clear all data
  const clearAllData = () => {
    const success = localStorageManager.clearAllData();
    if (success) {
      setStories([]);
      setSubmissions([]);
      setContacts([]);
      setSettings({});
    }
    return success;
  };

  const contextValue = {
    // Data
    stories,
    submissions,
    contacts,
    settings,
    isLoading,
    
    // Story functions
    saveStory,
    updateStory,
    deleteStory,
    
    // Submission functions
    saveSubmission,
    updateSubmission,
    
    // Contact functions
    saveContact,
    
    // Settings functions
    saveSettings,
    
    // Utility functions
    getStats,
    exportData,
    clearAllData
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;