import React, { useState, useMemo } from 'react';
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
  Headphones
} from 'lucide-react';
import { mockStories, mockCultures, mockCategories, mockLanguages } from '../utils/mockData';

const Stories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCulture, setSelectedCulture] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('stories');

  const filteredStories = useMemo(() => {
    let filtered = mockStories;

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

  const StoryCard = ({ story }) => (
    <Card className="group border-none shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-amber-100 text-amber-800">
              {story.culture}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {story.language}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium">{story.rating}</span>
          </div>
        </div>
        <CardTitle className="text-xl text-amber-800 group-hover:text-amber-900 transition-colors line-clamp-2">
          {story.title}
        </CardTitle>
        <CardDescription className="text-amber-600 text-sm">
          {story.region} • {story.category}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-amber-700 mb-4 line-clamp-3">
          {story.description}
        </p>
        <div className="flex items-center justify-between text-sm text-amber-600 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{story.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{story.listeners}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Headphones className="w-4 h-4" />
            <span className="text-xs">{story.difficulty}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {story.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
            asChild
          >
            <Link to={`/story/${story.id}`}>
              <PlayCircle className="w-4 h-4 mr-1" />
              Listen
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const CultureCard = ({ culture }) => (
    <Card className="group border-none shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
      <CardHeader className="text-center pb-3">
        <div className={`w-16 h-16 ${culture.color} rounded-full flex items-center justify-center mx-auto mb-3 text-2xl group-hover:scale-110 transition-transform duration-300`}>
          {culture.flag}
        </div>
        <CardTitle className="text-xl text-amber-800 group-hover:text-amber-900 transition-colors">
          {culture.name}
        </CardTitle>
        <CardDescription className="text-amber-600">
          {culture.region}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center pt-0">
        <p className="text-sm text-amber-700 mb-4 line-clamp-3">
          {culture.description}
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-amber-600 mb-4">
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{culture.storyCount} stories</span>
          </div>
          <div className="flex items-center gap-1">
            <Globe className="w-4 h-4" />
            <span>{culture.language}</span>
          </div>
        </div>
        <Button 
          size="sm" 
          variant="outline" 
          className="border-amber-300 text-amber-700 hover:bg-amber-100 w-full"
          onClick={() => setSelectedCulture(culture.name)}
        >
          Explore Stories
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-red-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4">
            Story Collection
          </h1>
          <p className="text-lg text-amber-600 max-w-2xl mx-auto">
            Explore thousands of indigenous stories from cultures around the world
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-lg mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-amber-600" />
              <Input
                placeholder="Search stories, cultures, or keywords..."
                className="pl-10 border-amber-200 focus:border-amber-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCulture} onValueChange={setSelectedCulture}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Culture" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cultures</SelectItem>
                  {mockCultures.map((culture) => (
                    <SelectItem key={culture.id} value={culture.name}>
                      {culture.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  {mockLanguages.map((language) => (
                    <SelectItem key={language} value={language}>
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {mockCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recent</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={viewMode} onValueChange={setViewMode} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 lg:w-96 mx-auto">
            <TabsTrigger value="stories">Stories ({filteredStories.length})</TabsTrigger>
            <TabsTrigger value="cultures">Cultures ({mockCultures.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="stories" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
            
            {filteredStories.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-amber-800 mb-2">No stories found</h3>
                <p className="text-amber-600 mb-4">Try adjusting your search or filters</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCulture('all');
                    setSelectedLanguage('all');
                    setSelectedCategory('all');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="cultures" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCultures.map((culture) => (
                <CultureCard key={culture.id} culture={culture} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-lg p-8 text-white">
            <Heart className="w-12 h-12 mx-auto mb-4 text-red-200" />
            <h3 className="text-2xl font-bold mb-2">Share Your Story</h3>
            <p className="text-amber-100 mb-6">
              Help preserve your cultural heritage by sharing your community's stories
            </p>
            <Button 
              size="lg" 
              className="bg-white text-amber-800 hover:bg-amber-50"
              asChild
            >
              <Link to="/submit">
                Submit a Story
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stories;