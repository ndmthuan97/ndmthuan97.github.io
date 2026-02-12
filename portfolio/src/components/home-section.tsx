import { ArrowRight } from "lucide-react";
import homeData from "../data/home.json";

export function HeroSection({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const { name, role, bio, profileImage } = homeData;

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden">
      {/* Yellow accent shape */}
      <div className="absolute top-0 left-0 w-32 md:w-48 lg:w-64 h-32 md:h-48 lg:h-64 bg-primary rounded-br-full" />
      <div className="absolute bottom-0 left-0 w-48 md:w-64 lg:w-80 h-32 md:h-48 lg:h-64 bg-primary" style={{ clipPath: "polygon(0 100%, 100% 100%, 0 0)" }} />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 flex justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 w-full max-w-7xl">
          {/* Profile Image */}
          <div className="relative z-10 flex-shrink-0">
            <div className="relative w-64 aspect-[3/4] md:w-80 lg:w-[28rem] overflow-hidden shadow-2xl animate-profile border-4 border-primary/20">
              <img
                src={profileImage}
                alt={`${name} - ${role}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left z-10 max-w-2xl">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
              <span className="w-10 h-0.5 bg-primary" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                <span className="text-primary">{`I'M ${name.toUpperCase()}.`}</span>
              </h1>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {role}
            </h2>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 whitespace-pre-line">
              {bio}
            </p>

            {/* CTA Button */}
            <button
              type="button"
              onClick={() => {
                onNavigate?.("about");
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary text-primary-foreground font-semibold tracking-wide hover:bg-primary transition-all group"
            >
              <span>MORE ABOUT ME</span>
              <span className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center group-hover:bg-primary-foreground group-hover:text-primary transition-colors">
                <ArrowRight className="w-5 h-5" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
