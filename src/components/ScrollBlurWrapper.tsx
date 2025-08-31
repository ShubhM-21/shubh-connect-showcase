import { useEffect, useRef, useState } from "react";

interface ScrollBlurWrapperProps {
  children: React.ReactNode;
  className?: string;
  protectHeadings?: boolean;
}

export function ScrollBlurWrapper({ children, className = "", protectHeadings = true }: ScrollBlurWrapperProps) {
  const [blurAmount, setBlurAmount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate distance from optimal viewing area
      const elementCenter = rect.top + rect.height / 2;
      const optimalViewStart = windowHeight * 0.2; // 20% from top
      const optimalViewEnd = windowHeight * 0.8;   // 80% from top
      
      // Check if element is in optimal viewing area
      const isInOptimalView = elementCenter >= optimalViewStart && elementCenter <= optimalViewEnd;
      
      if (isInOptimalView) {
        // No blur when in optimal viewing area
        setBlurAmount(0);
        return;
      }
      
      // Calculate blur based on distance from optimal viewing area
      let distanceFromOptimal;
      if (elementCenter < optimalViewStart) {
        // Element is above optimal view
        distanceFromOptimal = optimalViewStart - elementCenter;
      } else {
        // Element is below optimal view
        distanceFromOptimal = elementCenter - optimalViewEnd;
      }
      
      // Maximum distance for full blur effect
      const maxBlurDistance = windowHeight * 0.4;
      const distanceRatio = Math.min(1, distanceFromOptimal / maxBlurDistance);
      
      // Very subtle blur with smooth curve - max 2.5px
      const newBlurAmount = Math.pow(distanceRatio, 2) * 2.5;
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
        filter: blurAmount > 0.1 ? `blur(${blurAmount}px)` : 'none',
        transition: "filter 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {protectHeadings ? (
        <div className="relative">
          {/* Protected headings layer */}
          <div className="relative z-10">
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                // Clone and modify headings to remove them from blur effect
                return React.cloneElement(child, {
                  ...child.props,
                  children: React.Children.map(child.props.children, (grandChild) => {
                    if (React.isValidElement(grandChild) && 
                        typeof grandChild.type === 'string' && 
                        /^h[1-6]$/.test(grandChild.type)) {
                      return React.cloneElement(grandChild, {
                        ...grandChild.props,
                        style: {
                          ...grandChild.props.style,
                          filter: 'none',
                          position: 'relative',
                          zIndex: 20
                        }
                      });
                    }
                    return grandChild;
                  })
                });
              }
              return child;
            })}
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );