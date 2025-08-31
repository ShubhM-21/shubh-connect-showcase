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
      <main className="transition-all duration-300 ml-16 lg:ml-20">
        <HeroSection />
        
        <ScrollBlurWrapper protectHeadings={true}>
          <AboutSection />
        </ScrollBlurWrapper>
        
        <ScrollBlurWrapper protectHeadings={true}>
          <ProjectsSection />
        </ScrollBlurWrapper>
        
        <ScrollBlurWrapper protectHeadings={true}>
          <ExperienceSection />
        </ScrollBlurWrapper>
        
        <ScrollBlurWrapper protectHeadings={true}>
          <AwardsSection />
        </ScrollBlurWrapper>
        
        <ScrollBlurWrapper protectHeadings={true}>
          <ContactSection />
        </ScrollBlurWrapper>
      </main>
    </div>
  );
};

export default Index;
