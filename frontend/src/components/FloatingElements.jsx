import React from 'react';
import { Heart, Globe, BookOpen, Mic, Languages, TreePine } from 'lucide-react';

const FloatingElements = () => {
  const elements = [
    { Icon: Heart, color: 'text-red-400', delay: 0 },
    { Icon: Globe, color: 'text-blue-400', delay: 0.5 },
    { Icon: BookOpen, color: 'text-green-400', delay: 1 },
    { Icon: Mic, color: 'text-purple-400', delay: 1.5 },
    { Icon: Languages, color: 'text-orange-400', delay: 2 },
    { Icon: TreePine, color: 'text-teal-400', delay: 2.5 }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((element, index) => {
        const { Icon, color, delay } = element;
        return (
          <div
            key={index}
            className="absolute animate-float-slow opacity-20"
            style={{
              left: `${10 + index * 15}%`,
              top: `${20 + index * 12}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${8 + index}s`
            }}
          >
            <div className="relative">
              <Icon 
                className={`w-8 h-8 ${color} animate-pulse`}
                style={{ animationDelay: `${delay + 1}s` }}
              />
              <div 
                className={`absolute inset-0 w-8 h-8 ${color.replace('text-', 'bg-')} rounded-full blur-xl opacity-30 animate-ping`}
                style={{ animationDelay: `${delay + 2}s` }}
              />
            </div>
          </div>
        );
      })}
      
      {/* Additional decorative elements */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-40 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${4 + Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;