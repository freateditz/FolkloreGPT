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
  Headphones
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockStats } from '../utils/mockData';

const About = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Cloudwalker",
      role: "Cultural Anthropologist",
      bio: "Cherokee scholar specializing in oral traditions and digital preservation",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Kai Tangaroa",
      role: "Maori Language Expert",
      bio: "Native speaker working on Te Reo Maori revitalization through technology",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Dr. Aisha Kone",
      role: "AI Ethics Specialist",
      bio: "Ensuring respectful and ethical use of indigenous knowledge in AI systems",
      image: "/api/placeholder/150/150"
    }
  ];

  const features = [
    {
      icon: Mic,
      title: "Voice-First Design",
      description: "Natural conversation in native languages with AI-powered understanding"
    },
    {
      icon: Languages,
      title: "Multilingual Support",
      description: "Preserving stories in original languages with optional translations"
    },
    {
      icon: Shield,
      title: "Cultural Respect",
      description: "Community-approved content with proper attribution and context"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Making indigenous stories accessible worldwide while respecting origins"
    }
  ];

  const impacts = [
    {
      icon: BookOpen,
      title: "Stories Preserved",
      value: mockStats.totalStories,
      description: "Traditional stories now digitally preserved"
    },
    {
      icon: Languages,
      title: "Languages Supported",
      value: mockStats.totalLanguages,
      description: "Indigenous languages with active content"
    },
    {
      icon: Users,
      title: "Community Members",
      value: mockStats.totalListeners,
      description: "People engaged with cultural preservation"
    },
    {
      icon: TreePine,
      title: "Cultural Groups",
      value: mockStats.totalCultures,
      description: "Indigenous communities represented"
    }
  ];

  const principles = [
    {
      icon: Heart,
      title: "Respect & Honor",
      description: "Every story is treated with the dignity it deserves, acknowledging its cultural significance and the wisdom of its origin community."
    },
    {
      icon: Handshake,
      title: "Community Partnership",
      description: "We work directly with indigenous communities, ensuring they maintain control over their cultural narratives and receive proper recognition."
    },
    {
      icon: Shield,
      title: "Cultural Protection",
      description: "Sacred or sensitive stories are handled with special care, respecting traditional protocols and community guidelines."
    },
    {
      icon: Target,
      title: "Educational Purpose",
      description: "Our mission is to educate and preserve, not to commercialize or exploit indigenous knowledge and traditions."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-red-50">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
              <Heart className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-800 via-orange-800 to-red-800 bg-clip-text text-transparent">
            Our Mission
          </h1>
          
          <p className="text-xl md:text-2xl text-amber-700 mb-8 max-w-4xl mx-auto">
            Preserving indigenous folklore and endangered languages through AI-powered storytelling, 
            ensuring cultural heritage survives for future generations.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-3"
              asChild
            >
              <Link to="/listen">
                <PlayCircle className="w-5 h-5 mr-2" />
                Experience Stories
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-amber-300 text-amber-700 hover:bg-amber-100 px-8 py-3"
              asChild
            >
              <Link to="/submit">
                <Upload className="w-5 h-5 mr-2" />
                Share Your Story
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
              Our Impact
            </h2>
            <p className="text-lg text-amber-600">
              Together, we're making a difference in cultural preservation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impacts.map((impact, index) => {
              const Icon = impact.icon;
              return (
                <Card key={index} className="border-none shadow-lg bg-white/70 backdrop-blur-sm text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-amber-800 mb-2">
                      {impact.value.toLocaleString()}+
                    </div>
                    <h3 className="text-lg font-semibold text-amber-800 mb-2">
                      {impact.title}
                    </h3>
                    <p className="text-sm text-amber-600">
                      {impact.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
              Our Core Principles
            </h2>
            <p className="text-lg text-amber-600 max-w-2xl mx-auto">
              These values guide everything we do in our mission to preserve and share indigenous stories
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <Card key={index} className="border-none shadow-lg bg-white/70 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl text-amber-800">
                        {principle.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-amber-700 leading-relaxed">
                      {principle.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-amber-600">
              Advanced technology meets traditional wisdom
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-none shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-amber-800">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-amber-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology & Ethics */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-6">
                Ethical AI for Cultural Preservation
              </h2>
              <div className="space-y-4 text-amber-700">
                <p className="text-lg">
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
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-amber-800">Community-approved content only</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-amber-800">Proper attribution and context</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-amber-800">Secure, respectful data handling</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-amber-800">Educational, non-commercial use</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lightbulb className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-amber-800 mb-2">
                      Innovation with Integrity
                    </h3>
                    <p className="text-amber-600">
                      Balancing cutting-edge technology with traditional values
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-amber-800">Cultural Sensitivity</span>
                        <span className="text-sm text-amber-600">98%</span>
                      </div>
                      <Progress value={98} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-amber-800">Community Trust</span>
                        <span className="text-sm text-amber-600">95%</span>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-amber-800">Language Accuracy</span>
                        <span className="text-sm text-amber-600">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
              Our Team
            </h2>
            <p className="text-lg text-amber-600">
              Indigenous scholars, technologists, and cultural preservationists
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-none shadow-lg bg-white/70 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-amber-800 mb-2">
                    {member.name}
                  </h3>
                  <Badge className="bg-amber-100 text-amber-800 mb-3">
                    {member.role}
                  </Badge>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <Award className="w-16 h-16 text-amber-100 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Join Our Mission
            </h2>
            <p className="text-xl text-amber-100 mb-8">
              Help us preserve cultural heritage for future generations. Every story matters, 
              every voice counts, and every culture deserves to be remembered.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="border-none shadow-lg bg-white/10 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <Headphones className="w-8 h-8 text-amber-100 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Listen & Learn</h3>
                  <p className="text-amber-100 text-sm">
                    Explore stories from cultures around the world
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-lg bg-white/10 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <Upload className="w-8 h-8 text-amber-100 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Share Stories</h3>
                  <p className="text-amber-100 text-sm">
                    Contribute your community's oral traditions
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-lg bg-white/10 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <Heart className="w-8 h-8 text-amber-100 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Support Us</h3>
                  <p className="text-amber-100 text-sm">
                    Help fund cultural preservation efforts
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-amber-800 hover:bg-amber-50 px-8 py-3"
                asChild
              >
                <Link to="/submit">
                  Get Started
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 px-8 py-3"
                asChild
              >
                <Link to="/stories">
                  Explore Stories
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper component for checkmarks
const CheckCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default About;