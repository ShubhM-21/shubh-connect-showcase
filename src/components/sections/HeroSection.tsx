import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-brand-sage/20 to-brand-green/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-brand-primary/15 to-brand-light/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-brand-green/10 to-brand-sage/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-brand-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 6 + 8}s`,
            }}
          />
        ))}
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--brand-primary)) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Content */}
        <div className="space-y-8 animate-fade-in-up">
          <div className="space-y-4">
            <p className="text-brand-primary font-medium tracking-wide uppercase text-sm">
              Welcome to my portfolio
            </p>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="gradient-text">Shubh</span>{" "}
              <span className="text-foreground">Madhyan</span>
            </h1>
            <h2 className="text-2xl lg:text-3xl font-light text-muted-foreground">
              Aspiring Product Manager / Analyst
            </h2>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Turning data-driven insights into impactful user experiences. 
              Combining analytical thinking with product strategy to build solutions that matter.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              onClick={scrollToProjects}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-elegant hover:shadow-glow transition-all duration-300 group"
            >
              View My Work
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="glass-card hover:bg-accent/20 transition-all duration-300"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 pt-8 border-t border-border/50">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">2+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">5+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">100%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Profile Image */}
        <div className="flex justify-center lg:justify-end animate-fade-in">
          <div className="relative">
            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-br from-brand-green/20 to-brand-primary/20 rounded-3xl blur-3xl animate-float" />
            <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-gradient-to-tl from-brand-sage/20 to-brand-light/20 rounded-full blur-2xl animate-float" style={{ animationDelay: "2s" }} />
            
            {/* Profile Image Container */}
            <div className="relative w-80 h-96 rounded-3xl overflow-hidden shadow-elegant">
              <div className="w-full h-full bg-gradient-to-br from-brand-sage to-brand-primary flex items-center justify-center">
                <div className="text-6xl font-bold text-white/20">SM</div>
              </div>
              {/* Uncomment when portrait.jpg is available */}
              {/* <img 
                src="/portrait.jpg" 
                alt="Shubh Madhyan"
                className="w-full h-full object-cover"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}