import { useState } from "react";
import { Send, MapPin, Mail, Phone, Download, Linkedin, Github, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "shubh.madhyan@example.com",
    href: "mailto:shubh.madhyan@example.com"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Bangalore, India",
    href: "#"
  }
];

const socialLinks = [
  { 
    icon: Linkedin, 
    label: "LinkedIn", 
    href: "https://linkedin.com/in/shubh-madhyan",
    color: "text-blue-600 hover:text-blue-700"
  },
  { 
    icon: Github, 
    label: "GitHub", 
    href: "https://github.com",
    color: "text-gray-800 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
  },
  { 
    icon: Twitter, 
    label: "Twitter", 
    href: "https://twitter.com",
    color: "text-blue-400 hover:text-blue-500"
  },
  { 
    icon: Instagram, 
    label: "Instagram", 
    href: "https://instagram.com",
    color: "text-pink-600 hover:text-pink-700"
  }
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "I'll get back to you as soon as possible.",
      });
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I'm always excited to discuss new opportunities, collaborate on interesting projects, 
            or simply chat about product management and growth strategies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="glass-card animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Send className="h-6 w-6 text-brand-primary" />
                  Send me a message
                </CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and I'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="glass-card border-border/50 focus:border-brand-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className="glass-card border-border/50 focus:border-brand-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project, opportunity, or just say hello..."
                      rows={6}
                      className="glass-card border-border/50 focus:border-brand-primary resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-elegant hover:shadow-glow transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-5 w-5" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-8">
            {/* Contact Information */}
            <Card className="glass-card animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <CardHeader>
                <CardTitle className="text-xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-center gap-4 group">
                      <div className="p-3 bg-brand-primary/10 rounded-lg group-hover:bg-brand-primary/20 transition-colors">
                        <Icon className="h-5 w-5 text-brand-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{info.label}</p>
                        {info.href === "#" ? (
                          <p className="text-sm text-muted-foreground">{info.value}</p>
                        ) : (
                          <a 
                            href={info.href}
                            className="text-sm text-muted-foreground hover:text-brand-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Resume Download */}
            <Card className="glass-card animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-green rounded-full flex items-center justify-center mx-auto">
                    <Download className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Download Resume</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get a detailed overview of my experience and skills.
                    </p>
                    <Button 
                      variant="outline" 
                      className="glass-card hover:bg-accent/20 transition-all duration-300 w-full"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download CV
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="glass-card animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              <CardHeader>
                <CardTitle className="text-xl">Follow Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        asChild
                        className="glass-card hover:bg-accent/20 transition-all duration-300 group"
                      >
                        <a 
                          href={social.href} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <Icon className={`h-4 w-4 ${social.color}`} />
                          <span className="text-sm">{social.label}</span>
                        </a>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border/50 text-center animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
          <p className="text-muted-foreground">
            © 2024 Shubh Madhyan. Built with React, TypeScript, and Tailwind CSS.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Designed with passion for great user experiences.
          </p>
        </div>
      </div>
    </section>
  );
}