import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Separator } from '../components/ui/separator';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Repeat, 
  Share2, 
  Heart, 
  Download,
  Clock,
  Users,
  Star,
  Globe,
  BookOpen,
  ChevronLeft,
  Headphones,
  FileText
} from 'lucide-react';
import { mockStories } from '../utils/mockData';
import { useToast } from '../hooks/use-toast';

const StoryDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(480); // 8 minutes in seconds
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const audioRef = useRef(null);

  const story = mockStories.find(s => s.id === parseInt(id));

  useEffect(() => {
    // Simulate audio progress
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  if (!story) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-amber-800 mb-4">Story Not Found</h2>
          <Button asChild>
            <Link to="/stories">Back to Stories</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    toast({
      title: isPlaying ? "Paused" : "Playing",
      description: `${story.title} ${isPlaying ? "paused" : "is now playing"}`,
    });
  };

  const handleSeek = (value) => {
    setCurrentTime(value);
  };

  const handleVolumeChange = (value) => {
    setVolume(value);
    setIsMuted(value === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: `${story.title} ${isLiked ? "removed from" : "added to"} your favorites`,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Story link has been copied to your clipboard",
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const relatedStories = mockStories.filter(s => 
    s.id !== story.id && 
    (s.culture === story.culture || s.category === story.category)
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-red-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6 text-amber-700 hover:text-amber-800 hover:bg-amber-100"
          asChild
        >
          <Link to="/stories">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Stories
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Story Header */}
            <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm mb-8">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                      {story.culture}
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                      {story.language}
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                      {story.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLike}
                      className={isLiked ? 'text-red-600' : 'text-amber-600'}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleShare}
                      className="text-amber-600"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <CardTitle className="text-3xl md:text-4xl font-bold text-amber-800 mb-3">
                  {story.title}
                </CardTitle>
                
                <CardDescription className="text-lg text-amber-600 mb-4">
                  {story.region} • Narrated by {story.narrator}
                </CardDescription>
                
                <div className="flex items-center gap-6 text-sm text-amber-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{story.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{story.listeners} listeners</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>{story.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Headphones className="w-4 h-4" />
                    <span>{story.difficulty}</span>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Audio Player */}
            <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm mb-8">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <Progress 
                      value={(currentTime / duration) * 100} 
                      className="h-2 cursor-pointer"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const percent = (e.clientX - rect.left) / rect.width;
                        handleSeek(Math.floor(percent * duration));
                      }}
                    />
                    <div className="flex justify-between text-sm text-amber-600">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                  
                  {/* Controls */}
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSeek(Math.max(0, currentTime - 30))}
                      className="text-amber-600"
                    >
                      <SkipBack className="w-5 h-5" />
                    </Button>
                    
                    <Button
                      size="lg"
                      onClick={handlePlayPause}
                      className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-full w-16 h-16"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSeek(Math.min(duration, currentTime + 30))}
                      className="text-amber-600"
                    >
                      <SkipForward className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  {/* Volume Control */}
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleMute}
                      className="text-amber-600"
                    >
                      {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>
                    <div className="w-24">
                      <Progress 
                        value={isMuted ? 0 : volume * 100} 
                        className="h-1 cursor-pointer"
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const percent = (e.clientX - rect.left) / rect.width;
                          handleVolumeChange(percent);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Story Content */}
            <Tabs defaultValue="description" className="mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <p className="text-amber-700 text-lg leading-relaxed mb-6">
                      {story.description}
                    </p>
                    
                    <div className="bg-amber-50 rounded-lg p-4 mb-6">
                      <h4 className="font-semibold text-amber-800 mb-2">Moral of the Story</h4>
                      <p className="text-amber-700 italic">"{story.moral}"</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {story.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-amber-700 border-amber-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="transcript" className="mt-6">
                <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-amber-800">Story Transcript</h4>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                      <p className="text-amber-700 leading-relaxed whitespace-pre-line">
                        {story.transcript}
                        
                        {"\n\n"}The moon, seeing the suffering of the people below, wept tears of silver light. From these tears was born a beautiful daughter, blessed with the power to call forth the rains. She descended to earth, her hair flowing like clouds, her voice like distant thunder.
                        
                        {"\n\n"}When the people saw her, they knew she was different. Her skin glowed with moonlight, and wherever she walked, the earth became fertile. But the young woman had a choice to make - she could return to her mother moon, or stay and help the people who desperately needed rain.
                        
                        {"\n\n"}She chose to sacrifice her immortality, dancing in the fields until the clouds gathered and the rains came. Though she became mortal that day, her spirit lives on in every drop of rain that falls, reminding us that true nobility comes from putting others before ourselves.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="details" className="mt-6">
                <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-amber-800 mb-3">Story Information</h4>
                        <div className="space-y-2 text-sm text-amber-700">
                          <div className="flex justify-between">
                            <span>Duration:</span>
                            <span>{story.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Difficulty:</span>
                            <span>{story.difficulty}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Age Group:</span>
                            <span>{story.ageGroup}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Rating:</span>
                            <span>{story.rating}/5</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-amber-800 mb-3">Cultural Context</h4>
                        <div className="space-y-2 text-sm text-amber-700">
                          <div className="flex justify-between">
                            <span>Culture:</span>
                            <span>{story.culture}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Region:</span>
                            <span>{story.region}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Language:</span>
                            <span>{story.language}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Submitted by:</span>
                            <span>{story.submittedBy}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Narrator Info */}
            <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm mb-6">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-amber-100 text-amber-800">
                      {story.narrator.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg text-amber-800">
                      {story.narrator}
                    </CardTitle>
                    <CardDescription className="text-amber-600">
                      Traditional Storyteller
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Related Stories */}
            <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-amber-800">
                  Related Stories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedStories.map((relatedStory, index) => (
                  <Link key={relatedStory.id} to={`/story/${relatedStory.id}`}>
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-amber-50 transition-colors cursor-pointer">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-400 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-amber-800 text-sm line-clamp-1">
                          {relatedStory.title}
                        </h4>
                        <p className="text-xs text-amber-600 mt-1">
                          {relatedStory.culture} • {relatedStory.duration}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetail;