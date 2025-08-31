import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config({ path: "./config.env" });

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'your-cloud-name',
  api_key: process.env.CLOUDINARY_API_KEY || 'your-api-key',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'your-api-secret',
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { 
    fileSize: 50 * 1024 * 1024 // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check file types
    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const allowedAudioTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/mp4', 'audio/m4a'];
    
    if (allowedImageTypes.includes(file.mimetype) || allowedAudioTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images and audio files are allowed.'), false);
    }
  }
});

// ✅ Connect to MongoDB Atlas using environment variable
const mongoUri = process.env.ATLAS_URI + "FLOKlore?retryWrites=true&w=majority";
mongoose.connect(mongoUri)
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Enhanced Story Schema
const storySchema = new mongoose.Schema({
  // Basic Information
  title: { type: String, required: true },
  culture: { type: String, required: true },
  language: { type: String, required: true },
  region: { type: String, required: true },
  category: { type: String, required: true },
  ageGroup: String,
  difficulty: String,
  description: { type: String, required: true },
  
  // Story Content
  storyText: String,
  moral: String,
  
  // Media Files
  audioFiles: [{
    filename: String,
    originalName: String,
    cloudinaryUrl: String,
    cloudinaryPublicId: String,
    duration: Number,
    size: Number,
    uploadedAt: { type: Date, default: Date.now }
  }],
  
  imageFiles: [{
    filename: String,
    originalName: String,
    cloudinaryUrl: String,
    cloudinaryPublicId: String,
    width: Number,
    height: Number,
    size: Number,
    uploadedAt: { type: Date, default: Date.now }
  }],
  
  // Metadata
  tags: [String],
  narrator: String,
  submitterName: { type: String, required: true },
  submitterEmail: { type: String, required: true },
  culturalContext: String,
  
  // Permissions
  permissions: { type: Boolean, required: true },
  attribution: { type: Boolean, required: true },
  respectfulUse: { type: Boolean, required: true },
  
  // Submission Info
  submissionType: { type: String, enum: ['text', 'audio', 'mixed'], default: 'text' },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  submittedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { collection: "Stories" });

const Story = mongoose.model("Story", storySchema);

// ✅ Contact Schema (keeping existing)
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  category: String,
  message: String,
  culture: String,
  consent: Boolean,
  submittedAt: String,
}, { collection: "Contact" });

const Contact = mongoose.model("Contact", contactSchema);

// Helper function to upload file to Cloudinary
const uploadToCloudinary = async (filePath, resourceType = 'auto', folder = 'folklore') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: resourceType,
      folder: folder,
      quality: 'auto',
      fetch_format: 'auto'
    });
    return result;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

