# FolkloreGPT Local Data Storage

This directory contains the local data storage system for FolkloreGPT while database integration is being set up.

## Directory Structure

```
/app/data/
├── README.md              # This file
├── stories/              # Story submissions and data
├── contacts/             # Contact form submissions  
├── settings/             # User settings and preferences
├── exports/              # Data export files
└── backups/              # Backup files
```

## Data Management

All data is currently stored in the browser's localStorage using the LocalStorageManager class. This provides:

- **Persistent storage** across browser sessions
- **CRUD operations** for all data types
- **Data validation** and error handling
- **Export/Import functionality**
- **Statistics and analytics**

## Data Types

### Story Submissions
- User submitted stories
- Audio recordings
- Images and media
- Metadata (culture, language, category)
- Status (pending, approved, rejected)

### Contact Forms
- Contact inquiries
- Partnership requests  
- Technical support tickets
- Feedback submissions

### User Settings
- Voice and audio preferences
- Display settings
- Notification preferences
- Privacy settings
- Profile information

### Stories Database
- Published stories
- Story metadata
- Audio files
- Transcripts
- User interactions

## Migration to Database

When ready to migrate to MongoDB:

1. Export all data using `localStorageManager.exportAllData()`
2. Create database schemas matching the local data structure
3. Import data to MongoDB collections
4. Update API endpoints to use database instead of localStorage
5. Test data integrity and functionality

## Backup Strategy

- Automatic browser localStorage backup
- Manual export functionality for users
- Data validation on all operations
- Error recovery mechanisms