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
      
      // Calculate distance from viewport center
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
      const maxDistance = windowHeight / 2 + rect.height / 2;
      
      // Calculate blur based on distance from center (0 when centered, up to 2px when far)
      const distanceRatio = Math.min(1, distanceFromCenter / maxDistance);
      const newBlurAmount = distanceRatio * 2;
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
        transition: "filter 0.6s ease-out",
      }}
    >
      {children}
    </div>
  );
}