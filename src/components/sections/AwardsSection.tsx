"use client";

import { Trophy, Award, Star, GraduationCap, Users, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; 

const achievements = [
  {
    title: "HackFast Hackathon — 1st Place",
    organization: "Niyo Solutions",
    year: "2025",
    type: "Recognition",
    description: "Won 1st place at Niyo's internal HackFast Hackathon by building an AI-powered Travel Itinerary Calculator that consolidates flights, stays, transport, activities, and forex costs into a single intuitive platform — solving real travel pain points within a 24-hour sprint.",
    icon: Trophy,
    details: [
      "Won 1st place among competing teams, securing ₹1,00,000 in prize money",
      "Built a fully working prototype within 24 hours",
      "Integrated multiple free APIs for live travel, pricing, and currency data",
      "Delivered real-time trip cost analysis and personalised forex cash recommendations"
    ],
    prototypeLink: "https://v0-trip-planner-ui.vercel.app/"
  },

  {
    title: "Flipkart APM Shortlist",
    organization: "Flipkart",
    year: "2024",
    type: "Recognition",
    description: "Selected among the top 95 candidates from 2,500+ submissions for Flipkart's Associate Product Manager program, competing against participants from 7 IITs and 3 BITS campuses.",
    icon: Star,
    details: [
      "Top 95 out of 2,500+ applicants nationally",
      "Competed against candidates from 7 IITs and 3 BITS campuses",
      "Shortlisted for one of India's most competitive APM programs"
    ]
  },
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
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleAwards = isExpanded ? achievements : achievements.slice(0, 2);

  // CHANGE 2 & 3: tracks which award cards are expanded on mobile (independent per card)
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const toggleExpand = (index: number) => {
    setExpandedCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section id="awards" className="py-12 px-4 md:px-6 lg:px-12">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
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
            {visibleAwards.map((achievement, index) => {
              const Icon = achievement.icon;
              const cardIsExpanded = expandedCards.includes(index);
              return (
                <Card 
                  key={index}
                  onClick={() => toggleExpand(index)}
                  className="glass-card hover:shadow-elegant transition-all duration-500 hover:scale-[1.02] animate-fade-in-up cursor-pointer md:cursor-default"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    {/* CHANGE 1: smaller icon box + tighter icon on mobile, original sizing on desktop */}
                    <div className="flex items-start gap-3 md:gap-4">
                      {/* Award Icon */}
<div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-gradient-to-br from-brand-primary to-brand-green rounded-lg md:rounded-xl flex-shrink-0">
  <Icon className="w-5 h-5 md:w-6 md:h-6 text-white flex-shrink-0" />
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

                    {/* CHANGE 2: Key Highlights wrapped in smoothly animating collapsible grid on mobile,
                        always open on desktop via md:grid-rows-[1fr] */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out md:grid-rows-[1fr] md:opacity-100 ${
                        cardIsExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
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
                      </div>
                    </div>

                    {/* CHANGE 3: mobile-only visual cue, tap passes through to Card's onClick */}
                    <div className="flex md:hidden mt-2 pointer-events-none select-none">
                      <div className="flex w-full items-center justify-center gap-2 py-2 text-sm font-medium text-brand-primary">
                        {cardIsExpanded ? (
                          <>Show Less <ChevronUp className="h-4 w-4"/></>
                        ) : (
                          <>View Details <ChevronDown className="h-4 w-4"/></>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {achievements.length > 2 && (
              <div className="flex justify-center mt-6">
                <Button
  onClick={() => setIsExpanded(!isExpanded)}
  variant="outline"
  size="lg"
  className="glass-card hover:bg-accent/20 transition-all duration-300 px-8"
  data-umami-event={isExpanded ? "Awards - Clicked Show Less" : "Awards - Clicked See More"}
>
  {isExpanded ? (
    <>
      <ChevronUp className="mr-2 h-5 w-5" />
      Show Less
    </>
  ) : (
    <>
      <ChevronDown className="mr-2 h-5 w-5" />
      See More Awards ({achievements.length - 2} more)
    </>
  )}
</Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">

            {/* Certifications */}
            <Card className="glass-card animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
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
          </div>
        </div>
      </div>
    </section>
  );
}