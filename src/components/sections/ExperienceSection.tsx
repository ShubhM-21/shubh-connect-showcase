import { Calendar, MapPin, TrendingUp, Users, Database, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const experiences = [
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
    ]
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
  return (
    <section id="experience" className="py-12 px-6 lg:px-12 bg-muted/30">
      <div className="container mx-auto px-6">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Experience Timeline */}
          <div className="lg:col-span-2 space-y-8">
            {experiences.map((exp, index) => (
              <Card 
                key={index}
                className="glass-card hover:shadow-elegant transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl gradient-text">{exp.title}</CardTitle>
                      <div className="flex items-center gap-4 mt-2">
                        <p className="text-xl font-semibold text-foreground">{exp.company}</p>
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
                    <div className="w-16 h-16 bg-gradient-to-br from-brand-sage to-brand-primary rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {exp.company.charAt(0)}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>

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
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Skills Sidebar */}
          <div className="space-y-8">
            <Card className="glass-card animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
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

            {/* Quick Stats */}
            <Card className="glass-card animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              <CardHeader>
                <CardTitle className="text-xl">Impact Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-br from-brand-sage/20 to-brand-primary/20 rounded-lg">
                  <div className="text-3xl font-bold gradient-text">60%</div>
                  <div className="text-sm text-muted-foreground">Avg. Improvement</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-brand-green/20 to-brand-sage/20 rounded-lg">
                  <div className="text-3xl font-bold gradient-text">8+</div>
                  <div className="text-sm text-muted-foreground">Team Members Led</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-brand-primary/20 to-brand-green/20 rounded-lg">
                  <div className="text-3xl font-bold gradient-text">100+</div>
                  <div className="text-sm text-muted-foreground">Users Interviewed</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}