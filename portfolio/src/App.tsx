import { useState } from 'react'
import './App.css'
import { HeroSection } from './components/home-section'
import { AboutSection } from './components/about-section'
import { SkillsSection } from './components/skills-section'
import { ContactSection } from './components/contact-section'
import { PortfolioSection } from './components/portfolio-section'
import { SideNav } from './components/side-nav'

function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Ocean Breeze Fade Gradient */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `linear-gradient(225deg, #B3E5FC 0%, #E0F2F1 25%, #F0F4C3 50%, #FFF8E1 75%, #FFECB3 100%)`,
          opacity: 0.6,
        }}
      />

      <div className="relative z-10">
        <SideNav activeSection={activeSection} onNavigate={setActiveSection} />
        <main className="pt-20 lg:pt-0">
          {activeSection === 'home' && <HeroSection onNavigate={setActiveSection} />}
          {activeSection === 'about' && <AboutSection />}
          {activeSection === 'skills' && <SkillsSection />}
          {activeSection === 'portfolio' && <PortfolioSection />}
          {activeSection === 'contact' && <ContactSection />}
        </main>
      </div>
    </div>
  )
}

export default App
