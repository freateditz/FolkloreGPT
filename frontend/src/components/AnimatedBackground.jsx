import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Static Gradient Background */}
      <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-amber-100/50 via-orange-100/30 to-red-100/50" />
      
      {/* Floating Orbs */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-xl opacity-20 animate-float"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              background: `linear-gradient(45deg, 
                hsl(${30 + i * 15}, 70%, 60%), 
                hsl(${45 + i * 20}, 80%, 70%)
              )`,
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i}s`
            }}
          />
        ))}
      </div>

      {/* Geometric Patterns */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10 animate-rotate-slow"
            style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(45deg, transparent 30%, rgba(245, 158, 11, 0.3) 70%)',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              left: `${15 + i * 10}%`,
              top: `${30 + i * 8}%`,
              animationDelay: `${i * 0.3}s`,
              transform: `rotate(${i * 45}deg)`
            }}
          />
        ))}
      </div>

      {/* Animated Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(245, 158, 11)" stopOpacity="0" />
            <stop offset="50%" stopColor="rgb(251, 146, 60)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="rgb(239, 68, 68)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[...Array(4)].map((_, i) => (
          <path
            key={i}
            d={`M${i * 300},0 Q${400 + i * 200},${200 + i * 100} ${800 + i * 100},${400 + i * 50}`}
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            className="animate-draw-line"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}
      </svg>
    </div>
  );
};

export default AnimatedBackground;