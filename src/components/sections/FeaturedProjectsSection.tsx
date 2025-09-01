import { useState } from "react";
import { ExternalLink, Github, Filter, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Project {
  id: number;
  title: string;
  category: "Product" | "Design" | "Analytics";
  subCategory?: "Product Cases" | "PRD" | "Wireframes";
  description: string;
  fullDescription: string;
  impact: string;
  techStack: string[];
  link?: string;
  github?: string;
  featured: boolean;
  images: string[];
  process?: string[];
  context?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Creator Growth Analytics Dashboard",
    category: "Product",
    subCategory: "Product Cases",
    description: "Comprehensive analytics platform for content creators to track engagement metrics, audience growth, and revenue optimization with real-time insights.",
    fullDescription: "Led the end-to-end development of a sophisticated analytics dashboard that transformed how creators understand and optimize their content performance. The platform integrates multiple data sources to provide actionable insights on audience behavior, content performance, and monetization opportunities.",
    context: "Rigi needed a way to help creators make data-driven decisions about their content strategy. The existing analytics were fragmented across multiple tools, making it difficult for creators to get a holistic view of their performance.",
    process: [
      "Conducted user interviews with 50+ creators to understand pain points",
      "Analyzed existing analytics tools and identified key gaps",
      "Created user personas and journey maps",
      "Designed wireframes and prototypes using Figma",
      "Collaborated with engineering team for implementation",
      "Conducted A/B testing on key features",
      "Iterated based on user feedback and usage data"
    ],
    impact: "25% increase in creator retention, 40% improvement in feature adoption, 60% reduction in support tickets",
    techStack: ["React", "Python", "SQL", "Tableau", "A/B Testing", "Figma"],
    link: "#",
    github: "#",
    featured: true,
    images: ["/api/placeholder/600/400", "/api/placeholder/600/400", "/api/placeholder/600/400"]
  },
  {
    id: 2,
    title: "SaaS Onboarding Flow Redesign",
    category: "Product",
    subCategory: "Wireframes",
    description: "Complete redesign of user onboarding experience with progressive disclosure and contextual guidance to improve activation rates.",
    fullDescription: "Redesigned the entire user onboarding experience for a B2B SaaS platform, focusing on reducing cognitive load and improving time-to-value. The new flow uses progressive disclosure and contextual tooltips to guide users through setup.",
    context: "The existing onboarding had a 45% drop-off rate and users were taking too long to reach their first 'aha' moment. We needed to streamline the process while ensuring users understood the platform's value.",
    process: [
      "Analyzed user behavior data and identified drop-off points",
      "Created detailed user flow diagrams",
      "Designed low-fidelity wireframes for new flow",
      "Conducted usability testing with target users",
      "Refined wireframes based on feedback",
      "Created high-fidelity prototypes",
      "Collaborated with development team for implementation"
    ],
    impact: "35% improvement in activation rates, 50% reduction in onboarding time, 28% increase in trial-to-paid conversion",
    techStack: ["Figma", "User Research", "Prototyping", "Usability Testing"],
    link: "#",
    featured: true,
    images: ["/api/placeholder/600/400", "/api/placeholder/600/400"]
  },
  {
    id: 3,
    title: "E-commerce Conversion Analysis",
    category: "Analytics",
    description: "Deep-dive analysis of e-commerce conversion funnel with actionable recommendations that improved overall conversion rates.",
    fullDescription: "Conducted comprehensive analysis of an e-commerce platform's conversion funnel, identifying critical drop-off points and implementing data-driven solutions to improve the customer journey from discovery to purchase.",
    context: "The e-commerce platform was experiencing declining conversion rates despite increased traffic. We needed to understand where users were dropping off and why.",
    process: [
      "Set up comprehensive tracking across the entire funnel",
      "Analyzed user behavior using Google Analytics and Hotjar",
      "Identified key drop-off points in the purchase journey",
      "Conducted user interviews to understand friction points",
      "Created detailed recommendations with priority scoring",
      "Implemented A/B tests for proposed solutions",
      "Monitored results and iterated on improvements"
    ],
    impact: "22% increase in overall conversion rate, 18% improvement in checkout completion, $2.3M additional annual revenue",
    techStack: ["SQL", "Python", "Google Analytics", "Tableau", "A/B Testing"],
    link: "#",
    featured: false,
    images: ["/api/placeholder/600/400"]
  },
  {
    id: 4,
    title: "Product Requirements Document",
    category: "Product",
    subCategory: "PRD",
    description: "Comprehensive PRD for mobile app feature development including user stories, acceptance criteria, and success metrics.",
    fullDescription: "Created a detailed Product Requirements Document for a new mobile app feature that would allow users to collaborate on content creation. The PRD included technical specifications, user stories, and detailed success metrics.",
    context: "The product team needed a clear roadmap for developing a collaborative content creation feature that would differentiate the platform from competitors.",
    process: [
      "Gathered requirements from stakeholders",
      "Conducted competitive analysis",
      "Created detailed user stories and acceptance criteria",
      "Defined success metrics and KPIs",
      "Collaborated with engineering on technical feasibility",
      "Created mockups and user flows",
      "Established testing and rollout plan"
    ],
    impact: "Clear development roadmap, 30% faster development cycle, improved stakeholder alignment",
    techStack: ["Product Strategy", "User Stories", "Wireframing", "Stakeholder Management"],
    link: "#",
    featured: false,
    images: ["/api/placeholder/600/400", "/api/placeholder/600/400"]
  },
  {
    id: 5,
    title: "Design System Components",
    category: "Design",
    description: "Comprehensive design system with reusable components, ensuring consistency across all product touchpoints.",
    fullDescription: "Developed a comprehensive design system that standardized UI components, patterns, and guidelines across multiple product lines. The system improved design consistency and development efficiency.",
    context: "The company had multiple products with inconsistent design patterns, leading to poor user experience and inefficient development processes.",
    process: [
      "Audited existing design patterns across products",
      "Created component library in Figma",
      "Established design tokens and guidelines",
      "Collaborated with development team on implementation",
      "Created documentation and usage guidelines",
      "Conducted training sessions for design and development teams"
    ],
    impact: "50% reduction in design inconsistencies, 40% faster development time, improved user experience scores",
    techStack: ["Figma", "Design Systems", "Component Libraries", "Documentation"],
    link: "#",
    featured: false,
    images: ["/api/placeholder/600/400", "/api/placeholder/600/400", "/api/placeholder/600/400"]
  }
];

