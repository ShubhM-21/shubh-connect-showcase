import { useState } from "react";
import { ExternalLink, Github, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    id: 1,
    title: "Creator Growth Analytics Dashboard",
    category: "Product",
    description: "Designed and developed a comprehensive analytics platform for content creators to track engagement metrics, audience growth, and revenue optimization.",
    techStack: ["React", "Python", "SQL", "Tableau", "A/B Testing"],
    role: "Product Intern",
    company: "Rigi",
    link: "#",
    github: "#",
    featured: true,
    impact: "Increased creator retention by 25% and revenue insights adoption by 40%"
  },
  {
    id: 2,
    title: "SaaS User Onboarding Optimization",
    category: "Growth",
    description: "Led user research and A/B testing initiatives to optimize the onboarding flow, reducing time-to-value and improving user activation rates.",
    techStack: ["User Research", "A/B Testing", "Analytics", "Figma"],
    role: "Product & Growth Intern",
    company: "Dunlin (SaaSDen)",
    link: "#",
    github: "#",
    featured: true,
    impact: "Improved activation rate by 35% and reduced onboarding time by 50%"
  },
  {
    id: 3,
    title: "E-commerce Conversion Funnel Analysis",
    category: "Analytics",
    description: "Conducted comprehensive funnel analysis for an e-commerce platform, identifying key drop-off points and implementing solutions to improve conversion rates.",
    techStack: ["SQL", "Python", "Google Analytics", "Data Visualization"],
    role: "Data Analyst",
    link: "#",
    impact: "Increased overall conversion rate by 22% and checkout completion by 18%"
  },
  {
    id: 4,
    title: "Product Roadmap Prioritization Framework",
    category: "Product",
    description: "Developed a data-driven framework for feature prioritization using customer feedback, usage analytics, and business impact scoring.",
    techStack: ["Product Strategy", "Data Analysis", "User Research"],
    role: "Product Strategy",
    link: "#",
    impact: "Improved feature success rate by 40% and reduced development waste"
  },
  {
    id: 5,
    title: "Mobile App Retention Campaign",
    category: "Growth",
    description: "Designed and executed a multi-channel retention campaign targeting dormant users with personalized re-engagement strategies.",
    techStack: ["Behavioral Analytics", "Email Marketing", "Push Notifications"],
    role: "Growth Analyst",
    link: "#",
    impact: "Increased 30-day retention by 28% and monthly active users by 15%"
  }
];

const categories = ["All", "Product", "Analytics", "Growth"];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of my work in product management, analytics, and growth initiatives 
            that have driven measurable business impact.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="glass-card p-2 rounded-xl">
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "ghost"}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                    activeCategory === category 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "hover:bg-accent/20"
                  }`}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card 
              key={project.id}
              className={`glass-card hover:shadow-elegant transition-all duration-500 hover:scale-105 group ${
                project.featured ? "md:col-span-2 lg:col-span-1" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="space-y-4">
                {/* Project Image/Showcase */}
                <div className="aspect-video bg-gradient-to-br from-brand-sage/20 to-brand-primary/20 rounded-lg overflow-hidden relative">
                  {project.featured && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                    </div>
                  )}
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-brand-primary/30 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-2xl font-bold text-brand-primary">
                          {project.category.charAt(0)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{project.category} Project</p>
                    </div>
                  </div>
                  {/* Uncomment when showcase.jpg is available */}
                  {/* {project.featured && (
                    <img 
                      src="/showcase.jpg" 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  )} */}
                </div>

                <div>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl group-hover:text-brand-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>
                  
                  {project.company && (
                    <p className="text-sm text-brand-primary font-medium mb-2">
                      {project.role} • {project.company}
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Impact */}
                {project.impact && (
                  <div className="p-3 bg-brand-green/10 rounded-lg border border-brand-green/20">
                    <p className="text-sm font-medium text-brand-dark">
                      <strong>Impact:</strong> {project.impact}
                    </p>
                  </div>
                )}

                {/* Tech Stack */}
                <div>
                  <p className="text-sm font-medium mb-2">Tech Stack:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1" asChild>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Project
                    </a>
                  </Button>
                  {project.github && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}