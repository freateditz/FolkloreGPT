import React, { useState } from 'react';
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
  Headphones
} from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/', icon: BookOpen },
    { name: 'Stories', href: '/stories', icon: BookOpen },
    { name: 'Listen', href: '/listen', icon: Headphones },
    { name: 'Share Story', href: '/submit', icon: Mic },
    { name: 'About', href: '/about', icon: Heart },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 border-b border-amber-200/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <Heart className="w-2 h-2 text-white" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent">
                FolkloreGPT
              </h1>
              <p className="text-xs text-amber-600 -mt-1">Preserving Stories</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-amber-100 ${
                    isActive(item.href) 
                      ? 'bg-amber-100 text-amber-800 shadow-sm' 
                      : 'text-amber-700 hover:text-amber-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className="hidden sm:flex bg-red-100 text-red-800 border-red-200">
              <Heart className="w-3 h-3 mr-1" />
              Cultural Preservation
            </Badge>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden sm:flex border-amber-300 text-amber-700 hover:bg-amber-100"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/80 backdrop-blur-sm rounded-lg mt-2 border border-amber-200/50">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.href) 
                        ? 'bg-amber-100 text-amber-800' 
                        : 'text-amber-700 hover:bg-amber-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;