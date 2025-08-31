import React, { useEffect, useRef, useState } from 'react';

const ScrollAnimationWrapper = ({ 
  children, 
  animation = 'fadeInUp', 
  delay = 0,
  threshold = 0.1,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay, threshold]);

  const getAnimationClass = () => {
    const baseClass = 'transition-all duration-1000 ease-out';
    
    if (!isVisible) {
      switch (animation) {
        case 'fadeInUp':
          return `${baseClass} opacity-0 translate-y-16`;
        case 'fadeInDown':
          return `${baseClass} opacity-0 -translate-y-16`;
        case 'fadeInLeft':
          return `${baseClass} opacity-0 -translate-x-16`;
        case 'fadeInRight':
          return `${baseClass} opacity-0 translate-x-16`;
        case 'scaleIn':
          return `${baseClass} opacity-0 scale-75`;
        case 'rotateIn':
          return `${baseClass} opacity-0 rotate-12 scale-95`;
        case 'slideInUp':
          return `${baseClass} translate-y-full`;
        default:
          return `${baseClass} opacity-0`;
      }
    }
    
    return `${baseClass} opacity-100 translate-y-0 translate-x-0 scale-100 rotate-0`;
  };

  return (
    <div ref={ref} className={`${getAnimationClass()} ${className}`}>
      {children}
    </div>
  );
};

export default ScrollAnimationWrapper;