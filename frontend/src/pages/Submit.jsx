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
  Camera
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { mockCultures, mockLanguages, mockCategories } from '../utils/mockData';

const Submit = () => {
  const [activeTab, setActiveTab] = useState('text');
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
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
  const [recordings, setRecordings] = useState([]);
  const [images, setImages] = useState([]);
  const { toast } = useToast();

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

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    
    // Simulate recording timer
    const interval = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    
    setTimeout(() => {
      clearInterval(interval);
      setIsRecording(false);
      setRecordings(prev => [...prev, {
        id: Date.now(),
        duration: recordingTime,
        name: `Recording ${prev.length + 1}`,
        size: '2.4 MB'
      }]);
      toast({
        title: "Recording saved",
        description: "Your story recording has been saved successfully",
      });
    }, 5000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setRecordings(prev => [...prev, {
      id: Date.now(),
      duration: recordingTime,
      name: `Recording ${prev.length + 1}`,
      size: '2.4 MB'
    }]);
    toast({
      title: "Recording stopped",
      description: "Your recording has been saved",
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      setImages(prev => [...prev, {
        id: Date.now() + Math.random(),
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        type: file.type,
        url: URL.createObjectURL(file)
      }]);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission process
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    toast({
      title: "Story submitted successfully!",
      description: "Your story has been submitted for review and will be available soon.",
    });
    
    setIsSubmitting(false);
    setUploadProgress(0);
    
    // Reset form
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
    setRecordings([]);
    setImages([]);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-red-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4">
            Share Your Story
          </h1>
          <p className="text-lg text-amber-600 max-w-2xl mx-auto">
            Help preserve cultural heritage by sharing your community's stories and folklore
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="text">Text Story</TabsTrigger>
              <TabsTrigger value="audio">Audio Recording</TabsTrigger>
              <TabsTrigger value="mixed">Mixed Media</TabsTrigger>
            </TabsList>

            {/* Basic Information */}
            <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm mt-6 mb-6">
              <CardHeader>
                <CardTitle className="text-2xl text-amber-800">Story Information</CardTitle>
                <CardDescription className="text-amber-600">
                  Tell us about your story and its cultural background
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title" className="text-amber-800">Story Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="e.g., The Moon's Daughter"
                      className="border-amber-200 focus:border-amber-400"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="culture" className="text-amber-800">Culture *</Label>
                    <Select value={formData.culture} onValueChange={(value) => handleInputChange('culture', value)}>
                      <SelectTrigger className="border-amber-200">
                        <SelectValue placeholder="Select culture" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCultures.map((culture) => (
                          <SelectItem key={culture.id} value={culture.name}>
                            {culture.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="language" className="text-amber-800">Language *</Label>
                    <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                      <SelectTrigger className="border-amber-200">
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
                  <div>
                    <Label htmlFor="region" className="text-amber-800">Region *</Label>
                    <Input
                      id="region"
                      value={formData.region}
                      onChange={(e) => handleInputChange('region', e.target.value)}
                      placeholder="e.g., Northeast India"
                      className="border-amber-200 focus:border-amber-400"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="category" className="text-amber-800">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger className="border-amber-200">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="ageGroup" className="text-amber-800">Age Group</Label>
                    <Select value={formData.ageGroup} onValueChange={(value) => handleInputChange('ageGroup', value)}>
                      <SelectTrigger className="border-amber-200">
                        <SelectValue placeholder="Select age group" />
                      </SelectTrigger>
                      <SelectContent>
                        {ageGroups.map((group) => (
                          <SelectItem key={group} value={group}>
                            {group}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="difficulty" className="text-amber-800">Difficulty</Label>
                    <Select value={formData.difficulty} onValueChange={(value) => handleInputChange('difficulty', value)}>
                      <SelectTrigger className="border-amber-200">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        {difficulties.map((difficulty) => (
                          <SelectItem key={difficulty} value={difficulty}>
                            {difficulty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-amber-800">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Brief description of your story..."
                    className="border-amber-200 focus:border-amber-400 min-h-[100px]"
                    required
                  />
                </div>

                <div>
                  <Label className="text-amber-800 mb-2 block">Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-amber-100 text-amber-800">
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleTagRemove(tag)}
                          className="ml-1 hover:text-amber-900"
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
                        className="border-amber-300 text-amber-700 hover:bg-amber-100"
                      >
                        + {tag}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Story Content Tabs */}
            <TabsContent value="text">
              <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm mb-6">
                <CardHeader>
                  <CardTitle className="text-2xl text-amber-800 flex items-center gap-2">
                    <FileText className="w-6 h-6" />
                    Story Content
                  </CardTitle>
                  <CardDescription className="text-amber-600">
                    Share your story in text format
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="storyText" className="text-amber-800">Story Text *</Label>
                    <Textarea
                      id="storyText"
                      value={formData.storyText}
                      onChange={(e) => handleInputChange('storyText', e.target.value)}
                      placeholder="Tell your story here..."
                      className="border-amber-200 focus:border-amber-400 min-h-[300px]"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="moral" className="text-amber-800">Moral/Lesson</Label>
                    <Textarea
                      id="moral"
                      value={formData.moral}
                      onChange={(e) => handleInputChange('moral', e.target.value)}
                      placeholder="What lesson does this story teach?"
                      className="border-amber-200 focus:border-amber-400 min-h-[80px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="audio">
              <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm mb-6">
                <CardHeader>
                  <CardTitle className="text-2xl text-amber-800 flex items-center gap-2">
                    <FileAudio className="w-6 h-6" />
                    Audio Recording
                  </CardTitle>
                  <CardDescription className="text-amber-600">
                    Record your story or upload audio files
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Recording Interface */}
                  <div className="text-center p-8 border-2 border-dashed border-amber-300 rounded-lg bg-amber-50">
                    <div className="mb-4">
                      <Button
                        type="button"
                        size="lg"
                        onClick={isRecording ? handleStopRecording : handleStartRecording}
                        className={`w-20 h-20 rounded-full ${
                          isRecording 
                            ? 'bg-red-500 hover:bg-red-600' 
                            : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700'
                        } text-white shadow-lg`}
                      >
                        {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                      </Button>
                    </div>
                    <p className="text-amber-800 font-medium mb-2">
                      {isRecording ? 'Recording...' : 'Click to start recording'}
                    </p>
                    {isRecording && (
                      <p className="text-amber-600">
                        Recording time: {formatTime(recordingTime)}
                      </p>
                    )}
                  </div>

                  {/* Existing Recordings */}
                  {recordings.length > 0 && (
                    <div>
                      <h4 className="font-medium text-amber-800 mb-3">Your Recordings</h4>
                      <div className="space-y-2">
                        {recordings.map((recording) => (
                          <div key={recording.id} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <FileAudio className="w-4 h-4 text-amber-600" />
                              <div>
                                <p className="font-medium text-amber-800">{recording.name}</p>
                                <p className="text-sm text-amber-600">{formatTime(recording.duration)} • {recording.size}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="text-amber-600"
                              >
                                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setRecordings(prev => prev.filter(r => r.id !== recording.id))}
                                className="text-red-600"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Upload Audio */}
                  <div>
                    <Label className="text-amber-800 mb-2 block">Upload Audio File</Label>
                    <div className="border-2 border-dashed border-amber-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                      <p className="text-amber-700 mb-2">Drop audio files here or click to browse</p>
                      <p className="text-sm text-amber-600">Supported formats: MP3, WAV, M4A (max 50MB)</p>
                      <input
                        type="file"
                        accept="audio/*"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          // Handle audio file upload
                          toast({
                            title: "Audio uploaded",
                            description: "Your audio file has been uploaded successfully",
                          });
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mixed">
              <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm mb-6">
                <CardHeader>
                  <CardTitle className="text-2xl text-amber-800 flex items-center gap-2">
                    <Camera className="w-6 h-6" />
                    Mixed Media
                  </CardTitle>
                  <CardDescription className="text-amber-600">
                    Combine text, audio, and images to tell your story
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Text Content */}
                  <div>
                    <Label htmlFor="mixedStoryText" className="text-amber-800">Story Text</Label>
                    <Textarea
                      id="mixedStoryText"
                      value={formData.storyText}
                      onChange={(e) => handleInputChange('storyText', e.target.value)}
                      placeholder="Tell your story here..."
                      className="border-amber-200 focus:border-amber-400 min-h-[200px]"
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <Label className="text-amber-800 mb-2 block">Images</Label>
                    <div className="border-2 border-dashed border-amber-300 rounded-lg p-6 text-center">
                      <Image className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                      <p className="text-amber-700 mb-2">Upload images to accompany your story</p>
                      <p className="text-sm text-amber-600">Supported formats: JPG, PNG, GIF (max 10MB each)</p>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="mt-2"
                        onClick={() => document.querySelector('input[type="file"][accept="image/*"]').click()}
                      >
                        Choose Images
                      </Button>
                    </div>
                  </div>

                  {/* Preview Images */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {images.map((image) => (
                        <div key={image.id} className="relative">
                          <img
                            src={image.url}
                            alt={image.name}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute top-1 right-1 text-red-600 bg-white/80 hover:bg-white"
                            onClick={() => setImages(prev => prev.filter(img => img.id !== image.id))}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Additional Information */}
            <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm mb-6">
              <CardHeader>
                <CardTitle className="text-2xl text-amber-800">Additional Information</CardTitle>
                <CardDescription className="text-amber-600">
                  Help us understand the cultural context of your story
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="narrator" className="text-amber-800">Narrator/Storyteller</Label>
                    <Input
                      id="narrator"
                      value={formData.narrator}
                      onChange={(e) => handleInputChange('narrator', e.target.value)}
                      placeholder="e.g., Elder John Smith"
                      className="border-amber-200 focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="submitterName" className="text-amber-800">Your Name *</Label>
                    <Input
                      id="submitterName"
                      value={formData.submitterName}
                      onChange={(e) => handleInputChange('submitterName', e.target.value)}
                      placeholder="Your full name"
                      className="border-amber-200 focus:border-amber-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="submitterEmail" className="text-amber-800">Email Address *</Label>
                  <Input
                    id="submitterEmail"
                    type="email"
                    value={formData.submitterEmail}
                    onChange={(e) => handleInputChange('submitterEmail', e.target.value)}
                    placeholder="your.email@example.com"
                    className="border-amber-200 focus:border-amber-400"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="culturalContext" className="text-amber-800">Cultural Context</Label>
                  <Textarea
                    id="culturalContext"
                    value={formData.culturalContext}
                    onChange={(e) => handleInputChange('culturalContext', e.target.value)}
                    placeholder="Any additional context about the cultural significance of this story..."
                    className="border-amber-200 focus:border-amber-400 min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Permissions & Terms */}
            <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm mb-6">
              <CardHeader>
                <CardTitle className="text-2xl text-amber-800 flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  Permissions & Terms
                </CardTitle>
                <CardDescription className="text-amber-600">
                  Please confirm your rights and permissions for this story
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="permissions"
                    checked={formData.permissions}
                    onCheckedChange={(checked) => handleInputChange('permissions', checked)}
                    className="mt-1"
                  />
                  <Label htmlFor="permissions" className="text-amber-800 leading-relaxed">
                    I have the right to share this story and represent that I am authorized by my community or cultural group to submit this content.
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="attribution"
                    checked={formData.attribution}
                    onCheckedChange={(checked) => handleInputChange('attribution', checked)}
                    className="mt-1"
                  />
                  <Label htmlFor="attribution" className="text-amber-800 leading-relaxed">
                    I agree to proper attribution and acknowledge that this story will be credited to the source community and narrator.
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="respectfulUse"
                    checked={formData.respectfulUse}
                    onCheckedChange={(checked) => handleInputChange('respectfulUse', checked)}
                    className="mt-1"
                  />
                  <Label htmlFor="respectfulUse" className="text-amber-800 leading-relaxed">
                    I understand that this story will be used respectfully for cultural preservation and educational purposes.
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Submit Section */}
            <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                {isSubmitting && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-amber-800">Uploading story...</span>
                      <span className="text-amber-600">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}
                
                <div className="flex items-center justify-center gap-4">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting || !formData.permissions || !formData.attribution || !formData.respectfulUse}
                    className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5 mr-2" />
                        Submit Story
                      </>
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="border-amber-300 text-amber-700 hover:bg-amber-100"
                    onClick={() => {
                      // Reset form
                      window.location.reload();
                    }}
                  >
                    Reset Form
                  </Button>
                </div>
                
                <p className="text-center text-sm text-amber-600 mt-4">
                  Your story will be reviewed by our cultural advisors before being published.
                </p>
              </CardContent>
            </Card>
          </Tabs>
        </form>
      </div>
    </div>
  );
};

export default Submit;