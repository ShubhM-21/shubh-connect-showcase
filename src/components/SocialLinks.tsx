import { Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com/in/shubh-madhyan", label: "LinkedIn" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

export function SocialLinks() {
  return (
    <div className="fixed top-6 right-6 z-50 flex space-x-2">
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <Button
            key={social.label}
            variant="ghost"
            size="icon"
            asChild
            className="w-10 h-10 rounded-lg glass-card hover:bg-accent/20 hover:scale-110 transition-all duration-300 group"
            title={social.label}
          >
            <a href={social.href} target="_blank" rel="noopener noreferrer">
              <Icon className="h-4 w-4" />
            </a>
          </Button>
        );
      })}
    </div>
  );
}