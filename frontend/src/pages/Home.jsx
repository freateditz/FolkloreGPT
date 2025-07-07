import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Mic, 
  BookOpen, 
  Globe, 
  Heart, 
  Headphones, 
  Users, 
  Shield, 
  Sparkles,
  PlayCircle,
  Upload,
  Star,
  Languages,
  TreePine,
  Volume2
} from 'lucide-react';

// Import new animated components
import AnimatedBackground from '../components/AnimatedBackground';
import ScrollAnimationWrapper from '../components/ScrollAnimationWrapper';
import InteractiveCard from '../components/InteractiveCard';
import FloatingElements from '../components/FloatingElements';
import AnimatedText from '../components/AnimatedText';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: Mic,
      title: "Voice Interaction",
      description: "Simply ask for a story and listen to folklore in native languages",
      color: "bg-red-500",
      gradient: "from-red-500 to-pink-500"
    },
    {
      icon: Globe,
      title: "Cultural Preservation",
      description: "Helping preserve endangered languages and oral traditions",
      color: "bg-amber-500",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: BookOpen,
      title: "Story Library",
      description: "Explore thousands of stories from cultures around the world",
      color: "bg-orange-500",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Stories shared by indigenous communities and cultural keepers",
      color: "bg-red-600",
      gradient: "from-red-600 to-rose-600"
    }
  ];

  const recentStories = [
    {
      title: "The Moon's Daughter",
      culture: "Khasi",
      region: "Northeast India",
      duration: "8 min",
      listeners: "2.3k",
      rating: 4.9
    },
    {
      title: "The Talking Tree",
      culture: "Maori",
      region: "New Zealand",
      duration: "12 min",
      listeners: "1.8k",
      rating: 4.7
    },
    {
      title: "River Spirit's Gift",
      culture: "Cherokee",
      region: "North America",
      duration: "15 min",
      listeners: "3.1k",
      rating: 4.8
    }
  ];

  const stats = [
    { number: "50+", label: "Languages Preserved", icon: Languages },
    { number: "1,200+", label: "Stories Shared", icon: BookOpen },
    { number: "25k+", label: "Community Members", icon: Users }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      <FloatingElements />

      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="container mx-auto text-center relative z-10">
          <ScrollAnimationWrapper animation="fadeInUp">
            <div className="flex justify-center mb-8">
              <Badge className="bg-red-100/80 text-red-800 border-red-200/50 backdrop-blur-sm px-6 py-3 text-lg animate-pulse-glow">
                <Heart className="w-5 h-5 mr-2 animate-pulse" />
                Preserving Cultural Heritage
              </Badge>
            </div>
          </ScrollAnimationWrapper>
          
          <div className="mb-8">
            <AnimatedText 
              text="FolkloreGPT" 
              className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent"
              animation="gradient"
            />
          </div>
          
          <ScrollAnimationWrapper animation="fadeInUp" delay={500}>
            <AnimatedText
              text="AI-powered voice assistant that tells indigenous folklore and myths in local dialects"
              className="text-xl md:text-3xl text-amber-700/90 mb-6 max-w-4xl mx-auto font-medium"
              animation="splitWords"
              delay={1000}
            />
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="fadeInUp" delay={1000}>
            <p className="text-lg text-amber-600/80 mb-12 max-w-2xl mx-auto backdrop-blur-sm">
              Preserving endangered languages and stories through the power of voice and AI technology
            </p>
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="scaleIn" delay={1500}>
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <Button 
                  size="lg" 
                  className="relative bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-10 py-4 text-lg font-semibold rounded-xl transform transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <Link to="/listen">
                    <Headphones className="w-6 h-6 mr-3 animate-pulse" />
                    Start Listening
                  </Link>
                </Button>
              </div>
              
              <InteractiveCard className="inline-block">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-amber-300/50 text-amber-700 hover:bg-amber-100/50 backdrop-blur-sm px-10 py-4 text-lg font-semibold rounded-xl"
                  asChild
                >
                  <Link to="/stories">
                    <BookOpen className="w-6 h-6 mr-3" />
                    Browse Stories
                  </Link>
                </Button>
              </InteractiveCard>
            </div>
          </ScrollAnimationWrapper>

          {/* Animated Stats */}
          <ScrollAnimationWrapper animation="fadeInUp" delay={2000}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <InteractiveCard key={index} className="p-6 text-center" glowColor="amber">
                    <Icon className="w-8 h-8 text-amber-600 mx-auto mb-3 animate-float" />
                    <div className="text-4xl font-bold text-amber-800 mb-2 animate-levitate">
                      {stat.number}
                    </div>
                    <div className="text-amber-600 font-medium">{stat.label}</div>
                  </InteractiveCard>
                );
              })}
            </div>
          </ScrollAnimationWrapper>
        </div>

        {/* Floating 3D Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute w-32 h-32 bg-gradient-to-r from-amber-400/30 to-orange-400/30 rounded-full blur-xl animate-morphing"
            style={{
              left: `${20 + mousePosition.x * 0.1}%`,
              top: `${30 + mousePosition.y * 0.1}%`,
            }}
          />
          <div 
            className="absolute w-24 h-24 bg-gradient-to-r from-red-400/30 to-pink-400/30 rounded-full blur-xl animate-morphing"
            style={{
              right: `${20 + mousePosition.x * 0.05}%`,
              bottom: `${30 + mousePosition.y * 0.05}%`,
              animationDelay: '2s'
            }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="container mx-auto relative z-10">
          <ScrollAnimationWrapper animation="fadeInUp">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-amber-800 mb-6">
                Preserving Stories Through Technology
              </h2>
              <p className="text-xl text-amber-600 max-w-2xl mx-auto">
                Experience the magic of indigenous folklore with our AI-powered voice assistant
              </p>
            </div>
          </ScrollAnimationWrapper>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <ScrollAnimationWrapper 
                  key={index} 
                  animation="fadeInUp" 
                  delay={index * 200}
                >
                  <InteractiveCard 
                    className="p-8 h-full" 
                    glowColor={feature.color.includes('red') ? 'red' : 'amber'}
                    tiltIntensity={10}
                    hoverScale={1.08}
                  >
                    <div className="text-center">
                      <div className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center mx-auto mb-6 animate-levitate shadow-lg`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-amber-800 mb-4">{feature.title}</h3>
                      <p className="text-amber-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </InteractiveCard>
                </ScrollAnimationWrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Stories Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="container mx-auto relative z-10">
          <ScrollAnimationWrapper animation="fadeInUp">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-amber-800 mb-6">
                Recently Shared Stories
              </h2>
              <p className="text-xl text-amber-600">
                Discover the latest additions to our growing collection
              </p>
            </div>
          </ScrollAnimationWrapper>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentStories.map((story, index) => (
              <ScrollAnimationWrapper 
                key={index} 
                animation="rotateIn" 
                delay={index * 300}
              >
                <InteractiveCard 
                  className="group cursor-pointer h-full"
                  tiltIntensity={12}
                  hoverScale={1.05}
                >
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary" className="bg-amber-100/80 text-amber-800 backdrop-blur-sm">
                        {story.culture}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <PlayCircle className="w-6 h-6 text-amber-600 group-hover:text-amber-800 transition-colors animate-pulse" />
                        <Volume2 className="w-5 h-5 text-amber-500 animate-float" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-amber-800 group-hover:text-amber-900 transition-colors mb-3">
                      {story.title}
                    </h3>
                    
                    <p className="text-amber-600 mb-4">{story.region}</p>
                    
                    <div className="flex justify-between items-center text-sm text-amber-600 mb-4">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        {story.rating}
                      </span>
                      <span>{story.duration}</span>
                      <span>{story.listeners} listeners</span>
                    </div>
                    
                    <div className="w-full h-1 bg-amber-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-1000 group-hover:w-full"
                        style={{ width: `${Math.random() * 60 + 20}%` }}
                      />
                    </div>
                  </div>
                </InteractiveCard>
              </ScrollAnimationWrapper>
            ))}
          </div>
          
          <ScrollAnimationWrapper animation="scaleIn" delay={1000}>
            <div className="text-center mt-12">
              <InteractiveCard className="inline-block">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-amber-300/50 text-amber-700 hover:bg-amber-100/50 backdrop-blur-sm px-8 py-3 font-semibold"
                  asChild
                >
                  <Link to="/stories">
                    View All Stories
                    <Sparkles className="w-5 h-5 ml-2 animate-pulse" />
                  </Link>
                </Button>
              </InteractiveCard>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/90 via-orange-600/90 to-red-600/90 backdrop-blur-sm"></div>
        <div className="container mx-auto text-center relative z-10">
          <ScrollAnimationWrapper animation="fadeInUp">
            <div className="max-w-4xl mx-auto">
              <div className="animate-float mb-8">
                <Sparkles className="w-16 h-16 text-amber-100 mx-auto animate-pulse" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Share Your Cultural Heritage
              </h2>
              
              <p className="text-xl text-amber-100 mb-12 max-w-2xl mx-auto">
                Help preserve your community's stories and languages for future generations
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-white rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <Button 
                    size="lg" 
                    className="relative bg-white text-amber-800 hover:bg-amber-50 px-10 py-4 text-lg font-semibold rounded-xl transform transition-all duration-300 hover:scale-105"
                    asChild
                  >
                    <Link to="/submit">
                      <Upload className="w-6 h-6 mr-3 animate-bounce" />
                      Share Your Story
                    </Link>
                  </Button>
                </div>
                
                <InteractiveCard className="inline-block">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white/50 text-white hover:bg-white/10 backdrop-blur-sm px-10 py-4 text-lg font-semibold rounded-xl"
                    asChild
                  >
                    <Link to="/about">
                      <Shield className="w-6 h-6 mr-3 animate-pulse" />
                      Learn More
                    </Link>
                  </Button>
                </InteractiveCard>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>

        {/* Floating cultural symbols */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[TreePine, Globe, Heart, BookOpen].map((Icon, index) => (
            <Icon
              key={index}
              className="absolute text-white/20 animate-float-slow"
              size={60}
              style={{
                left: `${10 + index * 20}%`,
                top: `${20 + index * 15}%`,
                animationDelay: `${index * 1.5}s`,
                animationDuration: `${8 + index * 2}s`
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;