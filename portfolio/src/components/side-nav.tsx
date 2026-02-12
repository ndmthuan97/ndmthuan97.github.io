import React, { useState } from "react"
import { Home, User, Briefcase, Wrench, Mail, Menu, X } from "lucide-react";
import navData from "../data/navigation.json";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Home: <Home className="w-6 h-6" />,
  User: <User className="w-6 h-6" />,
  Wrench: <Wrench className="w-6 h-6" />,
  Briefcase: <Briefcase className="w-6 h-6" />,
  Mail: <Mail className="w-6 h-6" />,
};

export function SideNav({ activeSection, onNavigate }: { activeSection: string; onNavigate: (section: string) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: NavItem[] = navData.navItems.map((item) => ({
    ...item,
    icon: ICON_MAP[item.icon] || <Home className="w-6 h-6" />,
  }));

  const handleNavClick = (href: string) => {
    onNavigate(href);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-4 z-50">
        <nav className="flex flex-col gap-4">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => onNavigate(item.href)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer ${activeSection === item.href
                ? "bg-primary text-primary-foreground"
                : "bg-muted border border-border text-muted-foreground hover:text-primary hover:border-primary"
                }`}
              aria-label={item.label}
            >
              {item.icon}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Navigation Toggle */}
      <div className="lg:hidden fixed right-6 bottom-6 z-50">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-xl cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div
            className="relative bg-[#2D2D2D]/90 backdrop-blur-2xl rounded-[3rem] w-[320px] h-[320px] shadow-2xl border border-white/10 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Center Decoration (Subtle light effect) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white/5 blur-3xl" />

            {navItems.map((item, index) => {
              // Equidistant pentagon layout (360 / 5 = 72 degrees)
              const angle = (index * 72) - 90; // Starting from top center
              const radius = 100; // Radius in pixels
              const rad = (angle * Math.PI) / 180;
              const x = 160 + radius * Math.cos(rad);
              const y = 160 + radius * Math.sin(rad);

              return (
                <button
                  key={index}
                  onClick={() => handleNavClick(item.href)}
                  className="absolute flex flex-col items-center justify-center group transition-all -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                  }}
                  aria-label={item.label}
                >
                  <div className={`transition-all ${activeSection === item.href
                    ? "text-primary scale-125"
                    : "text-white group-hover:text-primary"
                    }`}>
                    {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-8 h-8" })}
                  </div>
                </button>
              );
            })}
          </div>
          {/* Close Backdrop */}
          <div className="absolute inset-0 -z-10" onClick={() => setIsMenuOpen(false)} />
        </div>
      )}
    </>
  );
}
