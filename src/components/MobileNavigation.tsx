"use client";
import { useState, useEffect } from "react";
import { User, FolderOpen, Briefcase, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const mobileNavItems = [
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "contact", label: "Contact", icon: Mail },
];

export function MobileNavigation() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      const sections = mobileNavItems.map(item => item.id);
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
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex md:hidden justify-evenly items-center w-[85%] max-w-[330px] px-1.5 py-2.48 rounded-full bg-gray-500/15 backdrop-blur-xl border-white/20 shadow-lg dark:bg-slate-800/40 dark:backdrop-blur-xl dark:border-white/10 dark:shadow-black/50">
      {mobileNavItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;

        return (
          <Button
            key={item.id}
            variant="ghost"
            // Note: size="icon" is intentionally removed so we can control the width dynamically
            onClick={() => scrollToSection(item.id)}
            className={`h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
              isActive
                ? "w-[72px] bg-black/10 dark:bg-white/15 text-brand-primary" // Active state: Wide pill with background
                : "w-11 bg-transparent text-muted-foreground hover:text-foreground hover:bg-transparent" // Inactive state: Normal width
            }`}
            data-umami-event={`MobileNav - Clicked ${item.label}`}
          >
            <Icon size={20} className="!w-4 !h-4 shrink-0" />
          </Button>
        );
      })}
    </nav>
  );
}
