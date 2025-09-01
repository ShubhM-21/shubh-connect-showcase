import { useState, useEffect } from "react";
import { Home, User, Briefcase, Award, Mail, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "awards", label: "Awards", icon: Award },
  { id: "contact", label: "Contact", icon: Mail },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.id);
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav 
      className={`fixed left-6 top-1/2 -translate-y-1/2 z-50 transition-all duration-500 ${
        isScrolled ? "glass-card shadow-elegant" : "bg-transparent"
      } ${isExpanded ? "w-48" : "w-16"}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col items-start space-y-2 p-4">
        {/* Navigation Items */}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => scrollToSection(item.id)}
              className={`relative w-full h-12 rounded-xl transition-all duration-300 ${
                isExpanded ? "justify-start pl-4" : "justify-center"
              } ${
                isActive 
                  ? "bg-primary text-primary-foreground shadow-glow" 
                  : "hover:bg-accent/20"
              } ${isExpanded ? "" : "w-12 px-0"}`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              
              {/* Expanded Text */}
              <span className={`ml-3 whitespace-nowrap transition-all duration-300 ${
                isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
              }`}>
                {item.label}
              </span>
            </Button>
          );
        })}
        
        {/* Divider */}
        <div className="w-8 h-px bg-border my-2" />
        
        {/* Theme Toggle */}
        <div className={`${isExpanded ? "w-full" : "w-12 flex justify-center"} transition-all duration-300`}>
          <ThemeToggle expanded={isExpanded} />
        </div>
      </div>
    </nav>
  );
}