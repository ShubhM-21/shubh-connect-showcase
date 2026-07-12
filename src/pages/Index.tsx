import { Navigation } from "@/components/Navigation";
import { SocialLinks } from "@/components/SocialLinks";
import { ScrollBlurWrapper } from "@/components/ScrollBlurWrapper";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { MobileNavigation } from "@/components/MobileNavigation";
import { ScrollAwareSocialBar } from "@/components/ScrollAwareSocialBar";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      {/* Navigation */}
      <Navigation />
      
      {/* Social Links (desktop) */}
      <SocialLinks />
      
      {/* Scroll-aware social bar (mobile) */}
      <ScrollAwareSocialBar />
      
      {/* Main Content */}
      {/* Kept px-0 for mobile, replaced all desktop padding/max-width with md:ml-16 lg:ml-20 to match deployed code */}
      <main className="transition-all duration-300 px-0 md:ml-16 lg:ml-20">
        <HeroSection />
        
        <ScrollBlurWrapper protectHeadings={true}>
          <AboutSection />
        </ScrollBlurWrapper>
        
        <ScrollBlurWrapper protectHeadings={true}>
          <FeaturedProjectsSection />
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
      
      {/* Mobile Bottom Navigation */}
      <MobileNavigation />
    </div>
  );
};

export default Index;