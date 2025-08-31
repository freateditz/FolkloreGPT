import { useState, useEffect } from 'react';
import localStorageManager from '../lib/localStorageManager';

// Custom hook for managing local storage with React state
export const useLocalStorage = (key, initialValue) => {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorageManager.getAll(key);
      return item.length > 0 ? item : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      // Save to localStorage based on the key type
      if (key.toLowerCase() === 'settings') {
        localStorageManager.saveSettings(valueToStore);
      } else {
        // For arrays, replace the entire array
        localStorage.setItem(`folkloreGPT_${key.toLowerCase()}`, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

// Hook specifically for stories
export const useStories = () => {
  const [stories, setStories] = useLocalStorage('stories', []);
  
  const addStory = (story) => {
    const newStory = localStorageManager.saveStory(story);
    if (newStory) {
      setStories(prev => [...prev, newStory]);
    }
    return newStory;
  };
  
  const updateStory = (id, updates) => {
    const updatedStory = localStorageManager.update('stories', id, updates);
    if (updatedStory) {
      setStories(prev => prev.map(s => s.id === id ? updatedStory : s));
    }
    return updatedStory;
  };
  
  const deleteStory = (id) => {
    const success = localStorageManager.delete('stories', id);
    if (success) {
      setStories(prev => prev.filter(s => s.id !== id));
    }
    return success;
  };
  
  return { stories, addStory, updateStory, deleteStory, setStories };
};

// Hook for submissions
export const useSubmissions = () => {
  const [submissions, setSubmissions] = useLocalStorage('submissions', []);
  
  const addSubmission = (submission) => {
    const newSubmission = localStorageManager.saveStorySubmission(submission);
    if (newSubmission) {
      setSubmissions(prev => [...prev, newSubmission]);
    }
    return newSubmission;
  };
  
  const updateSubmission = (id, updates) => {
    const updatedSubmission = localStorageManager.update('submissions', id, updates);
    if (updatedSubmission) {
      setSubmissions(prev => prev.map(s => s.id === id ? updatedSubmission : s));
    }
    return updatedSubmission;
  };
  
  return { submissions, addSubmission, updateSubmission, setSubmissions };
};

// Hook for contacts
export const useContacts = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  
  const addContact = (contact) => {
    const newContact = localStorageManager.saveContactSubmission(contact);
    if (newContact) {
      setContacts(prev => [...prev, newContact]);
    }
    return newContact;
  };
  
  return { contacts, addContact, setContacts };
};

// Hook for settings
export const useSettings = () => {
  const [settings, setSettings] = useState(() => {
    return localStorageManager.getSettings() || {};
  });
  
  const updateSettings = (newSettings) => {
    const updatedSettings = localStorageManager.saveSettings(newSettings);
    if (updatedSettings) {
      setSettings(updatedSettings);
    }
    return updatedSettings;
  };
  
  return { settings, updateSettings, setSettings };
};

export default useLocalStorage;