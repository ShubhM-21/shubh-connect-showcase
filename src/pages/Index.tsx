import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { ContactSection } from "@/components/sections/ContactSection";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="ml-0 lg:ml-20">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <AwardsSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
