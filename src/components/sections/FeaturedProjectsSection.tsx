import { useState } from "react";
import { ExternalLink, Github, Filter, X, ChevronUp, ChevronDown, FileText, BarChart3 } from "lucide-react";
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
  fullDescription?: string;
  impact?: string;
  techStack: string[];
  pdfLink?: string;
  link?: string;
  github?: string;
  imageUrl?: string;
  featured: boolean;
  process?: string[];
  context?: string;
}

const projects: Project[] = [
  // Product Cases
  {
    id: 1,
    title: "Flipkart: Launching India's Next Global Superstar",
    category: "Product",
    subCategory: "Product Cases",
    description: "A hypothetical strategy for launching India's next global superstar by leveraging talent discovery, branding, and go-to-market planning.",
    fullDescription: "This comprehensive product case study explores how Flipkart could enter the talent management space by creating a platform to discover, develop, and launch India's next global entertainment superstar. The strategy covers market analysis, user personas, competitive landscape, and detailed go-to-market planning.",
    context: "With India's growing influence in global entertainment and Flipkart's massive user base, there's an opportunity to create a talent discovery platform that could revolutionize how we identify and nurture entertainment talent.",
    impact: "Potential to capture 15% of India's talent discovery market, estimated $2B opportunity",
    techStack: ["Talent Strategy", "Branding", "Go-To-Market"],
    pdfLink: "https://drive.google.com/file/d/1seIR9Hlt09B_fOLKH5CaID3qiZcB0LXo/view?usp=sharing",
    imageUrl: "https://drive.google.com/uc?export=view&id=1FYuB79B19IQPHwuiLzzXvrSJTvFhRht0",
    featured: true,
  },
  {
    id: 2,
    title: "MoveInSync: Expanding into the US Commute Market",
    category: "Product",
    subCategory: "Product Cases",
    description: "A market entry strategy analyzing US commute segments, personas, regulatory challenges, and MVP design for scaling MoveInSync.",
    fullDescription: "Comprehensive market entry analysis for MoveInSync's expansion into the US corporate commute market. This case study includes detailed market research, regulatory analysis, competitive positioning, and MVP design for the American market.",
    context: "MoveInSync needed a strategic roadmap to enter the competitive US corporate transportation market while adapting their successful Indian model to American business culture and regulations.",
    impact: "Identified $5B addressable market with clear path to 3% market share within 3 years",
    techStack: ["Market Research", "MVP Design", "Competitive Analysis"],
    pdfLink: "https://drive.google.com/file/d/1wSz71yZohK4HycZStHTEdupcGMih9_BH/view?usp=sharing",
    imageUrl: "https://drive.google.com/uc?export=view&id=1uc1D7uTQz10e2sTuOKnGhF7CD-w6iT61",
    featured: true,
  },
  {
    id: 3,
    title: "Ema Unlimited: Transforming Productivity with AI-Powered Task Management",
    category: "Product",
    subCategory: "Product Cases",
    description: "Designing an AI-powered task management solution integrating with enterprise tools to optimize workflows.",
    fullDescription: "A comprehensive product strategy for Ema Unlimited's AI-powered task management platform. This case study covers user research, AI integration strategies, enterprise tool compatibility, and workflow optimization methodologies.",
    context: "Enterprise teams struggle with fragmented productivity tools and inefficient task management. Ema Unlimited needed a strategy to create an AI-first solution that could unify and optimize workplace productivity.",
    impact: "Projected 40% improvement in team productivity and 60% reduction in task management overhead",
    techStack: ["AI Integration", "Workflow Automation", "User Research"],
    pdfLink: "https://drive.google.com/file/d/1DVDUBlTd9LZQvg6HXrjSjlzTRm0pRxaS/view?usp=sharing",
    imageUrl: "https://drive.google.com/uc?export=view&id=1pLXRkSPaEvNPPq4DIhDIKjNm1FR8HeVz",
    featured: true,
  },
  {
    id: 4,
    title: "Unify Apps: Revolutionizing Hospitality Management",
    category: "Product",
    subCategory: "Product Cases",
    description: "Identifying gaps in the hospitality software market and proposing innovative, user-focused solutions for hotels and travelers.",
    fullDescription: "Strategic analysis of the hospitality management software market, identifying key pain points for both hotel operators and travelers. The case study proposes a unified platform that bridges the gap between operational efficiency and guest experience.",
    context: "The hospitality industry relies on fragmented software solutions that create operational inefficiencies and poor guest experiences. Unify Apps needed a strategy to create a comprehensive solution.",
    impact: "Potential to improve hotel operational efficiency by 35% and guest satisfaction scores by 25%",
    techStack: ["Hospitality Tech", "User Interviews", "Competitive Analysis"],
    pdfLink: "https://drive.google.com/file/d/1XPF0jWuLNduOHhMZnAu-EBBPSpmmzF3l/view?usp=sharing",
    imageUrl: "https://drive.google.com/uc?export=view&id=1QMMe_zQLItbEuB3ao1cemKt5H86ZP1t0",
    featured: false,
  },
  // PRDs
  {
    id: 5,
    title: "Smart Configuration Management System for KaneAI",
    category: "Product",
    subCategory: "PRD",
    description: "Building a scalable configuration management system to automate test case allocation, improve usability, and enhance QA efficiency.",
    fullDescription: "Detailed Product Requirements Document for KaneAI's smart configuration management system. This PRD outlines technical specifications, user stories, acceptance criteria, and implementation roadmap for automating QA processes.",
    context: "KaneAI's QA teams were spending excessive time on manual test case allocation and configuration management, reducing overall testing efficiency and increasing time-to-market.",
    impact: "50% reduction in QA setup time, 30% improvement in test coverage, 25% faster release cycles",
    techStack: ["QA Automation", "Config Management", "Scalability"],
    pdfLink: "https://drive.google.com/file/d/133-kXPDEQxrL_j0NwDpmTM5GIOdUEbQN/view?usp=sharing",
    imageUrl: "https://drive.google.com/uc?export=view&id=13Orp7b5o38nqLqi6aVQsGNna22z0_qW_",
    featured: true,
  },
  {
    id: 6,
    title: "Unified SaaS Marketplace Platform for CloudEagle",
    category: "Product",
    subCategory: "PRD",
    description: "Creating a SaaS marketplace to streamline enterprise software discovery, procurement, and vendor management.",
    fullDescription: "Comprehensive PRD for CloudEagle's unified SaaS marketplace platform. This document details the technical architecture, user flows, and business logic required to create a centralized platform for enterprise software procurement.",
    context: "Enterprise teams struggle with SaaS sprawl, vendor management, and procurement inefficiencies. CloudEagle needed a unified platform to solve these challenges.",
    impact: "Projected 45% reduction in procurement time, 30% cost savings on SaaS spending, improved vendor relationship management",
    techStack: ["SaaS Procurement", "Marketplace Design", "Vendor Management"],
    pdfLink: "https://drive.google.com/file/d/1Fn5JQS36zsh0qWGnnNfdGqqP3Nh6upGG/view?usp=sharing",
    imageUrl: "https://drive.google.com/uc?export=view&id=1cDGir_Sj0KJbAMVz7LR4RzO_fB99B6C7",
    featured: true,
  },
  // Analytics Projects
  {
    id: 7,
    title: "Financial Modeling & Valuation Analysis",
    category: "Analytics",
    description: "Comprehensive financial modeling using DCF analysis, ratio analysis, and valuation techniques for investment decision-making.",
    fullDescription: "Built sophisticated financial models incorporating discounted cash flow (DCF) analysis, comprehensive ratio analysis, and multiple valuation methodologies. The project demonstrates advanced Excel modeling skills for investment analysis and corporate finance decision-making.",
    context: "Financial modeling is crucial for investment decisions and corporate strategy. This project showcases the ability to build robust financial models that can guide strategic business decisions.",
    impact: "Created reusable financial modeling framework for investment analysis and valuation",
    techStack: ["Excel", "Financial Modeling", "DCF Analysis", "Valuation"],
    github: "https://github.com/ShubhM-21/Financial-Model",
    featured: false
  },
  {
    id: 8,
    title: "Bank Loan Data Analysis & Dashboard",
    category: "Analytics",
    description: "End-to-end analysis of bank loan portfolio using SQL queries and Power BI dashboards to derive actionable business insights.",
    fullDescription: "Comprehensive analysis of bank loan data using advanced SQL queries for data extraction and transformation, combined with interactive Power BI dashboards. The project provides insights into loan performance, risk assessment, and portfolio optimization strategies.",
    context: "Banks need data-driven insights to optimize their loan portfolios and manage risk effectively. This project demonstrates the ability to transform raw banking data into actionable business intelligence.",
    impact: "Identified key risk factors and optimization opportunities in loan portfolio management",
    techStack: ["SQL", "Power BI", "Data Analysis", "Banking"],
    github: "https://github.com/ShubhM-21/BankLoan-DataAnalysis-SQL-PowerBI",
    featured: false
  },
  {
    id: 9,
    title: "E-Commerce Sales Analysis & Insights",
    category: "Analytics",
    description: "Exploratory data analysis of e-commerce sales data using Python to uncover sales trends, customer behavior, and growth opportunities.",
    fullDescription: "Comprehensive exploratory data analysis (EDA) of e-commerce sales data using Python libraries including Pandas, NumPy, Matplotlib, and Seaborn. The analysis reveals customer purchasing patterns, seasonal trends, and actionable insights for business growth.",
    context: "E-commerce businesses generate vast amounts of data that can provide valuable insights into customer behavior and sales performance. This project demonstrates the ability to extract meaningful insights from complex datasets.",
    impact: "Identified key sales trends and customer segments leading to data-driven growth strategies",
    techStack: ["Python", "Pandas", "Data Visualization", "EDA"],
    github: "https://github.com/ShubhM-21/EDA_E-Commerce_Sales_Python",
    featured: false
  }
];

