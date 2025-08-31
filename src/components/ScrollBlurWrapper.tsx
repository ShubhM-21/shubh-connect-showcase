import { useEffect, useRef, useState } from "react";

interface ScrollBlurWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollBlurWrapper({ children, className = "" }: ScrollBlurWrapperProps) {
  const [blurAmount, setBlurAmount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate distance from viewport center with improved thresholds
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
      
      // Create a focus zone where blur is minimal/zero
      const focusZone = windowHeight * 0.3; // 30% of viewport height as focus zone
      const maxDistance = windowHeight * 0.8; // Maximum distance for full blur
      
      // No blur when element is in focus zone
      if (distanceFromCenter <= focusZone) {
        setBlurAmount(0);
        return;
      }
      
      // Calculate blur for elements outside focus zone
      const adjustedDistance = distanceFromCenter - focusZone;
      const adjustedMaxDistance = maxDistance - focusZone;
      const distanceRatio = Math.min(1, adjustedDistance / adjustedMaxDistance);
      
      // Smoother blur curve with maximum of 3px
      const newBlurAmount = Math.pow(distanceRatio, 1.5) * 3;
      setBlurAmount(newBlurAmount);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        filter: `blur(${blurAmount}px)`,
        transition: "filter 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {children}
    </div>
  );
}