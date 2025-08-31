import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Checkbox } from '../components/ui/checkbox';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useToast } from '../hooks/use-toast';
import { useData } from '../components/DataManager';
import { mockCultures, mockLanguages, mockCategories } from '../utils/mockData';
import AudioRecorder from '../components/AudioRecorder';
import storyService from '../services/storyService';

import { 
  Upload, 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  StopCircle, 
  FileText, 
  Image, 
  Heart, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  X,
  FileAudio,
  Camera,
  Sparkles,
  Star,
  Globe,
  BookOpen,
  Users,
  Zap,
  Volume2
} from 'lucide-react';

// Import animated components
import ScrollAnimationWrapper from '../components/ScrollAnimationWrapper';
import InteractiveCard from '../components/InteractiveCard';
import AnimatedText from '../components/AnimatedText';
import FloatingElements from '../components/FloatingElements';

const Submit = () => {
  const [activeTab, setActiveTab] = useState('text');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    culture: '',
    language: '',
    region: '',
    category: '',
    ageGroup: '',
    difficulty: '',
    description: '',
    storyText: '',
    moral: '',
    tags: [],
    narrator: '',
    submitterName: '',
    submitterEmail: '',
    culturalContext: '',
    permissions: false,
    attribution: false,
    respectfulUse: false
  });
  const [audioFiles, setAudioFiles] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const { toast } = useToast();
  const { saveSubmission } = useData(); // Keep as fallback

  const ageGroups = ['Children', 'Young Adults', 'Adults', 'All Ages'];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const tagSuggestions = ['Creation', 'Nature', 'Animals', 'Wisdom', 'Love', 'Adventure', 'Magic', 'Heroes', 'Spirits', 'Family'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTagAdd = (tag) => {
    if (!formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleRecordingComplete = (audioFile, duration) => {
    const recordingData = {
      id: Date.now(),
      file: audioFile,
      name: `Recording ${audioFiles.length + 1}`,
      duration: duration,
      size: audioFile.size
    };
    
    setAudioFiles(prev => [...prev, recordingData]);
    
    toast({
      title: "🎙️ Recording saved",
      description: "Your story recording has been saved successfully",
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const imageData = {
        id: Date.now() + Math.random(),
        file: file,
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        type: file.type,
        url: URL.createObjectURL(file)
      };
      setImageFiles(prev => [...prev, imageData]);
    });
    
    toast({
      title: "📸 Images uploaded",
      description: `${files.length} image(s) added to your story`,
    });
  };

  const removeAudioFile = (id) => {
    setAudioFiles(prev => prev.filter(audio => audio.id !== id));
  };

  const removeImageFile = (id) => {
    setImageFiles(prev => {
      const fileToRemove = prev.find(img => img.id === id);
      if (fileToRemove && fileToRemove.url) {
        URL.revokeObjectURL(fileToRemove.url);
      }
      return prev.filter(img => img.id !== id);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Prepare story data
      const storyData = {
        ...formData,
        submissionType: activeTab,
      };

      // Extract actual files from the file objects
      const audioFilesToUpload = audioFiles.map(audio => audio.file);
      const imageFilesToUpload = imageFiles.map(image => image.file);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Submit to database
      const result = await storyService.submitStory(
        storyData, 
        audioFilesToUpload, 
        imageFilesToUpload
      );

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (result.success) {
        toast({
          title: "✨ Story submitted successfully!",
          description: `Your story "${formData.title}" has been submitted and is pending review.`,
        });
        
        // Reset form after successful submission
        setFormData({
          title: '',
          culture: '',
          language: '',
          region: '',
          category: '',
          ageGroup: '',
          difficulty: '',
          description: '',
          storyText: '',
          moral: '',
          tags: [],
          narrator: '',
          submitterName: '',
          submitterEmail: '',
          culturalContext: '',
          permissions: false,
          attribution: false,
          respectfulUse: false
        });
        setAudioFiles([]);
        setImageFiles([]);
        setActiveTab('text');
      } else {
        throw new Error(result.message || 'Failed to submit story');
      }
    } catch (error) {
      console.error('Submission error:', error);
      
      // Save to localStorage as fallback
      try {
        const submissionData = {
          ...formData,
          activeTab,
          audioFiles: audioFiles.map(audio => ({ ...audio, file: null })), // Can't store File objects
          imageFiles: imageFiles.map(img => ({ ...img, file: null })),     // Can't store File objects
          submissionType: activeTab,
        };
        
        await saveSubmission(submissionData);
        
        toast({
          title: "⚠️ Saved locally",
          description: "Couldn't connect to server, but your story has been saved locally.",
          variant: "destructive"
        });
      } catch (fallbackError) {
        toast({
          title: "❌ Submission failed",
          description: error.message || "There was an error saving your story. Please try again.",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen relative py-8 overflow-hidden">
      <FloatingElements />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <ScrollAnimationWrapper animation="fadeInUp">
          <div className="text-center mb-16">
            <div className="relative inline-block mb-8">
              {/* Animated heart icon */}
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl animate-levitate">
                  <Heart className="w-12 h-12 text-white animate-pulse" />
                </div>
                {/* Glow rings */}
                <div className="absolute inset-0 w-24 h-24 bg-red-400 rounded-full opacity-30 blur-xl animate-ping"></div>
                <div className="absolute inset-0 w-24 h-24 bg-pink-400 rounded-full opacity-20 blur-2xl animate-pulse"></div>
              </div>
              
              {/* Floating sparkles */}
              {[...Array(6)].map((_, i) => (
                <Sparkles
                  key={i}
                  className="absolute text-amber-400 animate-float opacity-60"
                  size={20}
                  style={{
                    left: `${50 + Math.cos(i * Math.PI / 3) * 80}%`,
                    top: `${50 + Math.sin(i * Math.PI / 3) * 80}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${3 + i * 0.5}s`
                  }}
                />
              ))}
            </div>
            
            <AnimatedText
              text="Share Your Story"
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-6"
              animation="gradient"
            />
            
            <AnimatedText
              text="Help preserve cultural heritage by sharing your community's stories and folklore"
              className="text-xl text-amber-600 max-w-3xl mx-auto"
              animation="splitWords"
              delay={500}
            />
          </div>
        </ScrollAnimationWrapper>

        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
          {/* Enhanced Tabs */}
          <ScrollAnimationWrapper animation="scaleIn" delay={200}>
            <div className="flex justify-center mb-8">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full max-w-lg grid-cols-3 bg-white/50 backdrop-blur-sm border border-amber-200/50 p-1">
                  <TabsTrigger 
                    value="text"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Text Story
                  </TabsTrigger>
                  <TabsTrigger 
                    value="audio"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
                  >
                    <Mic className="w-4 h-4 mr-2" />
                    Audio Recording
                  </TabsTrigger>
                  <TabsTrigger 
                    value="mixed"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Mixed Media
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </ScrollAnimationWrapper>

          {/* Basic Information */}
          <ScrollAnimationWrapper animation="fadeInUp" delay={400}>
            <InteractiveCard className="mb-8 overflow-hidden" tiltIntensity={5}>
              <CardHeader className="relative">
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 animate-gradient-x"></div>
                </div>
                <div className="relative z-10">
                  <CardTitle className="text-3xl text-amber-800 flex items-center gap-3">
                    <BookOpen className="w-8 h-8 animate-pulse" />
                    <AnimatedText text="Story Information" animation="fadeIn" />
                    <Star className="w-6 h-6 text-yellow-500 animate-spin" />
                  </CardTitle>
                  <CardDescription className="text-amber-600 text-lg">
                    Tell us about your story and its cultural background
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ScrollAnimationWrapper animation="fadeInLeft" delay={100}>
                    <div className="relative group">
                      <Label htmlFor="title" className="text-amber-800 font-medium flex items-center gap-2">
                        <Sparkles className="w-4 h-4 animate-pulse" />
                        Story Title *
                      </Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="e.g., The Moon's Daughter"
                        className="border-amber-200/50 focus:border-amber-400 backdrop-blur-sm bg-white/50 transition-all duration-300 focus:scale-105 focus:shadow-lg"
                        required
                      />
                    </div>
                  </ScrollAnimationWrapper>
                  
                  <ScrollAnimationWrapper animation="fadeInRight" delay={200}>
                    <div className="relative group">
                      <Label htmlFor="culture" className="text-amber-800 font-medium flex items-center gap-2">
                        <Globe className="w-4 h-4 animate-float" />
                        Culture *
                      </Label>
                      <Select value={formData.culture} onValueChange={(value) => handleInputChange('culture', value)}>
                        <SelectTrigger className="border-amber-200/50 backdrop-blur-sm bg-white/50 hover:scale-105 transition-all duration-300">
                          <SelectValue placeholder="Select culture" />
                        </SelectTrigger>
                        <SelectContent className="backdrop-blur-md bg-white/90">
                          {mockCultures.map((culture) => (
                            <SelectItem key={culture.id} value={culture.name}>
                              {culture.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </ScrollAnimationWrapper>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ScrollAnimationWrapper animation="fadeInLeft" delay={300}>
                    <div className="relative group">
                      <Label htmlFor="language" className="text-amber-800 font-medium">Language *</Label>
                      <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                        <SelectTrigger className="border-amber-200/50 backdrop-blur-sm bg-white/50 hover:scale-105 transition-all duration-300">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockLanguages.map((language) => (
                            <SelectItem key={language} value={language}>
                              {language}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </ScrollAnimationWrapper>
                  
                  <ScrollAnimationWrapper animation="fadeInRight" delay={400}>
                    <div className="relative group">
                      <Label htmlFor="region" className="text-amber-800 font-medium">Region *</Label>
                      <Input
                        id="region"
                        value={formData.region}
                        onChange={(e) => handleInputChange('region', e.target.value)}
                        placeholder="e.g., Northeast India"
                        className="border-amber-200/50 focus:border-amber-400 backdrop-blur-sm bg-white/50 transition-all duration-300 focus:scale-105"
                        required
                      />
                    </div>
                  </ScrollAnimationWrapper>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { field: 'category', label: 'Category', options: mockCategories, delay: 500 },
                    { field: 'ageGroup', label: 'Age Group', options: ageGroups, delay: 600 },
                    { field: 'difficulty', label: 'Difficulty', options: difficulties, delay: 700 }
                  ].map((select, index) => (
                    <ScrollAnimationWrapper key={select.field} animation="fadeInUp" delay={select.delay}>
                      <div className="relative group">
                        <Label htmlFor={select.field} className="text-amber-800 font-medium">{select.label}</Label>
                        <Select value={formData[select.field]} onValueChange={(value) => handleInputChange(select.field, value)}>
                          <SelectTrigger className="border-amber-200/50 backdrop-blur-sm bg-white/50 hover:scale-105 transition-all duration-300">
                            <SelectValue placeholder={`Select ${select.label.toLowerCase()}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {select.options.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </ScrollAnimationWrapper>
                  ))}
                </div>

                <ScrollAnimationWrapper animation="fadeInUp" delay={800}>
                  <div className="relative group">
                    <Label htmlFor="description" className="text-amber-800 font-medium flex items-center gap-2">
                      <FileText className="w-4 h-4 animate-pulse" />
                      Description *
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Brief description of your story..."
                      className="border-amber-200/50 focus:border-amber-400 backdrop-blur-sm bg-white/50 min-h-[100px] transition-all duration-300 focus:scale-105"
                      required
                    />
                  </div>
                </ScrollAnimationWrapper>

                <ScrollAnimationWrapper animation="fadeInUp" delay={900}>
                  <div>
                    <Label className="text-amber-800 font-medium mb-2 block flex items-center gap-2">
                      <Zap className="w-4 h-4 animate-pulse" />
                      Tags
                    </Label>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-amber-100/80 text-amber-800 animate-pulse-glow hover:scale-110 transition-transform duration-300">
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleTagRemove(tag)}
                            className="ml-1 hover:text-amber-900 transition-colors duration-300"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tagSuggestions.filter(tag => !formData.tags.includes(tag)).map((tag) => (
                        <Button
                          key={tag}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleTagAdd(tag)}
                          className="border-amber-300/50 text-amber-700 hover:bg-amber-100/50 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                        >
                          + {tag}
                        </Button>
                      ))}
                    </div>
                  </div>
                </ScrollAnimationWrapper>
              </CardContent>
            </InteractiveCard>
          </ScrollAnimationWrapper>

          {/* Enhanced Story Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="text">
              <ScrollAnimationWrapper animation="slideUp" delay={600}>
                <InteractiveCard className="mb-8" tiltIntensity={8}>
                  <CardHeader>
                    <CardTitle className="text-2xl text-amber-800 flex items-center gap-3">
                      <FileText className="w-6 h-6 animate-pulse" />
                      Story Content
                      <Volume2 className="w-5 h-5 text-amber-600 animate-float" />
                    </CardTitle>
                    <CardDescription className="text-amber-600">
                      Share your story in text format
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ScrollAnimationWrapper animation="fadeInUp" delay={100}>
                      <div>
                        <Label htmlFor="storyText" className="text-amber-800 font-medium">Story Text *</Label>
                        <Textarea
                          id="storyText"
                          value={formData.storyText}
                          onChange={(e) => handleInputChange('storyText', e.target.value)}
                          placeholder="Tell your story here..."
                          className="border-amber-200/50 focus:border-amber-400 backdrop-blur-sm bg-white/50 min-h-[300px] transition-all duration-300 focus:scale-105"
                          required
                        />
                      </div>
                    </ScrollAnimationWrapper>
                    
                    <ScrollAnimationWrapper animation="fadeInUp" delay={200}>
                      <div>
                        <Label htmlFor="moral" className="text-amber-800 font-medium">Moral/Lesson</Label>
                        <Textarea
                          id="moral"
                          value={formData.moral}
                          onChange={(e) => handleInputChange('moral', e.target.value)}
                          placeholder="What lesson does this story teach?"
                          className="border-amber-200/50 focus:border-amber-400 backdrop-blur-sm bg-white/50 min-h-[80px] transition-all duration-300 focus:scale-105"
                        />
                      </div>
                    </ScrollAnimationWrapper>
                  </CardContent>
                </InteractiveCard>
              </ScrollAnimationWrapper>
            </TabsContent>

            <TabsContent value="audio">
              <ScrollAnimationWrapper animation="rotateIn" delay={600}>
                <InteractiveCard className="mb-8" tiltIntensity={8}>
                  <CardHeader>
                    <CardTitle className="text-2xl text-amber-800 flex items-center gap-3">
                      <FileAudio className="w-6 h-6 animate-pulse" />
                      Audio Recording
                      <Mic className="w-5 h-5 text-red-600 animate-pulse" />
                    </CardTitle>
                    <CardDescription className="text-amber-600">
                      Record your story or upload audio files
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Enhanced Recording Interface */}
                    <ScrollAnimationWrapper animation="scaleIn" delay={100}>
                      <div className="text-center p-4">
                        <h4 className="font-medium text-amber-800 mb-4">Record Your Story</h4>
                        <AudioRecorder 
                          onRecordingComplete={handleRecordingComplete}
                          maxDuration={600} // 10 minutes
                        />
                      </div>
                    </ScrollAnimationWrapper>

                    {/* Existing Recordings */}
                    {audioFiles.length > 0 && (
                      <ScrollAnimationWrapper animation="slideUp" delay={300}>
                        <div>
                          <h4 className="font-medium text-amber-800 mb-4 flex items-center gap-2">
                            <FileAudio className="w-5 h-5 animate-pulse" />
                            Your Recordings ({audioFiles.length})
                          </h4>
                          <div className="space-y-3">
                            {audioFiles.map((recording, index) => (
                              <ScrollAnimationWrapper key={recording.id} animation="fadeInLeft" delay={index * 100}>
                                <InteractiveCard className="p-4" tiltIntensity={5}>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center animate-pulse">
                                        <FileAudio className="w-5 h-5 text-white" />
                                      </div>
                                      <div>
                                        <p className="font-medium text-amber-800">{recording.name}</p>
                                        <p className="text-sm text-amber-600">
                                          {formatTime(recording.duration)} • {(recording.size / 1024 / 1024).toFixed(1)} MB
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeAudioFile(recording.id)}
                                        className="text-red-600 hover:scale-110 transition-transform duration-300"
                                      >
                                        <X className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </InteractiveCard>
                              </ScrollAnimationWrapper>
                            ))}
                          </div>
                        </div>
                      </ScrollAnimationWrapper>
                    )}

                    {/* Enhanced Upload Audio */}
                    <ScrollAnimationWrapper animation="fadeInUp" delay={500}>
                      <div>
                        <Label className="text-amber-800 font-medium mb-2 block">Upload Audio File</Label>
                        <InteractiveCard className="border-2 border-dashed border-amber-300 p-8 text-center bg-amber-50/50 hover:bg-amber-100/50 transition-colors duration-300">
                          <Upload className="w-12 h-12 text-amber-600 mx-auto mb-4 animate-bounce" />
                          <p className="text-amber-700 mb-2 font-medium">Drop audio files here or click to browse</p>
                          <p className="text-sm text-amber-600">Supported formats: MP3, WAV, M4A (max 50MB)</p>
                          <input
                            type="file"
                            accept="audio/*"
                            multiple
                            className="hidden"
                            id="audio-upload"
                            onChange={(e) => {
                              const files = Array.from(e.target.files);
                              files.forEach(file => {
                                const audioData = {
                                  id: Date.now() + Math.random(),
                                  file: file,
                                  name: file.name,
                                  duration: 0, // Will be determined during upload
                                  size: file.size
                                };
                                setAudioFiles(prev => [...prev, audioData]);
                              });
                              
                              toast({
                                title: "🎵 Audio uploaded",
                                description: `${files.length} audio file(s) have been uploaded successfully`,
                              });
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            className="border-amber-300/50 text-amber-700 hover:bg-amber-100/50 transition-all duration-300 hover:scale-110 mt-4"
                            onClick={() => document.getElementById('audio-upload').click()}
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Choose Audio Files
                          </Button>
                        </InteractiveCard>
                      </div>
                    </ScrollAnimationWrapper>
                  </CardContent>
                </InteractiveCard>
              </ScrollAnimationWrapper>
            </TabsContent>

            <TabsContent value="mixed">
              <ScrollAnimationWrapper animation="fadeInUp" delay={600}>
                <InteractiveCard className="mb-8" tiltIntensity={8}>
                  <CardHeader>
                    <CardTitle className="text-2xl text-amber-800 flex items-center gap-3">
                      <Camera className="w-6 h-6 animate-pulse" />
                      Mixed Media
                      <Sparkles className="w-5 h-5 text-purple-600 animate-spin" />
                    </CardTitle>
                    <CardDescription className="text-amber-600">
                      Combine text, audio, and images to tell your story
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Text Content */}
                    <ScrollAnimationWrapper animation="fadeInUp" delay={100}>
                      <div>
                        <Label htmlFor="mixedStoryText" className="text-amber-800 font-medium">Story Text</Label>
                        <Textarea
                          id="mixedStoryText"
                          value={formData.storyText}
                          onChange={(e) => handleInputChange('storyText', e.target.value)}
                          placeholder="Tell your story here..."
                          className="border-amber-200/50 focus:border-amber-400 backdrop-blur-sm bg-white/50 min-h-[200px] transition-all duration-300 focus:scale-105"
                        />
                      </div>
                    </ScrollAnimationWrapper>

                    {/* Enhanced Image Upload */}
                    <ScrollAnimationWrapper animation="fadeInUp" delay={300}>
                      <div>
                        <Label className="text-amber-800 font-medium mb-2 block flex items-center gap-2">
                          <Image className="w-4 h-4 animate-pulse" />
                          Images
                        </Label>
                        <InteractiveCard className="border-2 border-dashed border-amber-300 p-8 text-center bg-gradient-to-br from-purple-50/50 to-pink-50/50">
                          <div className="relative">
                            <Image className="w-12 h-12 text-amber-600 mx-auto mb-4 animate-bounce" />
                            <div className="absolute inset-0 w-12 h-12 bg-amber-400 rounded-full mx-auto opacity-20 blur-xl animate-pulse"></div>
                          </div>
                          <p className="text-amber-700 mb-2 font-medium">Upload images to accompany your story</p>
                          <p className="text-sm text-amber-600 mb-4">Supported formats: JPG, PNG, GIF (max 10MB each)</p>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleImageUpload}
                            id="image-upload"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            className="border-amber-300/50 text-amber-700 hover:bg-amber-100/50 transition-all duration-300 hover:scale-110"
                            onClick={() => document.getElementById('image-upload').click()}
                          >
                            <Camera className="w-4 h-4 mr-2" />
                            Choose Images
                          </Button>
                        </InteractiveCard>
                      </div>
                    </ScrollAnimationWrapper>

                    {/* Preview Images with animations */}
                    {imageFiles.length > 0 && (
                      <ScrollAnimationWrapper animation="slideUp" delay={500}>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {imageFiles.map((image, index) => (
                            <ScrollAnimationWrapper key={image.id} animation="scaleIn" delay={index * 100}>
                              <InteractiveCard className="relative group overflow-hidden" tiltIntensity={10}>
                                <img
                                  src={image.url}
                                  alt={image.name}
                                  className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="absolute top-1 right-1 text-red-600 bg-white/80 hover:bg-white transition-all duration-300 hover:scale-110"
                                  onClick={() => removeImageFile(image.id)}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </InteractiveCard>
                            </ScrollAnimationWrapper>
                          ))}
                        </div>
                      </ScrollAnimationWrapper>
                    )}
                  </CardContent>
                </InteractiveCard>
              </ScrollAnimationWrapper>
            </TabsContent>
          </Tabs>

          {/* Additional Information */}
          <ScrollAnimationWrapper animation="fadeInUp" delay={800}>
            <InteractiveCard className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-amber-800 flex items-center gap-3">
                  <Users className="w-6 h-6 animate-pulse" />
                  Additional Information
                  <Globe className="w-5 h-5 text-blue-600 animate-float" />
                </CardTitle>
                <CardDescription className="text-amber-600">
                  Help us understand the cultural context of your story
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ScrollAnimationWrapper animation="fadeInLeft" delay={100}>
                    <div>
                      <Label htmlFor="narrator" className="text-amber-800 font-medium">Narrator/Storyteller</Label>
                      <Input
                        id="narrator"
                        value={formData.narrator}
                        onChange={(e) => handleInputChange('narrator', e.target.value)}
                        placeholder="e.g., Elder John Smith"
                        className="border-amber-200/50 focus:border-amber-400 backdrop-blur-sm bg-white/50 transition-all duration-300 focus:scale-105"
                      />
                    </div>
                  </ScrollAnimationWrapper>
                  
                  <ScrollAnimationWrapper animation="fadeInRight" delay={200}>
                    <div>
                      <Label htmlFor="submitterName" className="text-amber-800 font-medium">Your Name *</Label>
                      <Input
                        id="submitterName"
                        value={formData.submitterName}
                        onChange={(e) => handleInputChange('submitterName', e.target.value)}
                        placeholder="Your full name"
                        className="border-amber-200/50 focus:border-amber-400 backdrop-blur-sm bg-white/50 transition-all duration-300 focus:scale-105"
                        required
                      />
                    </div>
                  </ScrollAnimationWrapper>
                </div>

                <ScrollAnimationWrapper animation="fadeInUp" delay={300}>
                  <div>
                    <Label htmlFor="submitterEmail" className="text-amber-800 font-medium">Email Address *</Label>
                    <Input
                      id="submitterEmail"
                      type="email"
                      value={formData.submitterEmail}
                      onChange={(e) => handleInputChange('submitterEmail', e.target.value)}
                      placeholder="your.email@example.com"
                      className="border-amber-200/50 focus:border-amber-400 backdrop-blur-sm bg-white/50 transition-all duration-300 focus:scale-105"
                      required
                    />
                  </div>
                </ScrollAnimationWrapper>

                <ScrollAnimationWrapper animation="fadeInUp" delay={400}>
                  <div>
                    <Label htmlFor="culturalContext" className="text-amber-800 font-medium">Cultural Context</Label>
                    <Textarea
                      id="culturalContext"
                      value={formData.culturalContext}
                      onChange={(e) => handleInputChange('culturalContext', e.target.value)}
                      placeholder="Any additional context about the cultural significance of this story..."
                      className="border-amber-200/50 focus:border-amber-400 backdrop-blur-sm bg-white/50 min-h-[100px] transition-all duration-300 focus:scale-105"
                    />
                  </div>
                </ScrollAnimationWrapper>
              </CardContent>
            </InteractiveCard>
          </ScrollAnimationWrapper>

          {/* Enhanced Permissions & Terms */}
          <ScrollAnimationWrapper animation="slideUp" delay={1000}>
            <InteractiveCard className="mb-8 bg-gradient-to-br from-green-50/80 to-blue-50/80">
              <CardHeader>
                <CardTitle className="text-2xl text-amber-800 flex items-center gap-3">
                  <Shield className="w-6 h-6 animate-pulse" />
                  Permissions & Terms
                  <CheckCircle className="w-5 h-5 text-green-600 animate-pulse" />
                </CardTitle>
                <CardDescription className="text-amber-600">
                  Please confirm your rights and permissions for this story
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  {
                    field: 'permissions',
                    text: 'I have the right to share this story and represent that I am authorized by my community or cultural group to submit this content.',
                    delay: 100
                  },
                  {
                    field: 'attribution',
                    text: 'I agree to proper attribution and acknowledge that this story will be credited to the source community and narrator.',
                    delay: 200
                  },
                  {
                    field: 'respectfulUse',
                    text: 'I understand that this story will be used respectfully for cultural preservation and educational purposes.',
                    delay: 300
                  }
                ].map((item) => (
                  <ScrollAnimationWrapper key={item.field} animation="fadeInUp" delay={item.delay}>
                    <div className="flex items-start space-x-3 p-4 rounded-lg hover:bg-white/50 transition-all duration-300 hover:scale-105 group">
                      <Checkbox
                        id={item.field}
                        checked={formData[item.field]}
                        onCheckedChange={(checked) => handleInputChange(item.field, checked)}
                        className="mt-1 group-hover:scale-110 transition-transform duration-300"
                      />
                      <Label htmlFor={item.field} className="text-amber-800 leading-relaxed cursor-pointer">
                        {item.text}
                      </Label>
                    </div>
                  </ScrollAnimationWrapper>
                ))}
              </CardContent>
            </InteractiveCard>
          </ScrollAnimationWrapper>

          {/* Enhanced Submit Section */}
          <ScrollAnimationWrapper animation="scaleIn" delay={1200}>
            <InteractiveCard className="relative overflow-hidden">
              <CardContent className="p-8 text-center">
                {/* Background animation */}
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 animate-gradient-x"></div>
                </div>
                
                <div className="relative z-10">
                  {isSubmitting && (
                    <div className="mb-6">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
                        <span className="text-amber-800 font-semibold text-lg">Uploading your precious story...</span>
                        <Sparkles className="w-6 h-6 text-amber-600 animate-pulse" />
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-amber-800">Progress</span>
                        <span className="text-amber-600 font-bold">{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-3 bg-amber-100" />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-center gap-6">
                    <div className="relative group">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting || !formData.permissions || !formData.attribution || !formData.respectfulUse}
                        className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-10 py-4 text-lg font-semibold transition-all duration-300 hover:scale-110 hover:shadow-xl relative z-10"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Upload className="w-6 h-6 mr-3 group-hover:animate-bounce" />
                            Submit Story
                          </>
                        )}
                      </Button>
                      <div className="absolute inset-0 bg-green-400 rounded-lg opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
                    </div>
                    
                    <div className="relative group">
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        className="border-amber-300/50 text-amber-700 hover:bg-amber-100/50 px-10 py-4 text-lg font-semibold transition-all duration-300 hover:scale-110 relative z-10"
                        onClick={() => window.location.reload()}
                      >
                        <X className="w-6 h-6 mr-3 group-hover:rotate-180 transition-transform duration-500" />
                        Reset Form
                      </Button>
                      <div className="absolute inset-0 bg-amber-300 rounded-lg opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
                    </div>
                  </div>
                  
                  <p className="text-center text-sm text-amber-600 mt-6 italic">
                    ✨ Your story will be reviewed by our cultural advisors before being published ✨
                  </p>
                </div>
              </CardContent>
            </InteractiveCard>
          </ScrollAnimationWrapper>
        </form>
      </div>
    </div>
  );
};

export default Submit;