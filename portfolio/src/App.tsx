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
    <div className="bg-background text-foreground min-h-screen">
      <SideNav activeSection={activeSection} onNavigate={setActiveSection} />
      <main className="pt-20 lg:pt-0">
        {activeSection === 'home' && <HeroSection onNavigate={setActiveSection} />}
        {activeSection === 'about' && <AboutSection />}
        {activeSection === 'skills' && <SkillsSection />}
        {activeSection === 'portfolio' && <PortfolioSection />}
        {activeSection === 'contact' && <ContactSection />}
      </main>
    </div>
  )
}

export default App
