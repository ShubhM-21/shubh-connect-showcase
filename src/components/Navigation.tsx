import { useState, useEffect } from "react";
import { Home, User, Briefcase, Award, Mail, FolderOpen, Github, Linkedin, Twitter, Instagram } from "lucide-react";
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

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com/in/shubh-madhyan", label: "LinkedIn" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);

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
      }`}
    >
      <div className="flex flex-col items-center space-y-2 p-4">
        {/* Navigation Items */}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="icon"
              onClick={() => scrollToSection(item.id)}
              className={`relative w-12 h-12 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? "bg-primary text-primary-foreground shadow-glow" 
                  : "hover:bg-accent/20 hover:scale-110"
              }`}
              title={item.label}
            >
              <Icon className="h-5 w-5" />
              
              {/* Tooltip */}
              <span className="absolute left-full ml-4 px-2 py-1 bg-card text-card-foreground text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                {item.label}
              </span>
              
              {/* Active indicator */}
              {isActive && (
                <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-full" />
              )}
            </Button>
          );
        })}
        
        {/* Divider */}
        <div className="w-8 h-px bg-border my-2" />
        
        {/* Theme Toggle */}
        <ThemeToggle />
        
        {/* Social Links */}
        <div className="flex flex-col space-y-2 mt-2">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <Button
                key={social.label}
                variant="ghost"
                size="icon"
                asChild
                className="w-10 h-10 rounded-lg hover:bg-accent/20 hover:scale-110 transition-all duration-300 group"
                title={social.label}
              >
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  <Icon className="h-4 w-4" />
                  
                  {/* Tooltip */}
                  <span className="absolute left-full ml-4 px-2 py-1 bg-card text-card-foreground text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    {social.label}
                  </span>
                </a>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}