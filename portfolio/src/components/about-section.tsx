import { Download } from "lucide-react";
import aboutData from "../data/about.json";

interface StatItem {
  value: string;
  label: string;
}

interface PersonalInfo {
  label: string;
  value: string;
  highlight?: boolean;
}

export function AboutSection() {
  const stats = aboutData.stats as StatItem[];
  const personalInfo = aboutData.personalInfo as PersonalInfo[];

  return (
    <section id="about" className="min-h-screen flex items-center py-20 px-6 md:px-12 lg:px-20 bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          <h2 className="text-6xl md:text-7xl font-bold text-muted/30 uppercase tracking-wider absolute left-1/2 -translate-x-1/2 top-0">
            RESUME
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold pt-6 relative z-10">
            ABOUT <span className="text-primary">ME</span>
          </h3>
        </div>

        {/* Personal Info & Stats */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Personal Info */}
          <div>
            <h4 className="text-xl font-bold text-foreground mb-6 uppercase tracking-wide">Personal Information</h4>
            <div className="grid grid-cols-1 gap-4 mb-8">
              {personalInfo.map((item, index) => (
                <div key={index} className="text-sm border-b border-border/50 pb-2 flex justify-between sm:justify-start sm:gap-4">
                  <span className="text-muted-foreground min-w-[100px]">{item.label}</span>{" "}
                  <span className={item.highlight ? "text-primary font-medium" : "text-foreground font-medium"}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            <a
              href="/cv.pdf"
              download="NguyenDaoMinhThuan_CV.pdf"
              className="inline-flex items-center gap-3 bg-black border-2 border-black px-6 py-3 rounded-full font-medium !text-white hover:bg-black/80 transition-colors group"
            >
              DOWNLOAD CV
              <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black group-hover:bg-white/90 transition-colors">
                <Download className="w-4 h-4" />
              </span>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="border border-border rounded-lg p-6 flex items-center gap-4">
                <div>
                  <span className="text-4xl md:text-5xl font-bold text-primary">{stat.value}</span>
                  <span className="text-primary text-2xl"></span>
                </div>
                <div className="text-xs text-muted-foreground uppercase leading-tight tracking-wide max-w-16">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