// Helper function to delete local file
const deleteLocalFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Deleted local file: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error deleting local file ${filePath}:`, error);
  }
};

// ✅ Enhanced Story Submission API
app.post("/api/stories", upload.fields([
  { name: 'audioFiles', maxCount: 5 },
  { name: 'imageFiles', maxCount: 10 }
]), async (req, res) => {
  const uploadedFiles = [];
  
  try {
    console.log('📝 Received story submission:', req.body);
    console.log('📁 Received files:', req.files);

    // Parse form data
    const storyData = {
      title: req.body.title,
      culture: req.body.culture,
      language: req.body.language,
      region: req.body.region,
      category: req.body.category,
      ageGroup: req.body.ageGroup,
      difficulty: req.body.difficulty,
      description: req.body.description,
      storyText: req.body.storyText,
      moral: req.body.moral,
      narrator: req.body.narrator,
      submitterName: req.body.submitterName,
      submitterEmail: req.body.submitterEmail,
      culturalContext: req.body.culturalContext,
      permissions: req.body.permissions === 'true',
      attribution: req.body.attribution === 'true',
      respectfulUse: req.body.respectfulUse === 'true',
      submissionType: req.body.submissionType || 'text',
      tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : [],
      audioFiles: [],
      imageFiles: []
    };

    // Process audio files
    if (req.files && req.files.audioFiles) {
      for (const audioFile of req.files.audioFiles) {
        try {
          console.log(`🎵 Uploading audio file: ${audioFile.originalname}`);
          
          const cloudinaryResult = await uploadToCloudinary(
            audioFile.path, 
            'video', // Audio files use 'video' resource type in Cloudinary
            'folklore/audio'
          );

          storyData.audioFiles.push({
            filename: audioFile.filename,
            originalName: audioFile.originalname,
            cloudinaryUrl: cloudinaryResult.secure_url,
            cloudinaryPublicId: cloudinaryResult.public_id,
            duration: cloudinaryResult.duration || 0,
            size: audioFile.size
          });

          uploadedFiles.push(audioFile.path);
          console.log(`✅ Audio uploaded to Cloudinary: ${cloudinaryResult.secure_url}`);
        } catch (error) {
          console.error(`❌ Error uploading audio file ${audioFile.originalname}:`, error);
          uploadedFiles.push(audioFile.path); // Still need to clean up
        }
      }
    }

    // Process image files
    if (req.files && req.files.imageFiles) {
      for (const imageFile of req.files.imageFiles) {
        try {
          console.log(`🖼️ Uploading image file: ${imageFile.originalname}`);
          
          const cloudinaryResult = await uploadToCloudinary(
            imageFile.path,
            'image',
            'folklore/images'
          );

          storyData.imageFiles.push({
            filename: imageFile.filename,
            originalName: imageFile.originalname,
            cloudinaryUrl: cloudinaryResult.secure_url,
            cloudinaryPublicId: cloudinaryResult.public_id,
            width: cloudinaryResult.width,
            height: cloudinaryResult.height,
            size: imageFile.size
          });

          uploadedFiles.push(imageFile.path);
          console.log(`✅ Image uploaded to Cloudinary: ${cloudinaryResult.secure_url}`);
        } catch (error) {
          console.error(`❌ Error uploading image file ${imageFile.originalname}:`, error);
          uploadedFiles.push(imageFile.path); // Still need to clean up
        }
      }
    }

    // Save story to database
    const story = new Story(storyData);
    const savedStory = await story.save();

    // Clean up local files
    uploadedFiles.forEach(filePath => deleteLocalFile(filePath));

    console.log(`✅ Story saved successfully with ID: ${savedStory._id}`);

    res.status(201).json({
      success: true,
      message: "Story submitted successfully",
      story: {
        id: savedStory._id,
        title: savedStory.title,
        submissionType: savedStory.submissionType,
        audioFiles: savedStory.audioFiles.length,
        imageFiles: savedStory.imageFiles.length,
        submittedAt: savedStory.submittedAt
      }
    });

  } catch (error) {
    console.error("❌ Error saving story:", error);
    
    // Clean up local files in case of error
    uploadedFiles.forEach(filePath => deleteLocalFile(filePath));
    
    res.status(500).json({ 
      success: false, 
      message: "Error saving story", 
      error: error.message 
    });
  }
});

// ✅ Get All Stories API
app.get("/api/stories", async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      category, 
      culture, 
      submissionType,
      status = 'approved'
    } = req.query;

    const query = { status };
    
    if (category) query.category = category;
    if (culture) query.culture = culture;
    if (submissionType) query.submissionType = submissionType;

    const stories = await Story.find(query)
      .sort({ submittedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-submitterEmail'); // Don't expose email addresses

    const total = await Story.countDocuments(query);

    res.json({
      success: true,
      stories,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        count: stories.length,
        totalStories: total
      }
    });

  } catch (error) {
    console.error("❌ Error fetching stories:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching stories",
      error: error.message 
    });
  }
});

// ✅ Get Single Story API
app.get("/api/stories/:id", async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).select('-submitterEmail');
    
    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found"
      });
    }

    res.json({
      success: true,
      story
    });

  } catch (error) {
    console.error("❌ Error fetching story:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching story",
      error: error.message 
    });
  }
});

// ✅ Get Stories Statistics API
app.get("/api/stories/stats", async (req, res) => {
  try {
    const totalStories = await Story.countDocuments({ status: 'approved' });
    const pendingStories = await Story.countDocuments({ status: 'pending' });
    
    const categoriesStats = await Story.aggregate([
      { $match: { status: 'approved' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const culturesStats = await Story.aggregate([
      { $match: { status: 'approved' } },
      { $group: { _id: '$culture', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const submissionTypeStats = await Story.aggregate([
      { $match: { status: 'approved' } },
      { $group: { _id: '$submissionType', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      stats: {
        totalStories,
        pendingStories,
        categoriesStats,
        culturesStats,
        submissionTypeStats
      }
    });

  } catch (error) {
    console.error("❌ Error fetching statistics:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching statistics",
      error: error.message 
    });
  }
});

// ✅ Contact API (keeping existing)
app.post("/api/contact", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.json({ success: true, contact });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 50MB.'
      });
    }
  }
  
  res.status(500).json({
    success: false,
    message: error.message || 'Something went wrong!'
  });
});

app.listen(5000, () => console.log("🚀 Data Server running on http://localhost:5000"));