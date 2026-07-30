import HeroSection from './sections/HeroSection';
import SkillsMarquee from './sections/SkillsMarquee';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import ExperienceSection from './sections/ExperienceSection';
import ContactSection from './sections/ContactSection';

export default function App() {
  return (
    <main
      className="min-h-screen w-full bg-[#0C0C0C]"
      style={{ overflowX: 'clip' }}
    >
      <HeroSection />
      <SkillsMarquee />
      <AboutSection />
      <ServicesSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
