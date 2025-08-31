import { Trophy, Award, Star, GraduationCap, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const achievements = [
  {
    title: "Product Management Cohort Completion",
    organization: "NextLeap",
    year: "2024",
    type: "Certification",
    description: "Successfully completed intensive 12-week product management program covering strategy, analytics, and user research.",
    icon: GraduationCap,
    details: [
      "Top 10% performance in cohort",
      "Led 3 product case studies",
      "Mentored junior cohort members"
    ]
  },
  {
    title: "Best Product Innovation Award",
    organization: "Rigi",
    year: "2024",
    type: "Recognition",
    description: "Recognized for developing innovative creator analytics dashboard that significantly improved platform engagement.",
    icon: Trophy,
    details: [
      "25% increase in creator retention",
      "40% improvement in feature adoption",
      "Cross-functional team leadership"
    ]
  },
  {
    title: "Growth Champion",
    organization: "Dunlin (SaaSDen)",
    year: "2023",
    type: "Achievement",
    description: "Awarded for exceptional performance in user activation and onboarding optimization initiatives.",
    icon: TrendingUp,
    details: [
      "35% improvement in activation rates",
      "50% reduction in onboarding time",
      "Data-driven decision making"
    ]
  },
  {
    title: "Dean's List",
    organization: "BITS Pilani Goa",
    year: "2023",
    type: "Academic",
    description: "Recognized for academic excellence in Electrical & Electronics Engineering with Finance Minor.",
    icon: Star,
    details: [
      "Top 5% of the class",
      "GPA: 8.7/10",
      "Finance specialization with honors"
    ]
  },
  {
    title: "Student Mentor Excellence",
    organization: "BITS Pilani Goa",
    year: "2022-2024",
    type: "Leadership",
    description: "Led mentorship programs for junior students, focusing on career guidance and academic support.",
    icon: Users,
    details: [
      "Mentored 25+ students",
      "95% mentee satisfaction rate",
      "Career transition guidance"
    ]
  }
];

const certifications = [
  "Google Analytics Certified",
  "Product Management Fundamentals",
  "User Experience Research",
  "SQL for Data Analysis",
  "A/B Testing and Experimentation"
];

export function AwardsSection() {
  return (
    <section id="awards" className="py-16 px-6 lg:px-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Awards & <span className="gradient-text">Recognition</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Recognition for excellence in product management, academic achievements, 
            and leadership contributions throughout my journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Awards Timeline */}
          <div className="lg:col-span-2 space-y-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <Card 
                  key={index}
                  className="glass-card hover:shadow-elegant transition-all duration-500 hover:scale-[1.02] animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      {/* Award Icon */}
                      <div className="p-3 bg-gradient-to-br from-brand-primary to-brand-green rounded-xl">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                          <CardTitle className="text-xl gradient-text">
                            {achievement.title}
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{achievement.type}</Badge>
                            <span className="text-sm text-muted-foreground">{achievement.year}</span>
                          </div>
                        </div>
                        <p className="text-brand-primary font-medium mt-1">
                          {achievement.organization}
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {achievement.description}
                    </p>

                    {/* Achievement Details */}
                    <div className="bg-brand-green/10 p-4 rounded-lg border border-brand-green/20">
                      <h4 className="font-semibold mb-2 text-brand-dark">Key Highlights:</h4>
                      <ul className="space-y-1">
                        {achievement.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-brand-primary flex-shrink-0" />
                            <span className="text-sm text-brand-dark">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <Card className="glass-card animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-brand-primary" />
                  Achievement Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-brand-sage/20 to-brand-primary/20 rounded-lg">
                    <div className="text-2xl font-bold gradient-text">5</div>
                    <div className="text-xs text-muted-foreground">Major Awards</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-brand-green/20 to-brand-sage/20 rounded-lg">
                    <div className="text-2xl font-bold gradient-text">8.7</div>
                    <div className="text-xs text-muted-foreground">GPA Score</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-brand-primary/20 to-brand-green/20 rounded-lg">
                    <div className="text-2xl font-bold gradient-text">25+</div>
                    <div className="text-xs text-muted-foreground">Students Mentored</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-brand-light/40 to-brand-sage/20 rounded-lg">
                    <div className="text-2xl font-bold gradient-text">Top 5%</div>
                    <div className="text-xs text-muted-foreground">Class Rank</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="glass-card animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-brand-primary" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-3 bg-accent/20 rounded-lg hover:bg-accent/30 transition-colors"
                    >
                      <div className="w-2 h-2 bg-brand-primary rounded-full flex-shrink-0" />
                      <span className="text-sm font-medium">{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Timeline Visual */}
            <Card className="glass-card animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
              <CardHeader>
                <CardTitle className="text-xl">Journey Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
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