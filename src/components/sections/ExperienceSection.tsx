import { Calendar, MapPin, TrendingUp, Users, Database, Target, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    title: "Associate Product Manager",
    company: "The Sleep Company",
    location: "Mumbai, India",
    period: "Feb 2026 - Jun 2026",

    type: "Full-time",
    description: "Leading product optimization initiatives across the primary funnel, focusing on conversion rate optimization, SEO/AEO enhancements, and driving omni-channel growth.",
    responsibilities: [
      "Increased lead captures by 12% by refining recommender CTAs and deploying targeted city-based pop-up nudges, driving ₹14.7L+ in revenue within one month.",
      "Expanded delivery and installation APIs to support a generic restricted-category framework (e.g., sofas, desks), successfully transitioning specific SKUs from free to tiered monetization models.",
      "Implemented SEO and GEO optimization strategies to improve search discoverability and AI-engine visibility, driving 22% organic and 19% AI-engine traffic growth within two months.",
      "Ran A/B tests on key action buttons to improve clickability and streamline user interactions, increasing clicks by 45%."
    ],
    technologies: ["A/B Testing", "SEO/AEO", "CRO", "Product Strategy", "Analytics"],
    image: "/Images/TSC Logo.jpg",
  },
  {
    title: "Program Manager Intern (Founder's Office)",
    company: "Niyo Solutions",
    location: "Bangalore, India",
    period: "May 2025 - Oct 2025",
    type: "Internship",
    description: "Leading end-to-end remittance funnel optimization and partner integrations to drive adoption and improve user experience in the fintech space.",
    responsibilities: [
      "Owned remittance funnel end‑to‑end; mapped pain points, fixed drop‑offs, and shipped experiments that lifted adoption and repeats",
      "Scaled remittance via partner integrations and in‑app placements; defined metrics, ran A/Bs, and improved CTR→transfer conversion",
      "Reduced KYC verification TAT by redesigning SOPs and automating edge‑case routing; set SLAs and event telemetry to cut retries",
      "Built P&L and cohort models for rewards; optimized unit economics with ROI guardrails to curb coins burn while sustaining growth",
      "Instrumented funnel stages (view→recipient→KYC→pay→settle) with dashboards and alerts to drive weekly product/ops rituals"
    ],
    technologies: ["Product Strategy", "User Research", "A/B Testing", "Analytics", "Figma"],
    achievements: [
      "Improved remittance funnel conversion rates through systematic optimization",
      "Reduced KYC verification turnaround time significantly",
      "Built comprehensive P&L models for sustainable growth"
    ],
    image: "/Images/Niyo logo.png",
  },
  {
    title: "Product Intern",
    company: "Rigi",
    location: "Bangalore, India",
    period: "Aug 2024 - Dec 2024",
    type: "Internship",
    description: "Led product initiatives for creator monetization platform, focusing on analytics dashboard development and user experience optimization.",
    responsibilities: [
      "Designed and developed creator analytics dashboard resulting in 25% increase in creator retention",
      "Conducted user research with 50+ creators to identify pain points and feature requirements",
      "Collaborated with engineering teams to implement data visualization features",
      "Performed A/B testing on key user flows, improving conversion rates by 18%",
      "Created product roadmaps and feature prioritization frameworks"
    ],
    technologies: ["Product Strategy", "User Research", "A/B Testing", "Analytics", "Figma"],
    achievements: [
      "Increased creator platform engagement by 40%",
      "Reduced onboarding time from 15 to 8 minutes",
      "Led cross-functional team of 8 members"
    ],
    image: "/Images/Rigi logo.webp",
  },
  {
    title: "Product & Growth Intern",
    company: "Dunlin (SaaSDen)",
    location: "Remote",
    period: "May 2023 - Jul 2023",
    type: "Internship",
    description: "Focused on user onboarding optimization and growth initiatives for B2B SaaS platform, implementing data-driven strategies to improve user activation.",
    responsibilities: [
      "Optimized user onboarding flow through comprehensive user journey mapping",
      "Implemented growth experiments resulting in 35% improvement in activation rates",
      "Analyzed user behavior data to identify conversion bottlenecks",
      "Designed and executed email marketing campaigns for user re-engagement",
      "Created growth metrics dashboard for executive team reporting"
    ],
    technologies: ["Growth Analytics", "SQL", "Email Marketing", "User Journey Mapping", "KPI Tracking"],
    achievements: [
      "Improved 7-day user activation by 35%",
      "Reduced customer acquisition cost by 22%",
      "Designed growth framework adopted company-wide"
    ]
  }
];

