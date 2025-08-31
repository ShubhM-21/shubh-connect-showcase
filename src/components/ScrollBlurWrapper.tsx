import React, { useEffect, useRef, useState } from 'react';

interface ScrollBlurWrapperProps {
  children: React.ReactNode;
  protectHeadings?: boolean;
}

export const ScrollBlurWrapper: React.FC<ScrollBlurWrapperProps> = ({ 
  children, 
  protectHeadings = true 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [blurAmount, setBlurAmount] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateBlur = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Define optimal viewing area (20%-80% of viewport)
      const optimalStart = viewportHeight * 0.2;
      const optimalEnd = viewportHeight * 0.8;
      
      const elementTop = rect.top;
      const elementBottom = rect.bottom;
      
      // Check if element is in optimal viewing area
      const isInOptimalArea = elementBottom > optimalStart && elementTop < optimalEnd;
      
      if (isInOptimalArea) {
        setBlurAmount(0);
        return;
      }
      
      // Calculate distance from optimal area
      let distance = 0;
      if (elementBottom <= optimalStart) {
        distance = optimalStart - elementBottom;
      } else if (elementTop >= optimalEnd) {
        distance = elementTop - optimalEnd;
      }
      
      // Convert distance to blur amount (max 2.5px)
      const maxDistance = viewportHeight * 0.3;
      const distanceRatio = Math.min(distance / maxDistance, 1);
      const blur = Math.pow(distanceRatio, 2) * 2.5;
      
      setBlurAmount(blur);
    };

    updateBlur();
    window.addEventListener('scroll', updateBlur, { passive: true });
    window.addEventListener('resize', updateBlur, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateBlur);
      window.removeEventListener('resize', updateBlur);
    };
  }, []);

  const blurStyle = blurAmount > 0.1 ? {
    filter: `blur(${blurAmount}px)`,
    transition: 'filter 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  } : {
    filter: 'none',
    transition: 'filter 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  return (
    <div ref={ref} style={blurStyle}>
      {protectHeadings ? (
        <div className="[&>h1]:!filter-none [&>h2]:!filter-none [&>h3]:!filter-none [&>h4]:!filter-none [&>h5]:!filter-none [&>h6]:!filter-none">
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
};