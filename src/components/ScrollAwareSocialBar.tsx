"use client";
import { useState, useEffect } from "react";
import { Github, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/shubh-madhyan-5a19b8251/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/ShubhM-21", label: "GitHub" },
  { icon: Instagram, href: "https://www.instagram.com/shubh_madhyan/", label: "Instagram" },
];

export function ScrollAwareSocialBar() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-6 right-6 z-50 flex md:hidden items-center gap-3 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <Button
            key={social.label}
            variant="ghost"
            size="icon"
            asChild
            className="w-10 h-10 rounded-lg glass-card hover:bg-accent/20 hover:scale-110 transition-all duration-300"
            title={social.label}
          >
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event={`MobileSocial - Clicked ${social.label}`}
            >
              <Icon className="h-4 w-4" />
            </a>
          </Button>
        );
      })}
      
      <div className="w-px h-5 bg-border" />
      
      <ThemeToggle minimal />
    </div>
  );
}