const skills = [
  { icon: TrendingUp, label: "Growth Strategy", level: 90 },
  { icon: Users, label: "User Research", level: 85 },
  { icon: Database, label: "Data Analysis", level: 88 },
  { icon: Target, label: "Product Strategy", level: 82 }
];

export function ExperienceSection() {
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  const [mobilePage, setMobilePage] = useState(0);
  const [expandedExperienceId, setExpandedExperienceId] = useState<number | null>(null);

  const displayedExperiences = showAllExperiences ? experiences : experiences.slice(0, 2);
  const hasMoreExperiences = experiences.length > 2;

  const MOBILE_CHUNK_SIZE = 2;
  const mobileChunks: typeof experiences[] = [];
  for (let i = 0; i < experiences.length; i += MOBILE_CHUNK_SIZE) {
    mobileChunks.push(experiences.slice(i, i + MOBILE_CHUNK_SIZE));
  }
  const safeMobilePage = mobileChunks.length > 0 ? Math.min(mobilePage, mobileChunks.length - 1) : 0;

  const goToNextMobilePage = () => {
    setMobilePage((prev) => Math.min(prev + 1, mobileChunks.length - 1));
  };
  const goToPrevMobilePage = () => {
    setMobilePage((prev) => Math.max(prev - 1, 0));
  };

  const toggleExpand = (id: number) => {
    setExpandedExperienceId((prev) => (prev === id ? null : id));
  };

  // Shared card renderer used by both the mobile paginated view and the
  // untouched desktop stack. `index` is always the true index into the
  // `experiences` array so expand-state and animation delays stay correct
  // across both render paths.
  const renderExperienceCard = (exp: typeof experiences[number], index: number) => {
    const isExpanded = expandedExperienceId === index;

    return (
      <Card
        key={index}
        onClick={() => toggleExpand(index)}
        className="glass-card hover:shadow-elegant transition-all duration-500 animate-fade-in-up group hover:scale-[1.01] cursor-pointer md:cursor-default"
        style={{ animationDelay: `${index * 0.2}s` }}
      >
        <CardHeader>
          {/* Mobile-only tight header — no logo, no location */}
          <div className="md:hidden">
            <CardTitle className="text-xl gradient-text">{exp.title}</CardTitle>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <p className="font-semibold text-foreground text-sm">{exp.company}</p>
              <Badge variant="outline" className="text-xs">{exp.type}</Badge>
            </div>
            <div className="flex items-center gap-2 mt-1 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span className="text-xs">{exp.period}</span>
            </div>
          </div>

          {/* Desktop header — identical to original, just gated behind hidden md:flex */}
          <div className="hidden md:flex md:flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl gradient-text group-hover:scale-105 transition-transform duration-300">{exp.title}</CardTitle>
              <div className="flex items-center gap-4 mt-2">
                <p className="text-xl font-semibold text-foreground group-hover:text-brand-primary transition-colors duration-300">{exp.company}</p>
                <Badge variant="outline">{exp.type}</Badge>
              </div>
              <div className="flex items-center gap-6 mt-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{exp.period}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{exp.location}</span>
                </div>
              </div>
            </div>

            {/* Company Logo Placeholder */}
            <div className="w-16 h-16 bg-gradient-to-br from-brand-sage to-brand-primary rounded-xl flex items-center justify-center overflow-hidden">
              {exp.image ? (
                <img src={exp.image} alt={`${exp.company} logo`} className="w-full h-full object-cover" />
              ) : (
                <span className="text-white font-bold text-lg">
                  {exp.company.charAt(0)}
                </span>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            {exp.description}
          </p>

          {/* Key Responsibilities + Technologies + Achievements grouped into one
              smoothly-animating collapsible region on mobile. Always open on desktop via md:grid-rows-[1fr]. */}
          <div
            className={`grid transition-all duration-300 ease-in-out md:grid-rows-[1fr] md:opacity-100 ${
              isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="space-y-6">
                {/* Key Responsibilities */}
                <div>
                  <h4 className="font-semibold mb-3">Key Responsibilities:</h4>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((responsibility, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-brand-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm leading-relaxed">
                          {responsibility}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="font-semibold mb-3">Technologies & Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Key Achievements */}
                {exp.achievements && (
                  <div className="bg-brand-green/10 p-4 rounded-lg border border-brand-green/20">
                    <h4 className="font-semibold mb-3 text-brand-dark">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-brand-primary flex-shrink-0" />
                          <span className="text-sm text-brand-dark">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile-only visual cue — tap passes through to the Card's onClick */}
          <div className="flex md:hidden mt-2 pointer-events-none select-none">
            <div className="flex w-full items-center justify-center gap-2 py-2 text-sm font-medium text-brand-primary">
              {isExpanded ? (
                <>Show Less <ChevronUp className="h-4 w-4"/></>
              ) : (
                <>View Details <ChevronDown className="h-4 w-4"/></>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section id="experience" className="py-12 px-4 md:px-6 lg:px-12 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My journey in product management and growth, where I've contributed to meaningful 
            business impact through data-driven decision making.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Experience Timeline */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Mobile-only paginated, swipeable groups of 2 */}
            <div className="md:hidden">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${safeMobilePage * 100}%)` }}
                >
                  {mobileChunks.map((chunk, pageIdx) => (
                    <div key={pageIdx} className="w-full flex-shrink-0 flex flex-col gap-8">
                      {chunk.map((exp, chunkIdx) =>
                        renderExperienceCard(exp, pageIdx * MOBILE_CHUNK_SIZE + chunkIdx)
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {mobileChunks.length > 1 && (
                <div className="flex items-center justify-center gap-4 mt-6">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToPrevMobilePage}
                    disabled={safeMobilePage === 0}
                    className="rounded-full disabled:opacity-30"
                    aria-label="Previous page"
                    data-umami-event="Experience Mobile - Clicked Previous Page"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>

                  <div className="flex gap-2">
                    {mobileChunks.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setMobilePage(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === safeMobilePage ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30"
                        }`}
                        aria-label={`Go to page ${i + 1}`}
                        data-umami-event={`Experience Mobile - Clicked Dot ${i + 1}`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToNextMobilePage}
                    disabled={safeMobilePage === mobileChunks.length - 1}
                    className="rounded-full disabled:opacity-30"
                    aria-label="Next page"
                    data-umami-event="Experience Mobile - Clicked Next Page"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>

            {/* Desktop stack — unchanged */}
            <div className="hidden md:block space-y-8">
              {displayedExperiences.map((exp, index) => renderExperienceCard(exp, index))}

              {hasMoreExperiences && (
                <div className="text-center mt-8">
                  <Button
                    onClick={() => setShowAllExperiences(!showAllExperiences)}
                    variant="outline"
                    size="lg"
                    className="glass-card hover:bg-accent/20 transition-all duration-300 px-8"
                    data-umami-event={showAllExperiences ? "Experience - Clicked Show Less" : "Experience - Clicked See More"}
                  >
                    {showAllExperiences ? (
                      <>
                        <ChevronUp className="mr-2 h-5 w-5" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="mr-2 h-5 w-5" />
                        See More Experiences ({experiences.length - 2} more)
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Skills Sidebar */}
          <div className="space-y-8">
            {/* Core Skills hidden entirely on mobile */}
            <Card className="hidden md:block glass-card animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <CardHeader>
                <CardTitle className="text-xl">Core Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <div key={skill.label} className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-brand-primary" />
                        <span className="font-medium">{skill.label}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-brand-primary to-brand-green h-2 rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${skill.level}%`,
                            animationDelay: `${index * 0.2}s`
                          }}
                        />
                      </div>
                      <div className="text-right text-xs text-muted-foreground">
                        {skill.level}%
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Journey Timeline — remains visible on mobile, unchanged */}
            <Card className="glass-card animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              <CardHeader>
                <CardTitle className="text-xl">Journey Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">26</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Product Management</p>
                      <p className="text-xs text-muted-foreground">The Sleep Company</p>
                    </div>
                  </div>
                  <div className="ml-4 h-6 w-px bg-border" />
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">25</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Graduation & Program Management</p>
                      <p className="text-xs text-muted-foreground">BITS Pilani Goa & Niyo Solutions</p>
                    </div>
                  </div>
                  <div className="ml-4 h-6 w-px bg-border" />
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">24</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Product Management</p>
                      <p className="text-xs text-muted-foreground">Rigi & NextLeap</p>
                    </div>
                  </div>
                  <div className="ml-4 h-6 w-px bg-border" />
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">23</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Growth & Analytics</p>
                      <p className="text-xs text-muted-foreground">Dunlin (SaaSDen)</p>
                    </div>
                  </div>
                  <div className="ml-4 h-6 w-px bg-border" />
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-sage rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">21</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Academic Excellence</p>
                      <p className="text-xs text-muted-foreground">BITS Pilani Goa</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}