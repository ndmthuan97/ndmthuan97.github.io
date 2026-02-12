import React from "react"
import { Home, User, Briefcase, Wrench, Mail } from "lucide-react";
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
  const navItems: NavItem[] = navData.navItems.map((item) => ({
    ...item,
    icon: ICON_MAP[item.icon] || <Home className="w-6 h-6" />,
  }));

  return (
    <div className="fixed right-6 top-6 lg:top-1/2 lg:-translate-y-1/2 flex flex-col items-center gap-4 z-50">
      {/* Navigation */}
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
  );
}
