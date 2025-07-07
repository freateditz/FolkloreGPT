import React from 'react';
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
  Upload
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Mic,
      title: "Voice Interaction",
      description: "Simply ask for a story and listen to folklore in native languages",
      color: "bg-red-500"
    },
    {
      icon: Globe,
      title: "Cultural Preservation",
      description: "Helping preserve endangered languages and oral traditions",
      color: "bg-amber-500"
    },
    {
      icon: BookOpen,
      title: "Story Library",
      description: "Explore thousands of stories from cultures around the world",
      color: "bg-orange-500"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Stories shared by indigenous communities and cultural keepers",
      color: "bg-red-600"
    }
  ];

  const recentStories = [
    {
      title: "The Moon's Daughter",
      culture: "Khasi",
      region: "Northeast India",
      duration: "8 min",
      listeners: "2.3k"
    },
    {
      title: "The Talking Tree",
      culture: "Maori",
      region: "New Zealand",
      duration: "12 min",
      listeners: "1.8k"
    },
    {
      title: "River Spirit's Gift",
      culture: "Cherokee",
      region: "North America",
      duration: "15 min",
      listeners: "3.1k"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-red-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 via-orange-600/10 to-red-600/10"></div>
        <div className="relative container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Badge className="bg-red-100 text-red-800 border-red-200 px-4 py-2">
              <Heart className="w-4 h-4 mr-2" />
              Preserving Cultural Heritage
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-800 via-orange-800 to-red-800 bg-clip-text text-transparent">
            FolkloreGPT
          </h1>
          
          <p className="text-xl md:text-2xl text-amber-700 mb-4 max-w-3xl mx-auto">
            AI-powered voice assistant that tells indigenous folklore and myths in local dialects
          </p>
          
          <p className="text-lg text-amber-600 mb-8 max-w-2xl mx-auto">
            Preserving endangered languages and stories through the power of voice and AI technology
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-3"
              asChild
            >
              <Link to="/listen">
                <Headphones className="w-5 h-5 mr-2" />
                Start Listening
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-amber-300 text-amber-700 hover:bg-amber-100 px-8 py-3"
              asChild
            >
              <Link to="/stories">
                <BookOpen className="w-5 h-5 mr-2" />
                Browse Stories
              </Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-800">50+</div>
              <div className="text-amber-600">Languages Preserved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-800">1,200+</div>
              <div className="text-orange-600">Stories Shared</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-800">25k+</div>
              <div className="text-red-600">Community Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
              Preserving Stories Through Technology
            </h2>
            <p className="text-lg text-amber-600 max-w-2xl mx-auto">
              Experience the magic of indigenous folklore with our AI-powered voice assistant
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-none shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
                  <CardHeader className="text-center pb-2">
                    <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-amber-800">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-amber-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Stories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
              Recently Shared Stories
            </h2>
            <p className="text-lg text-amber-600">
              Discover the latest additions to our growing collection
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentStories.map((story, index) => (
              <Card key={index} className="border-none shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                      {story.culture}
                    </Badge>
                    <PlayCircle className="w-5 h-5 text-amber-600 group-hover:text-amber-800 transition-colors" />
                  </div>
                  <CardTitle className="text-xl text-amber-800 group-hover:text-amber-900 transition-colors">
                    {story.title}
                  </CardTitle>
                  <CardDescription className="text-amber-600">
                    {story.region}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-amber-600">
                    <span>{story.duration}</span>
                    <span>{story.listeners} listeners</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-amber-300 text-amber-700 hover:bg-amber-100"
              asChild
            >
              <Link to="/stories">
                View All Stories
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <Sparkles className="w-12 h-12 text-amber-100 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Share Your Cultural Heritage
            </h2>
            <p className="text-xl text-amber-100 mb-8">
              Help preserve your community's stories and languages for future generations
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-amber-800 hover:bg-amber-50 px-8 py-3"
                asChild
              >
                <Link to="/submit">
                  <Upload className="w-5 h-5 mr-2" />
                  Share Your Story
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 px-8 py-3"
                asChild
              >
                <Link to="/about">
                  <Shield className="w-5 h-5 mr-2" />
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;