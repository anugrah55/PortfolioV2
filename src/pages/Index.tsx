import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/sections/HeroSection";
import { AboutSection } from "../components/sections/AboutSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { SkillsSection } from "../components/sections/SkillsSection";
import { ContactSection } from "../components/sections/ContactSection";
import { Footer } from "../components/Footer";

const Index = () => {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";
    
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
