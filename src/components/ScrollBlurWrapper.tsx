import { useEffect, useRef, useState } from "react";

interface ScrollBlurWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollBlurWrapper({ children, className = "" }: ScrollBlurWrapperProps) {
  const [blurAmount, setBlurAmount] = useState(3);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the element is visible
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(windowHeight, rect.bottom);
      const visibleHeight = visibleBottom - visibleTop;
      const totalHeight = rect.height;
      
      // Calculate visibility percentage
      const visibilityRatio = Math.max(0, Math.min(1, visibleHeight / Math.min(totalHeight, windowHeight)));
      
      // Convert to blur amount (3px blur when not visible, 0px when fully visible)
      const newBlurAmount = Math.max(0, 3 * (1 - visibilityRatio));
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