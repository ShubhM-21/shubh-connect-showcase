import { GraduationCap, Target, Lightbulb, BarChart3, Users, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const skills = [
  { icon: BarChart3, label: "Data Analytics", description: "Advanced statistical analysis and data visualization" },
  { icon: Lightbulb, label: "Product Strategy", description: "Market research, competitive analysis, and roadmapping" },
  { icon: Users, label: "User Research", description: "User interviews, surveys, and behavioral analysis" },
  { icon: Zap, label: "Growth Hacking", description: "A/B testing, funnel optimization, and retention strategies" },
];

const education = [
  {
    institution: "BITS Pilani Goa",
    degree: "B.E. Electrical & Electronics Engineering",
    minor: "Finance Minor",
    period: "2021-2025",
    description: "Strong foundation in analytical thinking and problem-solving"
  },
  {
    institution: "NextLeap",
    degree: "Product Management Cohort",
    period: "2024",
    description: "Intensive training in product strategy, user research, and data-driven decision making"
  }
];

export function AboutSection() {
  return (
    <section id="about" className="py-12 px-4 md:px-6 lg:px-12 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          {/* Merged: Left aligned on mobile, centered on desktop */}
          <p className="text-left md:text-center text-slate-700 dark:text-slate-300 md:text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            I'm passionate about bridging the gap between user needs and business objectives through 
            data-driven product decisions. My journey combines engineering precision with strategic thinking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Left Column - Bio & Goals */}
          <div className="flex flex-col h-full space-y-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            
            {/* Restored 'My Mission' block from Deployed Code */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold flex items-center gap-3 mb-6">
                <Target className="h-6 w-6 text-brand-primary" />
                My Mission
              </h3>
              <p className="text-left text-slate-700 dark:text-slate-300 md:text-muted-foreground text-base md:text-lg leading-relaxed">
                To transform complex user needs into intuitive digital experiences through data-driven 
                product decisions. I believe exceptional products are born from deep user understanding, 
                strategic thinking, and measurable impact.
              </p>
              <p className="text-left text-slate-700 dark:text-slate-300 md:text-muted-foreground text-base md:text-lg leading-relaxed">
                Having recently scaled core product mechanics and omnichannel funnels at <strong className="text-brand-primary">The Sleep Company</strong>, 
                and previously shipping critical growth features at <strong className="text-brand-primary">Niyo Solutions</strong> and <strong className="text-brand-primary">Rigi</strong>, 
                I specialize in owning the full roadmap-to-release cycle. From expanding robust API frameworks to launching conversational commerce experiments that move core business metrics, 
                I thrive on turning ambiguous problems into measurable business outcomes.
              </p>
            </div>

            {/* Skills Grid */}
            <div className="space-y-6 mt-auto">
              <h3 className="text-2xl font-semibold text-left">Core Competencies</h3>
              {/* Merged: 2-column on both mobile and desktop, gap scaled for desktop */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <Card 
                      key={skill.label} 
                      className="glass-card hover:shadow-card transition-all duration-300 hover:scale-105"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardContent className="p-3 md:p-4">
                        {/* Merged: Stacked/Centered on mobile, Row/Left-aligned on desktop */}
                        <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon className="h-5 w-5 text-brand-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm">{skill.label}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {skill.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Education & Visual */}
          <div className="flex flex-col h-full space-y-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            {/* Education */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold flex items-center gap-3 mb-6">
                <GraduationCap className="h-6 w-6 text-brand-primary" />
                Education
              </h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <Card key={index} className="glass-card hover:shadow-card transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-lg">{edu.institution}</h4>
                          <span className="text-sm text-brand-primary font-medium">
                            {edu.period}
                          </span>
                        </div>
                        <p className="text-brand-primary font-medium">{edu.degree}</p>
                        {edu.minor && (
                          <p className="text-sm text-muted-foreground">{edu.minor}</p>
                        )}
                        {/* Restored missing description */}
                        <p className="text-muted-foreground">{edu.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Workspace Image - Hidden on mobile, visible on desktop */}
            <div className="mt-auto hidden md:block">
              <Card className="glass-card overflow-hidden">
                <img 
                  src="/Images/AboutSec-Light.png" 
                  alt="My Workspace"
                  className="block dark:hidden w-full h-auto rounded-xl object-cover shadow-lg"
                />
                <img 
                  src="/Images/AboutSec.png" 
                  alt="My Workspace"
                  className="hidden dark:block w-full h-auto rounded-xl object-cover shadow-lg"
                />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}