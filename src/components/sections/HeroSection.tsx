import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RESUME_PATH } from "@/lib/siteConfig";

export function HeroSection() {
  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-start md:items-center justify-center relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-brand-sage/25 to-brand-green/25 rounded-full blur-3xl animate-float opacity-60" />
        <div className="absolute top-3/4 right-1/4 w-[32rem] h-[32rem] bg-gradient-to-tl from-brand-primary/20 to-brand-light/20 rounded-full blur-3xl animate-float opacity-70" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-brand-green/15 to-brand-sage/15 rounded-full blur-3xl animate-float opacity-50" style={{ animationDelay: "4s" }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-brand-primary/10 to-brand-green/20 rounded-full blur-2xl animate-float opacity-80" style={{ animationDelay: "6s" }} />
        
        {/* Medium Floating Elements */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`medium-${i}`}
            className="absolute w-4 h-4 bg-brand-primary/20 rounded-full animate-float"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 6 + 10}s`,
            }}
          />
        ))}
        
        {/* Small Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`small-${i}`}
            className="absolute w-2 h-2 bg-brand-green/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 12}s`,
              animationDuration: `${Math.random() * 8 + 12}s`,
            }}
          />
        ))}
        
        {/* Subtle Grid Pattern with Animation */}
        <div 
          className="absolute inset-0 opacity-5 animate-pulse" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--brand-primary)) 1px, transparent 0)`,
            backgroundSize: '60px 60px',
            animationDuration: '4s'
          }} 
        />
        
        {/* Flowing Lines */}
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-10" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100,300 Q300,100 500,300 T900,300"
              stroke="hsl(var(--brand-primary))"
              strokeWidth="2"
              fill="none"
              className="animate-pulse"
              style={{ animationDuration: '6s' }}
            />
            <path
              d="M100,700 Q300,500 500,700 T900,700"
              stroke="hsl(var(--brand-green))"
              strokeWidth="2"
              fill="none"
              className="animate-pulse"
              style={{ animationDuration: '8s', animationDelay: '2s' }}
            />
          </svg>
        </div>
      </div>

      {/* Merged: px-4 gap-8 for mobile (VS Code), lg:px-12 md:gap-16 for desktop (Deployed) */}
<div className="container mx-auto px-4 md:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start md:items-center pt-24 md:pt-0 relative z-10 min-h-screen">        
        {/* Content */}
        {/* Merged: pt-4, space-y-5, justify-start for mobile (VS Code), md:pt-0, md:space-y-8, md:justify-center for desktop (Deployed) */}
        <div className="space-y-5 md:space-y-8 animate-fade-in-up flex flex-col justify-start md:justify-center pt-4 md:pt-0">
          <div className="space-y-6 md:space-y-4">
            <p className="text-brand-primary font-medium tracking-wide uppercase text-sm">
              Welcome to my portfolio
            </p>
            {/* Merged: text-6xl for mobile (VS Code), lg:text-7xl for desktop (Deployed) */}
            <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
              <span className="gradient-text">Shubh</span>
              {/* Added mobile line break, kept space for desktop */}
              <br className="block md:hidden" />
              <span className="hidden md:inline"> </span>
              <span className="text-foreground">Madhyan</span>
            </h1>
            <h2 className="text-2xl lg:text-3xl font-light text-muted-foreground">
              Product Manager | Turning Data Into User-Centered Solutions
            </h2>
            {/* Merged text coloring for best contrast across views */}
            <p className="text-lg text-gray-600 dark:text-gray-300 md:text-muted-foreground max-w-lg leading-relaxed">
              Transforming complex data into actionable insights that drive user-centered product decisions. 
              Proven track record of launching products and optimizing user experiences through strategic thinking.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={scrollToProjects}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-elegant hover:shadow-glow transition-all duration-300 group"
              data-umami-event="Hero - Clicked View My Work"
            >
              View My Work
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="glass-card hover:bg-accent/20 transition-all duration-300"
              asChild
            >
              <a
                href={RESUME_PATH}
                download
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="Hero - Downloaded Resume"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </a>
            </Button>
          </div>

          {/* Stats - hidden on mobile (VS Code), standard layout on desktop (Deployed) */}
          <div className="hidden md:flex justify-evenly items-center gap-8 pt-8 border-t border-border/50">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">1+</div>
              <div className="text-sm text-muted-foreground">Year of Impact-Driven Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">3</div>
              <div className="text-sm text-muted-foreground">Major Recognitions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">3</div>
              <div className="text-sm text-muted-foreground">Product Launches/Improvements</div>
            </div>
          </div>
        </div>

        {/* Profile Image - hidden on mobile (VS Code), standard layout on desktop (Deployed) */}
        <div className="hidden md:flex justify-center lg:justify-end animate-fade-in items-center">
          <div className="relative">
            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-br from-brand-green/20 to-brand-primary/20 rounded-3xl blur-3xl animate-float" />
            <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-gradient-to-tl from-brand-sage/20 to-brand-light/20 rounded-full blur-2xl animate-float" style={{ animationDelay: "2s" }} />

            {/* Profile Image Container */}
            <div className="relative w-80 h-96 rounded-3xl overflow-hidden shadow-elegant">
              <img
                src="/Images/HomepageImg.png"
                alt="Shubh Madhyan"
                className="w-full h-full object-cover object-[center_top]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}