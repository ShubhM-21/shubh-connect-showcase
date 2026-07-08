import { Brain, Code, Database, Cloud, GitBranch, Layout, Search, Users, BarChart2, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const skillsData = {
  "Product Management": [
    { name: "Product Strategy", icon: Brain },
    { name: "Roadmapping", icon: Layout },
    { name: "User Research", icon: Users },
    { name: "A/B Testing", icon: BarChart2 },
    { name: "Market Analysis", icon: Search },
    { name: "Agile Methodologies", icon: Zap },
  ],
  "Technical Skills": [
    { name: "Python", icon: Code },
    { name: "SQL", icon: Database },
    { name: "Cloud Platforms (AWS)", icon: Cloud },
    { name: "Git", icon: GitBranch },
  ],
};

export function SkillsSection() {
  return (
    <section id="skills" className="py-12 px-6 lg:px-12 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A blend of product leadership and technical expertise, driving innovation and growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(skillsData).map(([category, skills], index) => (
            <Card 
              key={category}
              className="glass-card animate-fade-in-up" 
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader>
                <CardTitle className="text-2xl gradient-text">{category}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                {skills.map((skill, skillIndex) => {
                  const Icon = skill.icon;
                  return (
                    <Badge 
                      key={skillIndex} 
                      variant="secondary" 
                      className="text-sm px-4 py-2 flex items-center gap-2 glass-card-badge"
                    >
                      <Icon className="h-4 w-4 text-brand-primary" />
                      {skill.name}
                    </Badge>
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
