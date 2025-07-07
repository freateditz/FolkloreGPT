import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { 
  Heart, 
  Globe, 
  Users, 
  Shield, 
  BookOpen, 
  Mic, 
  Languages, 
  TreePine, 
  Star,
  Target,
  Lightbulb,
  Award,
  Handshake,
  ChevronRight,
  PlayCircle,
  Upload,
  Headphones,
  Sparkles,
  Zap,
  Eye,
  CheckCircle2,
  Rocket,
  Compass
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockStats } from '../utils/mockData';

// Import animated components
import ScrollAnimationWrapper from '../components/ScrollAnimationWrapper';
import InteractiveCard from '../components/InteractiveCard';
import AnimatedText from '../components/AnimatedText';
import FloatingElements from '../components/FloatingElements';

const About = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Cloudwalker",
      role: "Cultural Anthropologist",
      bio: "Cherokee scholar specializing in oral traditions and digital preservation",
      color: "from-red-500 to-pink-500",
      icon: "🌺"
    },
    {
      name: "Kai Tangaroa",
      role: "Maori Language Expert",
      bio: "Native speaker working on Te Reo Maori revitalization through technology",
      color: "from-blue-500 to-teal-500",
      icon: "🌿"
    },
    {
      name: "Dr. Aisha Kone",
      role: "AI Ethics Specialist",
      bio: "Ensuring respectful and ethical use of indigenous knowledge in AI systems",
      color: "from-purple-500 to-indigo-500",
      icon: "🔬"
    }
  ];

  const features = [
    {
      icon: Mic,
      title: "Voice-First Design",
      description: "Natural conversation in native languages with AI-powered understanding",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-500"
    },
    {
      icon: Languages,
      title: "Multilingual Support",
      description: "Preserving stories in original languages with optional translations",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-500"
    },
    {
      icon: Shield,
      title: "Cultural Respect",
      description: "Community-approved content with proper attribution and context",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Making indigenous stories accessible worldwide while respecting origins",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500"
    }
  ];

  const impacts = [
    {
      icon: BookOpen,
      title: "Stories Preserved",
      value: mockStats.totalStories,
      description: "Traditional stories now digitally preserved",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Languages,
      title: "Languages Supported",
      value: mockStats.totalLanguages,
      description: "Indigenous languages with active content",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Community Members",
      value: mockStats.totalListeners,
      description: "People engaged with cultural preservation",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: TreePine,
      title: "Cultural Groups",
      value: mockStats.totalCultures,
      description: "Indigenous communities represented",
      color: "from-purple-500 to-indigo-500"
    }
  ];

  const principles = [
    {
      icon: Heart,
      title: "Respect & Honor",
      description: "Every story is treated with the dignity it deserves, acknowledging its cultural significance and the wisdom of its origin community.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Handshake,
      title: "Community Partnership",
      description: "We work directly with indigenous communities, ensuring they maintain control over their cultural narratives and receive proper recognition.",
      color: "from-blue-500 to-teal-500"
    },
    {
      icon: Shield,
      title: "Cultural Protection",
      description: "Sacred or sensitive stories are handled with special care, respecting traditional protocols and community guidelines.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Target,
      title: "Educational Purpose",
      description: "Our mission is to educate and preserve, not to commercialize or exploit indigenous knowledge and traditions.",
      color: "from-purple-500 to-indigo-500"
    }
  ];

  const milestones = [
    { year: "2023", event: "FolkloreGPT concept born", description: "Initial idea to preserve indigenous stories through AI" },
    { year: "2024", event: "First partnerships formed", description: "Collaboration with 5 indigenous communities" },
    { year: "2024", event: "Voice AI integration", description: "Advanced multilingual voice recognition and synthesis" },
    { year: "2025", event: "Global expansion", description: "50+ languages and 1000+ stories preserved" }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingElements />
      
      {/* Enhanced Hero Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="container mx-auto text-center relative z-10">
          <ScrollAnimationWrapper animation="fadeInUp">
            <div className="relative inline-block mb-8">
              {/* Animated heart icon with enhanced effects */}
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl animate-levitate">
                  <Heart className="w-12 h-12 text-white animate-pulse" />
                </div>
                {/* Multiple glow rings */}
                <div className="absolute inset-0 w-24 h-24 bg-red-400 rounded-full opacity-30 blur-xl animate-ping"></div>
                <div className="absolute inset-0 w-32 h-32 bg-pink-400 rounded-full opacity-20 blur-2xl animate-pulse -m-4"></div>
                <div className="absolute inset-0 w-40 h-40 bg-red-300 rounded-full opacity-10 blur-3xl animate-pulse -m-8"></div>
              </div>
              
              {/* Floating hearts */}
              {[...Array(8)].map((_, i) => (
                <Heart
                  key={i}
                  className="absolute text-red-400 animate-float opacity-40"
                  size={16}
                  style={{
                    left: `${50 + Math.cos(i * Math.PI / 4) * 100}%`,
                    top: `${50 + Math.sin(i * Math.PI / 4) * 100}%`,
                    animationDelay: `${i * 0.4}s`,
                    animationDuration: `${4 + i * 0.5}s`
                  }}
                />
              ))}
            </div>
          </ScrollAnimationWrapper>
          
          <AnimatedText
            text="Our Mission"
            className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-red-600 via-pink-600 to-orange-600 bg-clip-text text-transparent"
            animation="gradient"
          />
          
          <ScrollAnimationWrapper animation="fadeInUp" delay={500}>
            <AnimatedText
              text="Preserving indigenous folklore and endangered languages through AI-powered storytelling, ensuring cultural heritage survives for future generations."
              className="text-xl md:text-2xl text-amber-700 mb-12 max-w-4xl mx-auto leading-relaxed"
              animation="splitWords"
              delay={1000}
            />
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="scaleIn" delay={1500}>
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <Button 
                  size="lg" 
                  className="relative bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-10 py-4 text-lg font-semibold rounded-xl transform transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <Link to="/listen">
                    <PlayCircle className="w-6 h-6 mr-3 animate-pulse" />
                    Experience Stories
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
                  <Link to="/submit">
                    <Upload className="w-6 h-6 mr-3 animate-bounce" />
                    Share Your Story
                  </Link>
                </Button>
              </InteractiveCard>
            </div>
          </ScrollAnimationWrapper>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[TreePine, Globe, BookOpen, Users].map((Icon, index) => (
            <Icon
              key={index}
              className="absolute text-amber-200/20 animate-float-slow"
              size={80}
              style={{
                left: `${15 + index * 20}%`,
                top: `${25 + index * 15}%`,
                animationDelay: `${index * 1.2}s`,
                animationDuration: `${10 + index * 2}s`
              }}
            />
          ))}
        </div>
      </section>

      {/* Enhanced Impact Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-amber-50/50 to-orange-50/50 backdrop-blur-sm"></div>
        <div className="container mx-auto relative z-10">
          <ScrollAnimationWrapper animation="fadeInUp">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-amber-800 mb-6 flex items-center justify-center gap-4">
                <Rocket className="w-12 h-12 animate-bounce text-blue-600" />
                Our Impact
                <Sparkles className="w-10 h-10 animate-spin text-amber-600" />
              </h2>
              <p className="text-xl text-amber-600">
                Together, we're making a difference in cultural preservation
              </p>
            </div>
          </ScrollAnimationWrapper>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impacts.map((impact, index) => {
              const Icon = impact.icon;
              return (
                <ScrollAnimationWrapper key={index} animation="rotateIn" delay={index * 200}>
                  <InteractiveCard className="text-center h-full" tiltIntensity={12} hoverScale={1.08}>
                    <div className="p-8">
                      <div className={`w-20 h-20 bg-gradient-to-br ${impact.color} rounded-full flex items-center justify-center mx-auto mb-6 animate-levitate shadow-2xl`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <div className={`text-4xl font-bold bg-gradient-to-r ${impact.color} bg-clip-text text-transparent mb-3 animate-pulse`}>
                        {impact.value.toLocaleString()}+
                      </div>
                      <h3 className="text-lg font-semibold text-amber-800 mb-3">
                        {impact.title}
                      </h3>
                      <p className="text-sm text-amber-600 leading-relaxed">
                        {impact.description}
                      </p>
                    </div>
                  </InteractiveCard>
                </ScrollAnimationWrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Core Principles */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="container mx-auto">
          <ScrollAnimationWrapper animation="fadeInUp">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-amber-800 mb-6 flex items-center justify-center gap-4">
                <Compass className="w-12 h-12 animate-pulse text-purple-600" />
                Our Core Principles
              </h2>
              <p className="text-xl text-amber-600 max-w-2xl mx-auto">
                These values guide everything we do in our mission to preserve and share indigenous stories
              </p>
            </div>
          </ScrollAnimationWrapper>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <ScrollAnimationWrapper key={index} animation="slideUp" delay={index * 300}>
                  <InteractiveCard className="h-full" tiltIntensity={8}>
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-16 h-16 bg-gradient-to-br ${principle.color} rounded-full flex items-center justify-center animate-levitate shadow-xl`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-amber-800">
                            {principle.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-amber-700 leading-relaxed text-lg">
                        {principle.description}
                      </p>
                    </div>
                  </InteractiveCard>
                </ScrollAnimationWrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-amber-50/50 to-orange-50/50 backdrop-blur-sm"></div>
        <div className="container mx-auto relative z-10">
          <ScrollAnimationWrapper animation="fadeInUp">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-amber-800 mb-6 flex items-center justify-center gap-4">
                <Zap className="w-12 h-12 animate-bounce text-yellow-500" />
                How It Works
              </h2>
              <p className="text-xl text-amber-600">
                Advanced technology meets traditional wisdom
              </p>
            </div>
          </ScrollAnimationWrapper>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <ScrollAnimationWrapper key={index} animation="fadeInUp" delay={index * 200}>
                  <InteractiveCard className="h-full group" tiltIntensity={10} hoverScale={1.05}>
                    <div className="p-8 text-center">
                      <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-125 transition-transform duration-500 animate-levitate shadow-2xl`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-amber-800 mb-4">
                        {feature.title}
                      </h3>
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

      {/* Enhanced Technology & Ethics */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollAnimationWrapper animation="fadeInLeft">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-amber-800 mb-8 flex items-center gap-4">
                  <Lightbulb className="w-12 h-12 animate-pulse text-yellow-500" />
                  Ethical AI for Cultural Preservation
                </h2>
                <div className="space-y-6 text-amber-700 text-lg leading-relaxed">
                  <p>
                    Our AI technology is designed with indigenous communities at the center, ensuring that 
                    every story is treated with the respect and cultural sensitivity it deserves.
                  </p>
                  <p>
                    We use advanced natural language processing to understand context, cultural nuances, 
                    and the deeper meanings within traditional stories, while always maintaining community 
                    control over their cultural narratives.
                  </p>
                  <p>
                    Our voice recognition and synthesis technology supports endangered languages, 
                    helping to preserve not just the stories, but the languages themselves.
                  </p>
                </div>
                
                <div className="mt-8 space-y-4">
                  {[
                    "Community-approved content only",
                    "Proper attribution and context",
                    "Secure, respectful data handling",
                    "Educational, non-commercial use"
                  ].map((item, index) => (
                    <ScrollAnimationWrapper key={index} animation="fadeInUp" delay={index * 100}>
                      <div className="flex items-center gap-3 group">
                        <CheckCircle2 className="w-6 h-6 text-green-600 animate-pulse group-hover:scale-125 transition-transform duration-300" />
                        <span className="text-amber-800 font-medium">{item}</span>
                      </div>
                    </ScrollAnimationWrapper>
                  ))}
                </div>
              </div>
            </ScrollAnimationWrapper>
            
            <ScrollAnimationWrapper animation="fadeInRight" delay={300}>
              <InteractiveCard className="relative overflow-hidden" tiltIntensity={8}>
                <div className="p-8">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-levitate shadow-2xl">
                      <Lightbulb className="w-10 h-10 text-white animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-bold text-amber-800 mb-3">
                      Innovation with Integrity
                    </h3>
                    <p className="text-amber-600">
                      Balancing cutting-edge technology with traditional values
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    {[
                      { label: "Cultural Sensitivity", value: 98, color: "from-green-500 to-emerald-500" },
                      { label: "Community Trust", value: 95, color: "from-blue-500 to-cyan-500" },
                      { label: "Language Accuracy", value: 92, color: "from-purple-500 to-indigo-500" }
                    ].map((item, index) => (
                      <ScrollAnimationWrapper key={index} animation="fadeInUp" delay={index * 200}>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-amber-800">{item.label}</span>
                            <span className="text-sm text-amber-600 font-bold">{item.value}%</span>
                          </div>
                          <div className="relative">
                            <Progress value={item.value} className="h-3" />
                            <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-full h-3 transition-all duration-1000`} 
                                 style={{ width: `${item.value}%` }} />
                          </div>
                        </div>
                      </ScrollAnimationWrapper>
                    ))}
                  </div>
                </div>
              </InteractiveCard>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </section>

      {/* Enhanced Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-amber-50/50 to-orange-50/50 backdrop-blur-sm"></div>
        <div className="container mx-auto relative z-10">
          <ScrollAnimationWrapper animation="fadeInUp">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-amber-800 mb-6 flex items-center justify-center gap-4">
                <Award className="w-12 h-12 animate-bounce text-gold-500" />
                Our Journey
              </h2>
              <p className="text-xl text-amber-600">
                Milestones in cultural preservation
              </p>
            </div>
          </ScrollAnimationWrapper>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-400 to-orange-500 rounded-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <ScrollAnimationWrapper key={index} animation={index % 2 === 0 ? "fadeInLeft" : "fadeInRight"} delay={index * 300}>
                  <div className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <InteractiveCard className={`w-full max-w-md ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`} tiltIntensity={8}>
                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold animate-pulse">
                            {milestone.year.slice(-2)}
                          </div>
                          <div>
                            <h4 className="font-bold text-amber-800 text-lg">{milestone.event}</h4>
                            <p className="text-amber-600 text-sm">{milestone.year}</p>
                          </div>
                        </div>
                        <p className="text-amber-700">{milestone.description}</p>
                      </div>
                    </InteractiveCard>
                    
                    {/* Timeline dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-amber-500 rounded-full animate-pulse shadow-lg"></div>
                  </div>
                </ScrollAnimationWrapper>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Team */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="container mx-auto">
          <ScrollAnimationWrapper animation="fadeInUp">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-amber-800 mb-6 flex items-center justify-center gap-4">
                <Users className="w-12 h-12 animate-pulse text-blue-600" />
                Meet Our Team
              </h2>
              <p className="text-xl text-amber-600">
                Dedicated experts in cultural preservation and AI ethics
              </p>
            </div>
          </ScrollAnimationWrapper>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <ScrollAnimationWrapper key={index} animation="rotateIn" delay={index * 300}>
                <InteractiveCard className="text-center h-full" tiltIntensity={12} hoverScale={1.05}>
                  <div className="p-8">
                    <div className={`w-24 h-24 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center mx-auto mb-6 animate-levitate shadow-2xl text-2xl`}>
                      {member.icon}
                    </div>
                    <h3 className="text-xl font-bold text-amber-800 mb-2">{member.name}</h3>
                    <Badge className={`bg-gradient-to-r ${member.color} text-white mb-4 animate-pulse-glow`}>
                      {member.role}
                    </Badge>
                    <p className="text-amber-700 text-sm leading-relaxed mb-6">
                      {member.bio}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-amber-300/50 text-amber-700 hover:bg-amber-100/50 transition-all duration-300 hover:scale-110"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Learn More
                    </Button>
                  </div>
                </InteractiveCard>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Get Involved */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/90 via-orange-600/90 to-red-600/90 backdrop-blur-sm"></div>
        <div className="container mx-auto text-center relative z-10">
          <ScrollAnimationWrapper animation="fadeInUp">
            <div className="max-w-4xl mx-auto">
              <div className="animate-float mb-8">
                <Award className="w-20 h-20 text-amber-100 mx-auto animate-pulse" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Join Our Mission
              </h2>
              
              <p className="text-xl text-amber-100 mb-12 max-w-2xl mx-auto leading-relaxed">
                Help us preserve cultural heritage for future generations. Every story matters, 
                every voice counts, and every culture deserves to be remembered.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {[
                  { icon: Headphones, title: "Listen & Learn", desc: "Explore stories from cultures around the world", color: "from-blue-500 to-cyan-500" },
                  { icon: Upload, title: "Share Stories", desc: "Contribute your community's oral traditions", color: "from-green-500 to-emerald-500" },
                  { icon: Heart, title: "Support Us", desc: "Help fund cultural preservation efforts", color: "from-red-500 to-pink-500" }
                ].map((item, index) => (
                  <ScrollAnimationWrapper key={index} animation="scaleIn" delay={index * 200}>
                    <InteractiveCard className="text-center" tiltIntensity={10}>
                      <div className="p-6">
                        <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 animate-levitate shadow-xl`}>
                          <item.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                        <p className="text-amber-100 text-sm">{item.desc}</p>
                      </div>
                    </InteractiveCard>
                  </ScrollAnimationWrapper>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <div className="relative group">
                  <Button 
                    size="lg" 
                    className="bg-white text-amber-800 hover:bg-amber-50 px-10 py-4 text-lg font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl relative z-10"
                    asChild
                  >
                    <Link to="/submit">
                      Get Started
                      <ChevronRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                    </Link>
                  </Button>
                  <div className="absolute inset-0 bg-white rounded-lg opacity-30 blur-xl transition-opacity duration-300"></div>
                </div>
                
                <InteractiveCard className="inline-block">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white/50 text-white hover:bg-white/10 backdrop-blur-sm px-10 py-4 text-lg font-semibold"
                    asChild
                  >
                    <Link to="/stories">
                      <BookOpen className="w-6 h-6 mr-3 animate-pulse" />
                      Explore Stories
                    </Link>
                  </Button>
                </InteractiveCard>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>

        {/* Enhanced floating cultural symbols */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[TreePine, Globe, Heart, BookOpen, Users, Languages].map((Icon, index) => (
            <Icon
              key={index}
              className="absolute text-white/10 animate-float-slow"
              size={60}
              style={{
                left: `${5 + index * 15}%`,
                top: `${15 + index * 12}%`,
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

export default About;