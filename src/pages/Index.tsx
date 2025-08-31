import { Navigation } from "@/components/Navigation";
import { SocialLinks } from "@/components/SocialLinks";
import { ScrollBlurWrapper } from "@/components/ScrollBlurWrapper";
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
      
      {/* Social Links */}
      <SocialLinks />
      
      {/* Main Content */}
      <main className="transition-all duration-300">
        <HeroSection />
        
        <ScrollBlurWrapper>
          <AboutSection />
        </ScrollBlurWrapper>
        
        <ScrollBlurWrapper>
          <ProjectsSection />
        </ScrollBlurWrapper>
        
        <ScrollBlurWrapper>
          <ExperienceSection />
        </ScrollBlurWrapper>
        
        <ScrollBlurWrapper>
          <AwardsSection />
        </ScrollBlurWrapper>
        
        <ScrollBlurWrapper>
          <ContactSection />
        </ScrollBlurWrapper>
      </main>
    </div>
  );
};

export default Index;
