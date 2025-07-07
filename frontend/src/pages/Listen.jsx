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
  AudioLines,
  Radio,
  Waves,
  Zap
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';

// Import animated components
import ScrollAnimationWrapper from '../components/ScrollAnimationWrapper';
import InteractiveCard from '../components/InteractiveCard';
import AnimatedText from '../components/AnimatedText';
import FloatingElements from '../components/FloatingElements';

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
  const [pulseIntensity, setPulseIntensity] = useState(0);
  const { toast } = useToast();

  // Enhanced waveform animation
  useEffect(() => {
    let interval;
    if (isListening) {
      interval = setInterval(() => {
        const newWaveform = Array.from({ length: 32 }, () => Math.random() * 100);
        setVoiceWaveform(newWaveform);
        setPulseIntensity(Math.random() * 50 + 25);
      }, 100);
    } else {
      setVoiceWaveform([]);
      setPulseIntensity(0);
    }
    return () => clearInterval(interval);
  }, [isListening]);

  const languages = [
    { value: 'english', label: 'English', flag: '🇺🇸' },
    { value: 'khasi', label: 'Khasi', flag: '🇮🇳' },
    { value: 'maori', label: 'Te Reo Maori', flag: '🇳🇿' },
    { value: 'cherokee', label: 'Cherokee', flag: '🇺🇸' },
    { value: 'inuktitut', label: 'Inuktitut', flag: '🇨🇦' },
    { value: 'zulu', label: 'isiZulu', flag: '🇿🇦' },
    { value: 'aboriginal', label: 'Aboriginal', flag: '🇦🇺' }
  ];

  const cultures = [
    { value: 'any', label: 'Any Culture', icon: '🌍' },
    { value: 'khasi', label: 'Khasi', icon: '🏔️' },
    { value: 'maori', label: 'Maori', icon: '🌿' },
    { value: 'cherokee', label: 'Cherokee', icon: '🦅' },
    { value: 'inuit', label: 'Inuit', icon: '❄️' },
    { value: 'zulu', label: 'Zulu', icon: '🦁' },
    { value: 'aboriginal', label: 'Aboriginal Australian', icon: '🪃' }
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
      title: "🎙️ Listening...",
      description: "Speak your question about stories or folklore",
    });

    // Enhanced simulation with more realistic timing
    setTimeout(() => {
      const randomQuery = suggestedQueries[Math.floor(Math.random() * suggestedQueries.length)];
      setUserMessage(randomQuery);
      setIsListening(false);
      setIsProcessing(true);
      
      setTimeout(() => {
        setIsProcessing(false);
        setIsResponding(true);
        handleAiResponse(randomQuery);
      }, 2000 + Math.random() * 1000);
    }, 3000 + Math.random() * 2000);
  };

  const handleStopListening = () => {
    setIsListening(false);
    setIsProcessing(false);
    setIsResponding(false);
    toast({
      title: "⏹️ Stopped listening", 
      description: "Voice input has been cancelled",
    });
  };

  const handleAiResponse = (query) => {
    const responses = {
      "Tell me a story about the moon": "I'd be delighted to share 'The Moon's Daughter' - a beautiful Khasi story about a young woman born from the moon's tears, blessed with the power to bring rain to drought-stricken lands. This tale teaches us about sacrifice and compassion. Would you like me to tell you this story in its original Khasi language?",
      "Do you know any stories about animals?": "Yes! I have many wonderful animal stories. There's 'The Wise Elephant' from Zulu tradition, about an elderly matriarch who leads her herd to safety during a terrible drought using ancient knowledge. Or 'The Talking Tree' from Maori culture, where a kauri tree gains speech to share wisdom. Which would you prefer to hear?",
      "Share a wisdom tale from the elders": "Here's a cherished Cherokee wisdom tale: 'The River Spirit's Gift' tells of a young boy who helps a river spirit during winter and receives a magical gift that saves his entire village from starvation. The moral teaches us that helping others without expecting reward brings the greatest blessings. Shall I tell this story in Cherokee with English translation?",
      "What stories do you have about nature?": "I have beautiful nature stories from around the world! From the Inuit, there's 'The Dancing Stars' about how the Northern Lights came to dance in the sky. From Aboriginal Australia, 'The Singing Stones' tells how certain rocks in the desert learned to sing and guide lost travelers to safety. Which culture's connection to nature interests you most?",
      "Tell me about creation myths": "I have profound creation myths! The Khasi 'Moon's Daughter' explains how rain first came to earth through a moon goddess's sacrifice. The Aboriginal 'Singing Stones' is a Dreamtime story about how the world was sung into existence by ancestral spirits. These stories reveal how different cultures understand the birth of our world. Which creation story calls to you?",
      "Do you have any stories about heroes?": "Absolutely! There's the Cherokee 'River Spirit's Gift' about a brave young boy whose kindness saves his people, and the Zulu 'Wise Elephant' about a heroic matriarch whose wisdom preserves her family. Both show that heroism comes in many forms - through compassion, wisdom, and selfless action. Which type of heroism would you like to explore?"
    };
    
    const response = responses[query] || "I have a treasure trove of stories from indigenous cultures worldwide. Each tale carries wisdom passed down through generations. Could you tell me what themes or emotions you're drawn to? Are you seeking stories of love, courage, wisdom, or perhaps the magic of the natural world? I can also share stories in their original languages with translations.";
    
    // Enhanced typing animation
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
          title: "✨ Story suggestions ready",
          description: "I've found some wonderful stories that might interest you",
        });
      }
    }, 30 + Math.random() * 20);
  };

  const handleQuickQuery = (query) => {
    setUserMessage(query);
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsResponding(true);
      handleAiResponse(query);
    }, 1000 + Math.random() * 500);
  };

  return (
    <div className="min-h-screen relative py-8 overflow-hidden">
      <FloatingElements />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <ScrollAnimationWrapper animation="fadeInUp">
          <div className="text-center mb-12">
            <div className="relative inline-block mb-8">
              {/* Animated headphones icon */}
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center shadow-2xl animate-levitate">
                  <Headphones className="w-12 h-12 text-white animate-pulse" />
                </div>
                {/* Glow rings */}
                <div className="absolute inset-0 w-24 h-24 bg-amber-400 rounded-full opacity-30 blur-xl animate-ping"></div>
                <div className="absolute inset-0 w-24 h-24 bg-orange-400 rounded-full opacity-20 blur-2xl animate-pulse"></div>
              </div>
              
              {/* Floating sound waves */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-amber-400 rounded-full animate-float opacity-60"
                  style={{
                    left: `${50 + Math.cos(i * Math.PI / 4) * 60}%`,
                    top: `${50 + Math.sin(i * Math.PI / 4) * 60}%`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: `${2 + i * 0.3}s`
                  }}
                />
              ))}
            </div>
            
            <AnimatedText
              text="Voice Assistant"
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-800 via-orange-800 to-red-800 bg-clip-text text-transparent mb-6"
              animation="gradient"
            />
            
            <AnimatedText
              text="Ask me about stories, folklore, or myths from any culture. I'll help you discover the perfect tale to listen to."
              className="text-xl text-amber-600 max-w-3xl mx-auto"
              animation="splitWords"
              delay={500}
            />
          </div>
        </ScrollAnimationWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Voice Interface */}
          <div className="lg:col-span-2">
            {/* Enhanced Voice Controls */}
            <ScrollAnimationWrapper animation="scaleIn" delay={200}>
              <InteractiveCard className="mb-8 overflow-hidden" tiltIntensity={5}>
                <CardHeader className="text-center relative">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="w-full h-full bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 animate-gradient-x"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <CardTitle className="text-3xl text-amber-800 mb-4">
                      {isListening ? (
                        <AnimatedText text="🎙️ Listening..." animation="pulse" />
                      ) : isProcessing ? (
                        <AnimatedText text="🧠 Processing..." animation="bounce" />
                      ) : isResponding ? (
                        <AnimatedText text="💭 Responding..." animation="typewriter" speed={80} />
                      ) : (
                        <AnimatedText text="✨ Ready to Listen" animation="fadeIn" />
                      )}
                    </CardTitle>
                    
                    <CardDescription className="text-amber-600 text-lg">
                      {isListening ? 'Speak your question about stories or folklore' : 
                       isProcessing ? 'Understanding your request and finding the perfect stories...' :
                       isResponding ? 'Preparing personalized story suggestions...' :
                       'Click the microphone to start your magical storytelling journey'}
                    </CardDescription>
                  </div>
                </CardHeader>
                
                <CardContent className="text-center relative z-10">
                  {/* Enhanced Voice Waveform */}
                  {isListening && (
                    <div className="flex items-end justify-center gap-1 mb-8 h-24 relative">
                      {voiceWaveform.map((height, i) => (
                        <div
                          key={i}
                          className="bg-gradient-to-t from-amber-600 via-orange-500 to-red-500 rounded-full transition-all duration-150 shadow-lg"
                          style={{
                            width: '4px',
                            height: `${Math.max(height, 10)}%`,
                            animationDelay: `${i * 20}ms`,
                            transform: `scaleY(${1 + Math.sin(Date.now() * 0.01 + i) * 0.3})`
                          }}
                        />
                      ))}
                      
                      {/* Pulse effect */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-xl blur-xl animate-pulse"
                        style={{ transform: `scale(${1 + pulseIntensity * 0.01})` }}
                      />
                    </div>
                  )}
                  
                  {/* Enhanced Main Voice Button */}
                  <div className="mb-8 relative">
                    <div className="relative inline-block">
                      {/* Button glow rings */}
                      <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                        isListening 
                          ? 'bg-red-400 animate-ping' 
                          : 'bg-amber-400 animate-pulse'
                      } opacity-30 blur-xl scale-150`}></div>
                      
                      <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                        isListening 
                          ? 'bg-red-500 animate-pulse' 
                          : 'bg-orange-500 animate-pulse'
                      } opacity-20 blur-lg scale-125`}></div>
                      
                      <Button
                        size="lg"
                        onClick={isListening ? handleStopListening : handleStartListening}
                        disabled={isProcessing || isResponding}
                        className={`relative w-32 h-32 rounded-full text-white shadow-2xl transition-all duration-500 hover:shadow-3xl transform hover:scale-110 ${
                          isListening 
                            ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 animate-pulse' 
                            : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700'
                        }`}
                      >
                        {isProcessing || isResponding ? (
                          <div className="relative">
                            <Loader2 className="w-12 h-12 animate-spin" />
                            <div className="absolute inset-0 w-12 h-12 bg-white rounded-full opacity-20 blur-lg animate-pulse"></div>
                          </div>
                        ) : isListening ? (
                          <div className="relative">
                            <MicOff className="w-12 h-12 animate-pulse" />
                            <Waves className="absolute -top-2 -right-2 w-6 h-6 text-red-300 animate-bounce" />
                          </div>
                        ) : (
                          <div className="relative">
                            <Mic className="w-12 h-12" />
                            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-amber-300 animate-pulse" />
                          </div>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Enhanced Status Messages */}
                  {userMessage && (
                    <ScrollAnimationWrapper animation="slideUp">
                      <InteractiveCard className="mb-6 bg-amber-50/80 backdrop-blur-sm">
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Mic className="w-5 h-5 text-amber-600" />
                            <p className="text-amber-800 font-semibold">You asked:</p>
                          </div>
                          <p className="text-amber-700 italic">"{userMessage}"</p>
                        </div>
                      </InteractiveCard>
                    </ScrollAnimationWrapper>
                  )}
                  
                  {aiResponse && (
                    <ScrollAnimationWrapper animation="slideUp">
                      <InteractiveCard className="mb-6 bg-orange-50/80 backdrop-blur-sm">
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <AudioLines className="w-5 h-5 text-orange-600 animate-pulse" />
                            <p className="text-orange-800 font-semibold">FolkloreGPT suggests:</p>
                          </div>
                          <p className="text-orange-700 leading-relaxed">{aiResponse}</p>
                        </div>
                      </InteractiveCard>
                    </ScrollAnimationWrapper>
                  )}

                  {/* Enhanced Volume Control */}
                  <div className="flex items-center justify-center gap-4 mt-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-amber-600 hover:bg-amber-100/50 transition-all duration-300 hover:scale-110"
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5 animate-pulse" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </Button>
                    
                    <div className="w-40 relative group">
                      <Progress 
                        value={isMuted ? 0 : volume * 100} 
                        className="h-3 cursor-pointer transition-all duration-300 group-hover:h-4"
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const percent = (e.clientX - rect.left) / rect.width;
                          setVolume(percent);
                          setIsMuted(false);
                        }}
                      />
                      {/* Volume level indicator */}
                      <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-xs text-amber-600 bg-white/80 px-2 py-1 rounded backdrop-blur-sm">
                          {Math.round(volume * 100)}%
                        </span>
                      </div>
                    </div>
                    
                    <span className="text-sm text-amber-600 font-medium min-w-[3rem]">
                      {Math.round(volume * 100)}%
                    </span>
                  </div>
                </CardContent>
              </InteractiveCard>
            </ScrollAnimationWrapper>

            {/* Enhanced Quick Queries */}
            <ScrollAnimationWrapper animation="fadeInUp" delay={400}>
              <InteractiveCard className="mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl text-amber-800 flex items-center gap-3">
                    <MessageCircle className="w-6 h-6 animate-pulse" />
                    <AnimatedText text="Quick Questions" animation="fadeIn" />
                    <Zap className="w-5 h-5 text-yellow-500 animate-bounce" />
                  </CardTitle>
                  <CardDescription className="text-amber-600 text-lg">
                    Try these magical questions to begin your storytelling adventure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {suggestedQueries.map((query, index) => (
                      <ScrollAnimationWrapper key={index} animation="fadeInUp" delay={index * 100}>
                        <div className="relative group">
                          <Button
                            variant="outline"
                            className="w-full border-amber-300/50 text-amber-700 hover:bg-amber-100/50 h-auto py-4 text-left justify-start transition-all duration-300 hover:scale-105 hover:shadow-lg relative z-10 backdrop-blur-sm"
                            onClick={() => handleQuickQuery(query)}
                            disabled={isListening || isProcessing || isResponding}
                          >
                            <Radio className="w-4 h-4 mr-3 animate-pulse flex-shrink-0" />
                            <span className="leading-relaxed">{query}</span>
                            <Sparkles className="w-4 h-4 ml-auto text-amber-500 group-hover:animate-spin" />
                          </Button>
                          {/* Button glow */}
                          <div className="absolute inset-0 bg-amber-300 rounded-lg opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
                        </div>
                      </ScrollAnimationWrapper>
                    ))}
                  </div>
                </CardContent>
              </InteractiveCard>
            </ScrollAnimationWrapper>

            {/* Enhanced Conversation History */}
            {conversationHistory.length > 0 && (
              <ScrollAnimationWrapper animation="slideUp" delay={600}>
                <InteractiveCard>
                  <CardHeader>
                    <CardTitle className="text-2xl text-amber-800 flex items-center gap-3">
                      <AudioLines className="w-6 h-6 animate-pulse" />
                      Conversation History
                      <Badge className="bg-amber-100 text-amber-800">
                        {conversationHistory.length / 2} exchanges
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                      {conversationHistory.map((item, index) => (
                        <ScrollAnimationWrapper key={index} animation="fadeInLeft" delay={index * 50}>
                          <div className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                            item.type === 'user' 
                              ? 'bg-amber-50/80 border-l-4 border-amber-400 hover:bg-amber-100/80' 
                              : 'bg-orange-50/80 border-l-4 border-orange-400 hover:bg-orange-100/80'
                          } backdrop-blur-sm`}>
                            <div className="flex items-center gap-3 mb-2">
                              {item.type === 'user' ? (
                                <Mic className="w-5 h-5 text-amber-600" />
                              ) : (
                                <AudioLines className="w-5 h-5 text-orange-600 animate-pulse" />
                              )}
                              <span className="font-semibold text-amber-800">
                                {item.type === 'user' ? 'You' : 'FolkloreGPT'}
                              </span>
                              <span className="text-xs text-amber-500 ml-auto">
                                {item.timestamp.toLocaleTimeString()}
                              </span>
                            </div>
                            <p className="text-amber-700 leading-relaxed">{item.message}</p>
                          </div>
                        </ScrollAnimationWrapper>
                      ))}
                    </div>
                  </CardContent>
                </InteractiveCard>
              </ScrollAnimationWrapper>
            )}
          </div>

          {/* Enhanced Settings Sidebar */}
          <div className="lg:col-span-1">
            {/* Voice Settings */}
            <ScrollAnimationWrapper animation="fadeInRight" delay={300}>
              <InteractiveCard className="mb-8" glowColor="amber">
                <CardHeader>
                  <CardTitle className="text-xl text-amber-800 flex items-center gap-3">
                    <Settings className="w-5 h-5 animate-pulse" />
                    Voice Settings
                    <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="relative group">
                    <label className="text-sm font-medium text-amber-800 mb-2 block">
                      🗣️ Response Language
                    </label>
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger className="border-amber-200/50 hover:border-amber-400 transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-white/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="backdrop-blur-md bg-white/90">
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            <span className="flex items-center gap-2">
                              <span>{lang.flag}</span>
                              {lang.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="relative group">
                    <label className="text-sm font-medium text-amber-800 mb-2 block">
                      🌍 Preferred Culture
                    </label>
                    <Select value={selectedCulture} onValueChange={setSelectedCulture}>
                      <SelectTrigger className="border-amber-200/50 hover:border-amber-400 transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-white/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="backdrop-blur-md bg-white/90">
                        {cultures.map((culture) => (
                          <SelectItem key={culture.value} value={culture.value}>
                            <span className="flex items-center gap-2">
                              <span>{culture.icon}</span>
                              {culture.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="relative group">
                    <label className="text-sm font-medium text-amber-800 mb-2 block">
                      ⚡ Response Speed
                    </label>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-amber-600">Slow</span>
                      <Progress value={75} className="flex-1 h-3 cursor-pointer transition-all duration-300 group-hover:h-4" />
                      <span className="text-xs text-amber-600">Fast</span>
                    </div>
                  </div>
                </CardContent>
              </InteractiveCard>
            </ScrollAnimationWrapper>

            {/* Enhanced Tips */}
            <ScrollAnimationWrapper animation="fadeInRight" delay={500}>
              <InteractiveCard className="bg-gradient-to-br from-amber-50/80 to-orange-50/80">
                <CardHeader>
                  <CardTitle className="text-xl text-amber-800 flex items-center gap-3">
                    <Sparkles className="w-5 h-5 animate-spin" />
                    Magic Tips
                    <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm text-amber-700">
                    {[
                      { icon: Globe, text: "Ask for stories from specific cultures or regions for authentic experiences" },
                      { icon: Heart, text: "Request stories with particular themes, emotions, or moral lessons" },
                      { icon: Languages, text: "Ask for stories in native languages with beautiful translations" },
                      { icon: PlayCircle, text: "Say 'play' or 'tell me' to start listening to enchanting audio stories" }
                    ].map((tip, index) => (
                      <ScrollAnimationWrapper key={index} animation="fadeInUp" delay={index * 100}>
                        <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/50 transition-all duration-300 hover:scale-105 group">
                          <tip.icon className="w-5 h-5 mt-0.5 text-amber-600 group-hover:animate-pulse flex-shrink-0" />
                          <p className="leading-relaxed">{tip.text}</p>
                        </div>
                      </ScrollAnimationWrapper>
                    ))}
                  </div>
                </CardContent>
              </InteractiveCard>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listen;