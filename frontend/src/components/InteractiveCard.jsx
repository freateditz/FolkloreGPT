import React, { useState } from 'react';

const InteractiveCard = ({ 
  children, 
  className = '',
  glowColor = 'amber',
  tiltIntensity = 15,
  hoverScale = 1.05 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePosition({ x, y });
  };

  const getGlowColors = () => {
    switch (glowColor) {
      case 'amber':
        return 'shadow-amber-500/20 hover:shadow-amber-500/40';
      case 'orange':
        return 'shadow-orange-500/20 hover:shadow-orange-500/40';
      case 'red':
        return 'shadow-red-500/20 hover:shadow-red-500/40';
      case 'blue':
        return 'shadow-blue-500/20 hover:shadow-blue-500/40';
      default:
        return 'shadow-amber-500/20 hover:shadow-amber-500/40';
    }
  };

  return (
    <div
      className={`
        relative overflow-hidden rounded-xl backdrop-blur-md bg-white/10 border border-white/20
        transition-all duration-300 ease-out cursor-pointer
        ${getGlowColors()}
        ${className}
      `}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${-mousePosition.y * tiltIntensity}deg) rotateY(${mousePosition.x * tiltIntensity}deg) scale(${hoverScale})`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
    >
      {/* Animated background gradient */}
      <div 
        className="absolute inset-0 opacity-30 transition-opacity duration-300"
        style={{
          background: isHovered
            ? `radial-gradient(circle at ${(mousePosition.x + 1) * 50}% ${(mousePosition.y + 1) * 50}%, 
                rgba(245, 158, 11, 0.3) 0%, 
                rgba(251, 146, 60, 0.2) 50%, 
                transparent 100%)`
            : 'transparent'
        }}
      />
      
      {/* Shimmer effect */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 transition-transform duration-1000 ${
          isHovered ? 'translate-x-full' : '-translate-x-full'
        }`}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Glow border */}
      <div className="absolute inset-0 rounded-xl border border-white/30 opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default InteractiveCard;