const mainCategories = ["All", "Product", "Design", "Analytics"];
const productSubCategories = ["All", "Product Cases", "PRD", "Wireframes"];

export function FeaturedProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSubCategory, setActiveSubCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredProjects = projects.filter(project => {
    if (activeCategory === "All") return true;
    if (project.category !== activeCategory) return false;
    
    if (activeCategory === "Product" && activeSubCategory !== "All") {
      return project.subCategory === activeSubCategory;
    }
    
    return true;
  });

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <section id="featured-projects" className="py-12 px-6 lg:px-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A curated selection of my most impactful work in product management, 
            design, and analytics that showcase my approach to solving complex problems.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-col items-center gap-6 mb-12">
          {/* Main Categories */}
          <div className="glass-card p-2 rounded-xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex gap-2">
              {mainCategories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "ghost"}
                  onClick={() => {
                    setActiveCategory(category);
                    setActiveSubCategory("All");
                  }}
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

          {/* Product Sub-categories */}
          {activeCategory === "Product" && (
            <div className="glass-card p-2 rounded-xl animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="flex gap-2">
                {productSubCategories.map((subCategory) => (
                  <Button
                    key={subCategory}
                    variant={activeSubCategory === subCategory ? "secondary" : "ghost"}
                    onClick={() => setActiveSubCategory(subCategory)}
                    size="sm"
                    className={`px-4 py-1 rounded-lg transition-all duration-300 ${
                      activeSubCategory === subCategory 
                        ? "bg-secondary text-secondary-foreground" 
                        : "hover:bg-accent/20"
                    }`}
                  >
                    {subCategory}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card 
              key={project.id}
              className={`glass-card hover:shadow-elegant transition-all duration-500 hover:scale-[1.02] group cursor-pointer ${
                project.featured ? "md:col-span-2 lg:col-span-1" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openProjectModal(project)}
            >
              <CardHeader className="space-y-4">
                {/* Project Thumbnail */}
                <div className="aspect-video bg-gradient-to-br from-brand-sage/20 to-brand-primary/20 rounded-lg overflow-hidden relative group-hover:shadow-md transition-all duration-300">
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
                </div>

                {/* Project Info */}
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl group-hover:text-brand-primary transition-colors leading-tight">
                      {project.title}
                    </CardTitle>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                    {project.subCategory && (
                      <Badge variant="secondary" className="text-xs">
                        {project.subCategory}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {project.description}
                </p>

                {/* Impact Section */}
                <div className="p-3 bg-brand-green/10 rounded-lg border border-brand-green/20">
                  <p className="text-sm font-medium text-brand-dark">
                    <strong>Impact:</strong> {project.impact}
                  </p>
                </div>

                {/* Tech Stack */}
                <div>
                  <p className="text-sm font-medium mb-2">Tech Stack:</p>
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs px-2 py-1">
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack.length > 4 && (
                      <Badge variant="secondary" className="text-xs px-2 py-1">
                        +{project.techStack.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                  onClick={(e) => {
                    e.stopPropagation();
                    openProjectModal(project);
                  }}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Project
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 animate-fade-in-up">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters to see more projects.
            </p>
          </div>
        )}

        {/* Project Detail Modal */}
        <Dialog open={!!selectedProject} onOpenChange={closeProjectModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
            {selectedProject && (
              <>
                <DialogHeader className="p-6 pb-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <DialogTitle className="text-2xl gradient-text mb-2">
                        {selectedProject.title}
                      </DialogTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{selectedProject.category}</Badge>
                        {selectedProject.subCategory && (
                          <Badge variant="secondary">{selectedProject.subCategory}</Badge>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={closeProjectModal}
                      className="hover:bg-accent/20"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </DialogHeader>

                <ScrollArea className="max-h-[calc(90vh-120px)]">
                  <div className="p-6 space-y-8">
                    {/* Project Images Carousel */}
                    <div className="relative">
                      <div className="aspect-video bg-gradient-to-br from-brand-sage/20 to-brand-primary/20 rounded-lg overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-20 h-20 bg-brand-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                              <span className="text-3xl font-bold text-brand-primary">
                                {selectedProject.category.charAt(0)}
                              </span>
                            </div>
                            <p className="text-lg text-muted-foreground">Project Showcase</p>
                            <p className="text-sm text-muted-foreground mt-2">
                              Image {currentImageIndex + 1} of {selectedProject.images.length}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Image Navigation */}
                      {selectedProject.images.length > 1 && (
                        <>
                          <Button
                            variant="outline"
                            size="icon"
                            className="absolute left-4 top-1/2 -translate-y-1/2 glass-card"
                            onClick={prevImage}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="absolute right-4 top-1/2 -translate-y-1/2 glass-card"
                            onClick={nextImage}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>

                    {/* Project Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 space-y-6">
                        {/* Context */}
                        {selectedProject.context && (
                          <div>
                            <h3 className="text-lg font-semibold mb-3">Context</h3>
                            <p className="text-muted-foreground leading-relaxed">
                              {selectedProject.context}
                            </p>
                          </div>
                        )}

                        {/* Full Description */}
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Overview</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {selectedProject.fullDescription}
                          </p>
                        </div>

                        {/* Process */}
                        {selectedProject.process && (
                          <div>
                            <h3 className="text-lg font-semibold mb-3">Process</h3>
                            <ul className="space-y-2">
                              {selectedProject.process.map((step, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                  <div className="w-6 h-6 bg-brand-primary/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                                    <span className="text-xs font-bold text-brand-primary">
                                      {idx + 1}
                                    </span>
                                  </div>
                                  <span className="text-muted-foreground text-sm leading-relaxed">
                                    {step}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Sidebar */}
                      <div className="space-y-6">
                        {/* Impact */}
                        <Card className="glass-card">
                          <CardHeader>
                            <CardTitle className="text-lg">Impact & Results</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {selectedProject.impact}
                            </p>
                          </CardContent>
                        </Card>

                        {/* Tech Stack */}
                        <Card className="glass-card">
                          <CardHeader>
                            <CardTitle className="text-lg">Technologies Used</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              {selectedProject.techStack.map((tech) => (
                                <Badge key={tech} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                          {selectedProject.link && (
                            <Button className="w-full" asChild>
                              <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Live Project
                              </a>
                            </Button>
                          )}
                          {selectedProject.github && (
                            <Button variant="outline" className="w-full" asChild>
                              <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-4 w-4" />
                                View Code
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}