const mainCategories = ["All", "Product", "Design", "Analytics"];
const productSubCategories = ["All", "Product Cases", "PRD", "Wireframes"];

// Helper function to convert Google Drive share link to embed link
const convertToEmbedLink = (shareLink: string): string => {
  const fileIdMatch = shareLink.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (fileIdMatch) {
    return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
  }
  return shareLink;
};

export function FeaturedProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSubCategory, setActiveSubCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const filteredProjects = projects.filter(project => {
    if (activeCategory === "All") return true;
    if (project.category !== activeCategory) return false;
    
    if (activeCategory === "Product" && activeSubCategory !== "All") {
      return project.subCategory === activeSubCategory;
    }
    
    return true;
  });

  const displayedProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 6);
  const hasMoreProjects = filteredProjects.length > 6;

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  // Handle ESC key for modal
  useState(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeProjectModal();
      }
    };
    
    if (selectedProject) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  });

  return (
    <section id="projects" className="py-12 px-6 lg:px-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A curated selection of my most impactful work in product management, 
            showcasing strategic thinking, user research, and data-driven solutions.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-col items-center gap-6 mb-12">
          {/* Main Categories */}
          <div className="glass-card p-2 rounded-xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex flex-wrap gap-2 justify-center">
              {mainCategories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "ghost"}
                  onClick={() => {
                    setActiveCategory(category);
                    setActiveSubCategory("All");
                    setShowAllProjects(false);
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
              <div className="flex flex-wrap gap-2 justify-center">
                {productSubCategories.map((subCategory) => (
                  <Button
                    key={subCategory}
                    variant={activeSubCategory === subCategory ? "secondary" : "ghost"}
                    onClick={() => {
                      setActiveSubCategory(subCategory);
                      setShowAllProjects(false);
                    }}
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
          {displayedProjects.map((project, index) => (
            <Card 
              key={project.id}
              className={`glass-card hover:shadow-elegant transition-all duration-500 hover:scale-[1.02] group cursor-pointer ${
                project.featured ? "ring-2 ring-brand-primary/20" : ""
              } hover:ring-2 hover:ring-brand-primary/30`}
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
                  {project.imageUrl ? (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`w-full h-full flex items-center justify-center ${project.imageUrl ? 'hidden' : ''}`}>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-brand-primary/30 rounded-full flex items-center justify-center mx-auto mb-2">
                        {project.category === "Analytics" ? (
                          <BarChart3 className="h-8 w-8 text-brand-primary" />
                        ) : (
                          <FileText className="h-8 w-8 text-brand-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{project.subCategory || project.category}</p>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div>
                  <CardTitle className="text-xl group-hover:text-brand-primary transition-colors leading-tight mb-3">
                    {project.title}
                  </CardTitle>
                  
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
                {project.impact && (
                  <div className="p-3 bg-brand-green/10 rounded-lg border border-brand-green/20">
                    <p className="text-sm font-medium text-brand-dark">
                      <strong>Impact:</strong> {project.impact}
                    </p>
                  </div>
                )}

                {/* Tech Stack */}
                <div>
                  <p className="text-sm font-medium mb-2">Focus Areas:</p>
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs px-2 py-1">
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack.length > 3 && (
                      <Badge variant="secondary" className="text-xs px-2 py-1">
                        +{project.techStack.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                {project.github ? (
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.github, '_blank');
                    }}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View Project
                  </Button>
                ) : (
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      openProjectModal(project);
                    }}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    View Project
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* See More / Show Less Button */}
        {hasMoreProjects && (
          <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <Button
              onClick={() => setShowAllProjects(!showAllProjects)}
              variant="outline"
              size="lg"
              className="glass-card hover:bg-accent/20 transition-all duration-300 px-8"
            >
              {showAllProjects ? (
                <>
                  <ChevronUp className="mr-2 h-5 w-5" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="mr-2 h-5 w-5" />
                  See More Projects ({filteredProjects.length - 6} more)
                </>
              )}
            </Button>
          </div>
        )}

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
          <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden">
            {selectedProject && (
              <>
                <DialogHeader className="p-6 pb-4 border-b border-border/50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <DialogTitle className="text-3xl gradient-text mb-3">
                        {selectedProject.title}
                      </DialogTitle>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="text-sm">
                          {selectedProject.category}
                        </Badge>
                        {selectedProject.subCategory && (
                          <Badge variant="secondary" className="text-sm">
                            {selectedProject.subCategory}
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedProject.fullDescription || selectedProject.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={closeProjectModal}
                      className="hover:bg-accent/20 ml-4"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </DialogHeader>

                <div className="flex-1 overflow-hidden">
                  {selectedProject.pdfLink ? (
                    <div className="h-[calc(90vh-200px)] w-full">
                      <iframe
                        src={convertToEmbedLink(selectedProject.pdfLink)}
                        className="w-full h-full border-0"
                        title={`${selectedProject.title} - Project Document`}
                        allow="autoplay"
                      />
                    </div>
                  ) : (
                    <ScrollArea className="h-[calc(90vh-200px)]">
                      <div className="p-6 space-y-8">
                        {/* Project Image */}
                        {selectedProject.imageUrl && (
                          <div className="aspect-video bg-gradient-to-br from-brand-sage/20 to-brand-primary/20 rounded-lg overflow-hidden">
                            <img 
                              src={selectedProject.imageUrl} 
                              alt={selectedProject.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        {/* Project Details Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                          <div className="lg:col-span-2 space-y-6">
                            {/* Context */}
                            {selectedProject.context && (
                              <div>
                                <h3 className="text-xl font-semibold mb-4 text-brand-primary">Context</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                  {selectedProject.context}
                                </p>
                              </div>
                            )}

                            {/* Process */}
                            {selectedProject.process && (
                              <div>
                                <h3 className="text-xl font-semibold mb-4 text-brand-primary">Process</h3>
                                <ul className="space-y-3">
                                  {selectedProject.process.map((step, idx) => (
                                    <li key={idx} className="flex items-start gap-4">
                                      <div className="w-8 h-8 bg-brand-primary/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                                        <span className="text-sm font-bold text-brand-primary">
                                          {idx + 1}
                                        </span>
                                      </div>
                                      <span className="text-muted-foreground leading-relaxed">
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
                            {selectedProject.impact && (
                              <Card className="glass-card">
                                <CardHeader>
                                  <CardTitle className="text-lg text-brand-primary">Impact & Results</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {selectedProject.impact}
                                  </p>
                                </CardContent>
                              </Card>
                            )}

                            {/* Tech Stack */}
                            <Card className="glass-card">
                              <CardHeader>
                                <CardTitle className="text-lg text-brand-primary">Focus Areas</CardTitle>
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
                              {selectedProject.pdfLink && (
                                <Button className="w-full" asChild>
                                  <a href={selectedProject.pdfLink} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Open Full PDF
                                  </a>
                                </Button>
                              )}
                              {selectedProject.link && (
                                <Button variant="outline" className="w-full" asChild>
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
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}