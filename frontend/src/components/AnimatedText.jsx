import React, { useState, useEffect } from 'react';

const AnimatedText = ({ 
  text, 
  className = '', 
  animation = 'typewriter',
  speed = 100,
  delay = 0 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;

    if (animation === 'typewriter') {
      if (currentIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayedText(text.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, speed);
        return () => clearTimeout(timer);
      }
    } else {
      setDisplayedText(text);
    }
  }, [currentIndex, text, speed, animation, isVisible]);

  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0';
    
    switch (animation) {
      case 'typewriter':
        return 'opacity-100';
      case 'fadeIn':
        return 'opacity-100 animate-fade-in';
      case 'slideUp':
        return 'opacity-100 animate-slide-up';
      case 'bounce':
        return 'opacity-100 animate-bounce-in';
      case 'gradient':
        return 'opacity-100 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent animate-gradient-x';
      default:
        return 'opacity-100';
    }
  };

  if (animation === 'splitWords') {
    return (
      <div className={className}>
        {text.split(' ').map((word, index) => (
          <span
            key={index}
            className={`inline-block transition-all duration-700 ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}
            style={{ 
              transitionDelay: `${delay + index * 100}ms` 
            }}
          >
            {word}&nbsp;
          </span>
        ))}
      </div>
    );
  }

  if (animation === 'splitChars') {
    return (
      <div className={className}>
        {text.split('').map((char, index) => (
          <span
            key={index}
            className={`inline-block transition-all duration-500 ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0 rotate-0' 
                : 'opacity-0 translate-y-2 rotate-12'
            }`}
            style={{ 
              transitionDelay: `${delay + index * 50}ms` 
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className={`${getAnimationClass()} ${className}`}>
      {displayedText}
      {animation === 'typewriter' && currentIndex < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </div>
  );
};

export default AnimatedText;