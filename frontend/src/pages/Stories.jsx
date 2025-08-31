import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  PlayCircle, 
  Search, 
  Filter, 
  BookOpen, 
  Globe, 
  Clock, 
  Users, 
  Star,
  Heart,
  Headphones,
  Sparkles,
  Volume2,
  Eye,
  Loader2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { mockStories, mockCultures, mockCategories, mockLanguages } from '../utils/mockData';
import storyService from '../services/storyService';
import { useToast } from '../hooks/use-toast';

// Import animated components
import ScrollAnimationWrapper from '../components/ScrollAnimationWrapper';
import InteractiveCard from '../components/InteractiveCard';
import AnimatedText from '../components/AnimatedText';
import FloatingElements from '../components/FloatingElements';

const Stories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCulture, setSelectedCulture] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('stories');
  const [hoveredStory, setHoveredStory] = useState(null);
  
  // Database state
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const { toast } = useToast();

  // Fetch stories from database
  useEffect(() => {
    fetchStories();
    fetchStats();
  }, []);

  const fetchStories = async (reset = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const currentPage = reset ? 1 : page;
      const params = {
        page: currentPage,
        limit: 20,
        status: 'approved'
      };
      
      if (selectedCategory !== 'all') params.category = selectedCategory;
      if (selectedCulture !== 'all') params.culture = selectedCulture;

      const response = await storyService.getStories(params);
      
      if (response.success) {
        if (reset) {
          setStories(response.stories);
          setPage(1);
        } else {
          setStories(prev => [...prev, ...response.stories]);
        }
        
        setHasMore(response.pagination.current < response.pagination.total);
        console.log(`📚 Loaded ${response.stories.length} stories from database`);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      console.error('❌ Error fetching stories:', err);
      setError(err.message || 'Failed to load stories');
      
      // Fallback to mock data
      if (stories.length === 0) {
        setStories(mockStories);
        toast({
          title: "⚠️ Using offline data",
          description: "Couldn't connect to server, showing sample stories.",
          variant: "default"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await storyService.getStoryStats();
      if (response.success) {
        setStats(response.stats);
      }
    } catch (err) {
      console.error('❌ Error fetching stats:', err);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
      fetchStories();
    }
  };

  const handleFilterChange = () => {
    setPage(1);
    fetchStories(true);
  };

  // Filter stories client-side for search and language
  const filteredStories = useMemo(() => {
    let filtered = stories;

    if (searchTerm) {
      filtered = filtered.filter(story => 
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.culture.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (story.tags && story.tags.some(tag => 
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
    }

    if (selectedLanguage !== 'all') {
      filtered = filtered.filter(story => story.language === selectedLanguage);
    }

    if (searchTerm) {
      filtered = filtered.filter(story => 
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.culture.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCulture !== 'all') {
      filtered = filtered.filter(story => story.culture === selectedCulture);
    }

    if (selectedLanguage !== 'all') {
      filtered = filtered.filter(story => story.language === selectedLanguage);
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(story => story.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => parseFloat(b.listeners) - parseFloat(a.listeners));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'duration':
        filtered.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        break;
      default: // recent
        filtered.sort((a, b) => new Date(b.submittedDate) - new Date(a.submittedDate));
    }

    return filtered;
  }, [searchTerm, selectedCulture, selectedLanguage, selectedCategory, sortBy]);

  const StoryCard = ({ story, index }) => (
    <ScrollAnimationWrapper animation="fadeInUp" delay={index * 100}>
      <InteractiveCard 
        className="group cursor-pointer h-full overflow-hidden"
        tiltIntensity={8}
        hoverScale={1.03}
        onMouseEnter={() => setHoveredStory(story.id)}
        onMouseLeave={() => setHoveredStory(null)}
      >
        <div className="relative">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-32 bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 animate-morphing"></div>
          </div>
          
          <CardHeader className="pb-3 relative z-10">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Badge 
                  variant="secondary" 
                  className="bg-amber-100/80 text-amber-800 backdrop-blur-sm animate-pulse-glow"
                >
                  {story.culture}
                </Badge>
                <Badge 
                  variant="outline" 
                  className="text-xs border-amber-300/50 backdrop-blur-sm"
                >
                  {story.language}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current animate-pulse" />
                  <span className="text-sm font-medium">{story.rating}</span>
                </div>
                <Eye className={`w-4 h-4 text-amber-600 transition-all duration-300 ${
                  hoveredStory === story.id ? 'animate-pulse scale-125' : ''
                }`} />
              </div>
            </div>
            
            <CardTitle className="text-xl text-amber-800 group-hover:text-amber-900 transition-colors line-clamp-2 mb-2">
              {story.title}
            </CardTitle>
            <CardDescription className="text-amber-600 text-sm">
              {story.region} • {story.category}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-0 relative z-10">
            <p className="text-sm text-amber-700 mb-4 line-clamp-3 leading-relaxed">
              {story.description}
            </p>
            
            {/* Animated stats */}
            <div className="flex items-center justify-between text-sm text-amber-600 mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 group-hover:scale-105 transition-transform duration-300">
                  <Clock className="w-4 h-4 animate-pulse" />
                  <span>{story.duration}</span>
                </div>
                <div className="flex items-center gap-1 group-hover:scale-105 transition-transform duration-300">
                  <Users className="w-4 h-4" />
                  <span>{story.listeners}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Headphones className="w-4 h-4 animate-float" />
                <span className="text-xs">{story.difficulty}</span>
              </div>
            </div>
            
            {/* Tags with animation */}
            <div className="flex flex-wrap gap-1 mb-4">
              {story.tags.slice(0, 3).map((tag, tagIndex) => (
                <Badge 
                  key={tagIndex} 
                  variant="outline" 
                  className="text-xs border-amber-300/50 hover:bg-amber-100/50 transition-all duration-300"
                  style={{ animationDelay: `${tagIndex * 100}ms` }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            
            {/* Interactive play button */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-amber-500 animate-pulse" />
                <div className="w-16 h-1 bg-amber-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-1000 group-hover:w-full"
                    style={{ width: `${Math.random() * 60 + 20}%` }}
                  />
                </div>
              </div>
              
              <div className="relative group/button">
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white transition-all duration-300 hover:scale-110 hover:shadow-xl relative z-10"
                  asChild
                >
                  <Link to={`/story/${story.id}`}>
                    <PlayCircle className="w-4 h-4 mr-1 group-hover/button:animate-spin" />
                    Listen
                  </Link>
                </Button>
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-orange-400 rounded-lg opacity-0 group-hover/button:opacity-30 blur-lg transition-opacity duration-300"></div>
              </div>
            </div>
          </CardContent>
          
          {/* Hover overlay effect */}
          <div className={`absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
        </div>
      </InteractiveCard>
    </ScrollAnimationWrapper>
  );

  const CultureCard = ({ culture, index }) => (
    <ScrollAnimationWrapper animation="rotateIn" delay={index * 150}>
      <InteractiveCard 
        className="group cursor-pointer h-full"
        tiltIntensity={12}
        hoverScale={1.05}
        glowColor={culture.color.includes('red') ? 'red' : 'amber'}
      >
        <CardHeader className="text-center pb-3 relative">
          {/* Floating emoji with 3D effect */}
          <div className="relative">
            <div className={`w-20 h-20 ${culture.color} rounded-full flex items-center justify-center mx-auto mb-4 text-3xl transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 animate-levitate shadow-xl`}>
              {culture.flag}
            </div>
            {/* Glow ring */}
            <div className={`absolute inset-0 w-20 h-20 ${culture.color} rounded-full mx-auto opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`}></div>
          </div>
          
          <CardTitle className="text-xl text-amber-800 group-hover:text-amber-900 transition-colors mb-2">
            {culture.name}
          </CardTitle>
          <CardDescription className="text-amber-600">
            {culture.region}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="text-center pt-0">
          <p className="text-sm text-amber-700 mb-4 line-clamp-3 leading-relaxed">
            {culture.description}
          </p>
          
          <div className="flex items-center justify-center gap-4 text-sm text-amber-600 mb-4">
            <div className="flex items-center gap-1 group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="w-4 h-4 animate-pulse" />
              <span>{culture.storyCount} stories</span>
            </div>
            <div className="flex items-center gap-1 group-hover:scale-110 transition-transform duration-300">
              <Globe className="w-4 h-4 animate-float" />
              <span className="text-xs">{culture.language}</span>
            </div>
          </div>
          
          <div className="relative group/btn">
            <Button 
              size="sm" 
              variant="outline" 
              className="border-amber-300/50 text-amber-700 hover:bg-amber-100/50 w-full backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg relative z-10"
              onClick={() => setSelectedCulture(culture.name)}
            >
              Explore Stories
              <Sparkles className="w-4 h-4 ml-2 group-hover/btn:animate-spin" />
            </Button>
            {/* Button background glow */}
            <div className="absolute inset-0 bg-amber-300 rounded-lg opacity-0 group-hover/btn:opacity-20 blur-md transition-opacity duration-300"></div>
          </div>
        </CardContent>
      </InteractiveCard>
    </ScrollAnimationWrapper>
  );

  return (
    <div className="min-h-screen relative py-8">
      <FloatingElements />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <ScrollAnimationWrapper animation="fadeInUp">
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <AnimatedText
                text="Story Collection"
                className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-800 via-orange-800 to-red-800 bg-clip-text text-transparent"
                animation="gradient"
              />
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4">
                <Sparkles className="w-8 h-8 text-amber-600 animate-pulse" />
              </div>
              <div className="absolute -bottom-4 -left-4">
                <BookOpen className="w-8 h-8 text-orange-600 animate-float" />
              </div>
            </div>
            <AnimatedText
              text="Explore thousands of indigenous stories from cultures around the world"
              className="text-xl text-amber-600 max-w-2xl mx-auto"
              animation="splitWords"
              delay={500}
            />
          </div>
        </ScrollAnimationWrapper>

        {/* Enhanced Search & Filters */}
        <ScrollAnimationWrapper animation="scaleIn" delay={300}>
          <InteractiveCard className="p-6 shadow-xl mb-8 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="w-full h-full bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 animate-gradient-x"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row gap-4 mb-4">
                <div className="relative flex-1 group">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-amber-600 group-hover:scale-125 transition-transform duration-300" />
                  <Input
                    placeholder="Search stories, cultures, or keywords..."
                    className="pl-10 border-amber-200/50 focus:border-amber-400 backdrop-blur-sm bg-white/50 transition-all duration-300 focus:scale-105 focus:shadow-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-3">
                  {[
                    { value: selectedCulture, setter: setSelectedCulture, options: mockCultures.map(c => ({ value: c.name, label: c.name })), placeholder: "Culture", all: "All Cultures" },
                    { value: selectedLanguage, setter: setSelectedLanguage, options: mockLanguages.map(l => ({ value: l, label: l })), placeholder: "Language", all: "All Languages" },
                    { value: selectedCategory, setter: setSelectedCategory, options: mockCategories.map(c => ({ value: c, label: c })), placeholder: "Category", all: "All Categories" },
                    { value: sortBy, setter: setSortBy, options: [{ value: 'recent', label: 'Recent' }, { value: 'popular', label: 'Popular' }, { value: 'rating', label: 'Rating' }, { value: 'duration', label: 'Duration' }], placeholder: "Sort by" }
                  ].map((select, index) => (
                    <div key={index} className="relative group">
                      <Select value={select.value} onValueChange={select.setter}>
                        <SelectTrigger className="w-36 border-amber-200/50 backdrop-blur-sm bg-white/50 hover:bg-white/70 transition-all duration-300 hover:scale-105">
                          <SelectValue placeholder={select.placeholder} />
                        </SelectTrigger>
                        <SelectContent className="backdrop-blur-md bg-white/90">
                          {select.all && <SelectItem value="all">{select.all}</SelectItem>}
                          {select.options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {/* Selection glow */}
                      <div className="absolute inset-0 bg-amber-300 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </InteractiveCard>
        </ScrollAnimationWrapper>

        {/* Enhanced Tabs */}
        <ScrollAnimationWrapper animation="fadeInUp" delay={500}>
          <Tabs value={viewMode} onValueChange={setViewMode} className="mb-8">
            <div className="flex justify-center">
              <TabsList className="grid w-full max-w-md grid-cols-2 bg-white/50 backdrop-blur-sm border border-amber-200/50">
                <TabsTrigger 
                  value="stories" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white transition-all duration-300"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Stories ({filteredStories.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="cultures"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white transition-all duration-300"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Cultures ({mockCultures.length})
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="stories" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredStories.map((story, index) => (
                  <StoryCard key={story.id} story={story} index={index} />
                ))}
              </div>
              
              {filteredStories.length === 0 && (
                <ScrollAnimationWrapper animation="scaleIn">
                  <div className="text-center py-16">
                    <div className="relative inline-block mb-6">
                      <BookOpen className="w-24 h-24 text-amber-400 mx-auto animate-float" />
                      <div className="absolute inset-0 w-24 h-24 bg-amber-400 rounded-full mx-auto opacity-20 blur-2xl animate-pulse"></div>
                    </div>
                    <h3 className="text-2xl font-semibold text-amber-800 mb-4">No stories found</h3>
                    <p className="text-amber-600 mb-6 max-w-md mx-auto">Try adjusting your search criteria or explore different cultures and categories</p>
                    <div className="relative group inline-block">
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedCulture('all');
                          setSelectedLanguage('all');
                          setSelectedCategory('all');
                        }}
                        className="border-amber-300/50 text-amber-700 hover:bg-amber-100/50 transition-all duration-300 hover:scale-105 hover:shadow-lg relative z-10"
                      >
                        <Filter className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                        Clear Filters
                      </Button>
                      <div className="absolute inset-0 bg-amber-300 rounded-lg opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
                    </div>
                  </div>
                </ScrollAnimationWrapper>
              )}
            </TabsContent>
            
            <TabsContent value="cultures" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mockCultures.map((culture, index) => (
                  <CultureCard key={culture.id} culture={culture} index={index} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </ScrollAnimationWrapper>

        {/* Enhanced CTA */}
        <ScrollAnimationWrapper animation="fadeInUp" delay={800}>
          <div className="text-center mt-16">
            <InteractiveCard className="relative overflow-hidden">
              <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-xl p-12 text-white relative">
                {/* Animated background elements */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-8 h-8 bg-white rounded-full animate-float"
                      style={{
                        left: `${10 + i * 15}%`,
                        top: `${20 + i * 10}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: `${3 + i}s`
                      }}
                    />
                  ))}
                </div>
                
                <div className="relative z-10">
                  <Heart className="w-16 h-16 mx-auto mb-6 text-red-200 animate-pulse" />
                  <h3 className="text-3xl font-bold mb-4">Share Your Story</h3>
                  <p className="text-amber-100 mb-8 max-w-2xl mx-auto text-lg">
                    Help preserve your cultural heritage by sharing your community's stories and keeping traditions alive for future generations
                  </p>
                  
                  <div className="relative group inline-block">
                    <Button 
                      size="lg" 
                      className="bg-white text-amber-800 hover:bg-amber-50 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl relative z-10"
                      asChild
                    >
                      <Link to="/submit">
                        <Sparkles className="w-6 h-6 mr-3 animate-spin" />
                        Submit a Story
                      </Link>
                    </Button>
                    {/* Button glow */}
                    <div className="absolute inset-0 bg-white rounded-lg opacity-30 blur-xl transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
            </InteractiveCard>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </div>
  );
};

export default Stories;