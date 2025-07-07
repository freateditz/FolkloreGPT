import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Mic, 
  BookOpen, 
  Settings, 
  Heart, 
  Globe, 
  Menu, 
  X,
  Headphones,
  Sparkles
} from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/', icon: BookOpen },
    { name: 'Stories', href: '/stories', icon: BookOpen },
    { name: 'Listen', href: '/listen', icon: Headphones },
    { name: 'Share Story', href: '/submit', icon: Mic },
    { name: 'About', href: '/about', icon: Heart },
    { name: 'Contact', href: '/contact', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/80 backdrop-blur-md border-b border-amber-200/50 shadow-lg' 
        : 'bg-gradient-to-r from-amber-50/80 via-orange-50/80 to-red-50/80 backdrop-blur-sm border-b border-amber-200/30'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with 3D effect */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative perspective-1000">
              <div className={`w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                scrolled ? 'transform hover:rotateY-12' : 'animate-levitate'
              } group-hover:shadow-xl group-hover:scale-110`}>
                <Globe className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                <Heart className="w-3 h-3 text-white" />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 w-12 h-12 bg-amber-400 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300 animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent">
                FolkloreGPT
              </h1>
              <p className="text-xs text-amber-600 -mt-1 animate-fade-in">Preserving Stories</p>
            </div>
          </Link>

          {/* Desktop Navigation with 3D effects */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigation.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group relative flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    isActive(item.href) 
                      ? 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 shadow-md transform scale-105' 
                      : 'text-amber-700 hover:text-amber-800 hover:bg-amber-50/50'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <Icon className={`w-4 h-4 transition-transform duration-300 group-hover:rotate-12 ${
                    isActive(item.href) ? 'animate-pulse' : ''
                  }`} />
                  <span>{item.name}</span>
                  {/* Active indicator */}
                  {isActive(item.href) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-600 rounded-full animate-pulse"></div>
                  )}
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-amber-200 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
                </Link>
              );
            })}
          </nav>

          {/* Actions with enhanced effects */}
          <div className="flex items-center space-x-3">
            <Badge 
              variant="secondary" 
              className="hidden sm:flex bg-red-100/80 text-red-800 border-red-200/50 backdrop-blur-sm animate-pulse-glow hover:scale-105 transition-transform duration-300"
            >
              <Heart className="w-3 h-3 mr-1 animate-pulse" />
              Cultural Preservation
            </Badge>
            
            <div className="relative group">
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden sm:flex border-amber-300/50 text-amber-700 hover:bg-amber-100/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
                asChild
              >
                <Link to="/settings">
                  <Settings className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                  Settings
                </Link>
              </Button>
              {/* Button glow */}
              <div className="absolute inset-0 bg-amber-300 rounded-lg opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
            </div>

            {/* Mobile Menu Button with 3D effect */}
            <div className="lg:hidden relative">
              <Button
                variant="ghost"
                size="sm"
                className="relative z-10 hover:bg-amber-100/50 transition-all duration-300 hover:scale-110"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <div className="relative">
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5 animate-spin" />
                  ) : (
                    <Menu className="w-5 h-5 animate-pulse" />
                  )}
                </div>
              </Button>
              {/* Button background effect */}
              <div className="absolute inset-0 bg-amber-400 rounded-lg opacity-0 hover:opacity-20 blur-lg transition-opacity duration-300"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden animate-slide-up">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/90 backdrop-blur-md rounded-xl mt-2 border border-amber-200/50 shadow-xl">
              {navigation.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      isActive(item.href) 
                        ? 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 shadow-md' 
                        : 'text-amber-700 hover:bg-amber-50/70'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      animation: 'fadeInUp 0.5s ease-out forwards'
                    }}
                  >
                    <div className="relative">
                      <Icon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                      {isActive(item.href) && (
                        <div className="absolute -inset-1 bg-amber-400 rounded-full opacity-20 animate-pulse"></div>
                      )}
                    </div>
                    <span>{item.name}</span>
                    {/* Sparkle effect on active */}
                    {isActive(item.href) && (
                      <Sparkles className="w-4 h-4 text-amber-600 animate-pulse ml-auto" />
                    )}
                  </Link>
                );
              })}
              
              {/* Mobile CTA */}
              <div className="pt-3 border-t border-amber-200/50">
                <Link
                  to="/submit"
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Mic className="w-5 h-5 animate-pulse" />
                  <span>Share Your Story</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;