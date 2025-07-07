import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Globe, Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-amber-900 via-orange-900 to-red-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Mission */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                <Globe className="w-5 h-5 text-amber-900" />
              </div>
              <div>
                <h3 className="text-xl font-bold">FolkloreGPT</h3>
                <p className="text-amber-200 text-sm">Preserving Stories, Protecting Languages</p>
              </div>
            </div>
            <p className="text-amber-100 text-sm leading-relaxed mb-4">
              Dedicated to preserving indigenous folklore and endangered languages through AI-powered storytelling. 
              Every story shared helps keep cultural heritage alive for future generations.
            </p>
            <div className="flex items-center space-x-2 text-amber-200">
              <Heart className="w-4 h-4 text-red-400" />
              <span className="text-sm">Made with respect for all cultures</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-amber-200">Explore</h4>
            <ul className="space-y-2">
              <li><Link to="/stories" className="text-sm text-amber-100 hover:text-white transition-colors">Browse Stories</Link></li>
              <li><Link to="/listen" className="text-sm text-amber-100 hover:text-white transition-colors">Voice Interface</Link></li>
              <li><Link to="/submit" className="text-sm text-amber-100 hover:text-white transition-colors">Share a Story</Link></li>
              <li><Link to="/about" className="text-sm text-amber-100 hover:text-white transition-colors">Our Mission</Link></li>
              <li><Link to="/contact" className="text-sm text-amber-100 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold mb-4 text-amber-200">Community</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-amber-100 hover:text-white transition-colors">Cultural Partners</a></li>
              <li><a href="#" className="text-sm text-amber-100 hover:text-white transition-colors">Language Preservation</a></li>
              <li><a href="#" className="text-sm text-amber-100 hover:text-white transition-colors">Educational Resources</a></li>
              <li><Link to="/contact" className="text-sm text-amber-100 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-amber-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-6 mb-4 sm:mb-0">
            <a href="#" className="text-amber-200 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-amber-200 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-amber-200 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-amber-200 text-sm">© 2025 FolkloreGPT. Cultural preservation through technology.</p>
            <p className="text-amber-300 text-xs mt-1">Built with respect for indigenous communities worldwide</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;