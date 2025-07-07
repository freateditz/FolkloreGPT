import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Settings,
  Headphones,
  Globe,
  Heart,
  Sparkles,
  MessageCircle,
  StopCircle,
  PlayCircle,
  Loader2,
  Languages,
  AudioLines
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Listen = () => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isResponding, setIsResponding] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [selectedCulture, setSelectedCulture] = useState('any');
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [voiceWaveform, setVoiceWaveform] = useState([]);
  const { toast } = useToast();

  // Simulate waveform animation
  useEffect(() => {
    let interval;
    if (isListening) {
      interval = setInterval(() => {
        setVoiceWaveform(prev => [
          ...prev.slice(-20),
          Math.random() * 100
        ]);
      }, 100);
    } else {
      setVoiceWaveform([]);
    }
    return () => clearInterval(interval);
  }, [isListening]);

  const languages = [
    { value: 'english', label: 'English' },
    { value: 'khasi', label: 'Khasi' },
    { value: 'maori', label: 'Te Reo Maori' },
    { value: 'cherokee', label: 'Cherokee' },
    { value: 'inuktitut', label: 'Inuktitut' },
    { value: 'zulu', label: 'isiZulu' },
    { value: 'aboriginal', label: 'Aboriginal' }
  ];

  const cultures = [
    { value: 'any', label: 'Any Culture' },
    { value: 'khasi', label: 'Khasi' },
    { value: 'maori', label: 'Maori' },
    { value: 'cherokee', label: 'Cherokee' },
    { value: 'inuit', label: 'Inuit' },
    { value: 'zulu', label: 'Zulu' },
    { value: 'aboriginal', label: 'Aboriginal Australian' }
  ];

  const suggestedQueries = [
    "Tell me a story about the moon",
    "Do you know any stories about animals?",
    "Share a wisdom tale from the elders",
    "What stories do you have about nature?",
    "Tell me about creation myths",
    "Do you have any stories about heroes?"
  ];

  const handleStartListening = async () => {
    setIsListening(true);
    setUserMessage('');
    setAiResponse('');
    
    toast({
      title: "Listening...",
      description: "Speak your question about stories or folklore",
    });

    // Simulate voice recognition
    setTimeout(() => {
      const randomQuery = suggestedQueries[Math.floor(Math.random() * suggestedQueries.length)];
      setUserMessage(randomQuery);
      setIsListening(false);
      setIsProcessing(true);
      
      setTimeout(() => {
        setIsProcessing(false);
        setIsResponding(true);
        handleAiResponse(randomQuery);
      }, 2000);
    }, 3000);
  };

  const handleStopListening = () => {
    setIsListening(false);
    setIsProcessing(false);
    setIsResponding(false);
    toast({
      title: "Stopped listening",
      description: "Voice input has been cancelled",
    });
  };

  const handleAiResponse = (query) => {
    const responses = {
      "Tell me a story about the moon": "I'd be happy to share 'The Moon's Daughter' - a beautiful Khasi story about a young woman born from the moon's tears. She was blessed with the power to bring rain to drought-stricken lands. Would you like me to tell you this story?",
      "Do you know any stories about animals?": "Yes! I have many animal stories. There's 'The Wise Elephant' from Zulu tradition, about an old elephant who leads her herd to safety during a drought. Or 'The Talking Tree' from Maori culture. Which would you prefer?",
      "Share a wisdom tale from the elders": "Here's a Cherokee wisdom tale: 'The River Spirit's Gift' tells of a young boy who helps a river spirit and receives a gift that saves his people through a harsh winter. The moral is that helping others without expecting reward brings unexpected blessings.",
      "What stories do you have about nature?": "I have wonderful nature stories! From the Inuit, there's 'The Dancing Stars' about how the Northern Lights came to be. From Aboriginal Australia, 'The Singing Stones' tells how certain rocks learned to sing and guide travelers. Which interests you?",
      "Tell me about creation myths": "I have beautiful creation myths! The Khasi 'Moon's Daughter' explains how rain came to earth. The Aboriginal 'Singing Stones' is a Dreamtime story about how the world was sung into existence. Which culture's creation story would you like to hear?",
      "Do you have any stories about heroes?": "Yes! There's the Cherokee 'River Spirit's Gift' about a brave young boy, and the Zulu 'Wise Elephant' about a heroic elephant matriarch. Both show different types of heroism - one through kindness, one through wisdom and leadership."
    };
    
    const response = responses[query] || "I have many wonderful stories from different cultures. Could you be more specific about what type of story you'd like to hear? I can tell you about creation myths, animal stories, wisdom tales, or heroic adventures from various indigenous cultures.";
    
    // Simulate AI typing
    let currentResponse = '';
    let i = 0;
    const interval = setInterval(() => {
      if (i < response.length) {
        currentResponse += response[i];
        setAiResponse(currentResponse);
        i++;
      } else {
        clearInterval(interval);
        setIsResponding(false);
        
        // Add to conversation history
        setConversationHistory(prev => [
          ...prev,
          { type: 'user', message: query, timestamp: new Date() },
          { type: 'ai', message: response, timestamp: new Date() }
        ]);
        
        toast({
          title: "Story suggestion ready",
          description: "I've found some stories that might interest you",
        });
      }
    }, 50);
  };

  const handleQuickQuery = (query) => {
    setUserMessage(query);
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsResponding(true);
      handleAiResponse(query);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-red-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
              <Headphones className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4">
            Voice Assistant
          </h1>
          <p className="text-lg text-amber-600 max-w-2xl mx-auto">
            Ask me about stories, folklore, or myths from any culture. I'll help you discover the perfect tale to listen to.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Voice Interface */}
          <div className="lg:col-span-2">
            {/* Voice Controls */}
            <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm mb-6">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-amber-800 mb-2">
                  {isListening ? 'Listening...' : isProcessing ? 'Processing...' : isResponding ? 'Responding...' : 'Ready to Listen'}
                </CardTitle>
                <CardDescription className="text-amber-600">
                  {isListening ? 'Speak your question about stories or folklore' : 
                   isProcessing ? 'Understanding your request...' :
                   isResponding ? 'Preparing story suggestions...' :
                   'Click the microphone to start your voice interaction'}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                {/* Voice Waveform */}
                {isListening && (
                  <div className="flex items-center justify-center gap-1 mb-6 h-16">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-2 bg-gradient-to-t from-amber-600 to-orange-600 rounded-full transition-all duration-150"
                        style={{
                          height: `${voiceWaveform[i] || 10}%`,
                          minHeight: '10%',
                          maxHeight: '100%'
                        }}
                      />
                    ))}
                  </div>
                )}
                
                {/* Main Voice Button */}
                <div className="mb-6">
                  <Button
                    size="lg"
                    onClick={isListening ? handleStopListening : handleStartListening}
                    disabled={isProcessing || isResponding}
                    className={`w-24 h-24 rounded-full ${
                      isListening 
                        ? 'bg-red-500 hover:bg-red-600' 
                        : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700'
                    } text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    {isProcessing || isResponding ? (
                      <Loader2 className="w-8 h-8 animate-spin" />
                    ) : isListening ? (
                      <MicOff className="w-8 h-8" />
                    ) : (
                      <Mic className="w-8 h-8" />
                    )}
                  </Button>
                </div>

                {/* Status Message */}
                {userMessage && (
                  <div className="bg-amber-50 rounded-lg p-4 mb-4">
                    <p className="text-amber-800 font-medium mb-2">You asked:</p>
                    <p className="text-amber-700">"{userMessage}"</p>
                  </div>
                )}
                
                {aiResponse && (
                  <div className="bg-orange-50 rounded-lg p-4 mb-4">
                    <p className="text-orange-800 font-medium mb-2">FolkloreGPT suggests:</p>
                    <p className="text-orange-700">{aiResponse}</p>
                  </div>
                )}

                {/* Volume Control */}
                <div className="flex items-center justify-center gap-4 mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-amber-600"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                  <div className="w-32">
                    <Progress value={isMuted ? 0 : volume * 100} className="h-2" />
                  </div>
                  <span className="text-sm text-amber-600">{Math.round(volume * 100)}%</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Queries */}
            <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm mb-6">
              <CardHeader>
                <CardTitle className="text-xl text-amber-800 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Quick Questions
                </CardTitle>
                <CardDescription className="text-amber-600">
                  Try these common questions to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {suggestedQueries.map((query, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="border-amber-300 text-amber-700 hover:bg-amber-100 h-auto py-3 text-left justify-start"
                      onClick={() => handleQuickQuery(query)}
                      disabled={isListening || isProcessing || isResponding}
                    >
                      <span className="truncate">{query}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Conversation History */}
            {conversationHistory.length > 0 && (
              <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-amber-800">
                    Conversation History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {conversationHistory.map((item, index) => (
                      <div key={index} className={`p-3 rounded-lg ${
                        item.type === 'user' 
                          ? 'bg-amber-50 border-l-4 border-amber-400' 
                          : 'bg-orange-50 border-l-4 border-orange-400'
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          {item.type === 'user' ? (
                            <Mic className="w-4 h-4 text-amber-600" />
                          ) : (
                            <AudioLines className="w-4 h-4 text-orange-600" />
                          )}
                          <span className="text-sm font-medium text-amber-800">
                            {item.type === 'user' ? 'You' : 'FolkloreGPT'}
                          </span>
                          <span className="text-xs text-amber-500">
                            {item.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-amber-700 text-sm">{item.message}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Settings Sidebar */}
          <div className="lg:col-span-1">
            {/* Voice Settings */}
            <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm mb-6">
              <CardHeader>
                <CardTitle className="text-xl text-amber-800 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Voice Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-amber-800 mb-2 block">
                    Response Language
                  </label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-amber-800 mb-2 block">
                    Preferred Culture
                  </label>
                  <Select value={selectedCulture} onValueChange={setSelectedCulture}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cultures.map((culture) => (
                        <SelectItem key={culture.value} value={culture.value}>
                          {culture.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-amber-800 mb-2 block">
                    Response Speed
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-amber-600">Slow</span>
                    <Progress value={75} className="flex-1 h-2" />
                    <span className="text-xs text-amber-600">Fast</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-amber-800 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-amber-700">
                  <div className="flex items-start gap-2">
                    <Globe className="w-4 h-4 mt-0.5 text-amber-600" />
                    <p>Ask for stories from specific cultures or regions</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Heart className="w-4 h-4 mt-0.5 text-amber-600" />
                    <p>Request stories with particular themes or morals</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Languages className="w-4 h-4 mt-0.5 text-amber-600" />
                    <p>Ask for stories in native languages with translations</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <PlayCircle className="w-4 h-4 mt-0.5 text-amber-600" />
                    <p>Say "play" or "tell me" to start listening to a story</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listen;