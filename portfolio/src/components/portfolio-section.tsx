import { useState, useEffect } from "react";
import { X, ExternalLink } from "lucide-react";
import portfolioData from "../data/portfolio.json";
import { useReveal } from "../hooks/use-reveal";

type Category = "all" | "backend" | "frontend" | "mobile";

interface PortfolioLink {
  label: string;
  url: string;
}

interface PortfolioItem {
  id: number;
  image: string;
  title: string;
  description: string;
  overview?: string;
  technicalDetails?: {
    backend?: string[];
    frontend?: string[];
    mobile?: string[];
  };
  links: PortfolioLink[];
  category: Category[];
  technologies?: {
    backend?: string[];
    frontend?: string[];
    mobile?: string[];
    thirdParty?: string[];
  };
}

const portfolioItems: PortfolioItem[] = portfolioData.items as PortfolioItem[];
const filters: { label: string; value: Category | "all" }[] = portfolioData.filters as { label: string; value: Category | "all" }[];

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<Category | "all">("all");
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<"overview" | "backend" | "frontend" | "mobile">("overview");
  const { isVisible, ref } = useReveal(0.05);

  useEffect(() => {
    if (selectedProject) {
      setActiveSubTab("overview");
    }
  }, [selectedProject]);

  const filteredItems =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category.includes(activeFilter));

  return (
    <section id="portfolio" ref={ref} className="min-h-screen flex items-center py-20 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary/10 rounded-full blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/2 animate-pulse delay-1000"></div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 relative transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl md:text-8xl font-bold text-muted/30 uppercase tracking-widest select-none">
            WORKS
          </span>
          <h2 className="relative text-3xl md:text-4xl font-bold">
            <span className="text-foreground">MY </span>
            <span className="text-primary">PORTFOLIO</span>
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-6 py-2 rounded-xl text-xs font-bold tracking-widest transition-all uppercase ${activeFilter === filter.value
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "bg-muted text-black/70 dark:bg-neutral-900 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800"
                }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedProject(item)}
              className={`group relative overflow-hidden rounded-lg cursor-pointer bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 ${isVisible ? "animate-in fade-in slide-in-from-bottom duration-500 fill-mode-backwards" : "opacity-0"}`}
              style={{ animationDelay: isVisible ? `${index * 100}ms` : '0ms' }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image || "/default.png"}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium tracking-wide px-4 py-2 border border-white/50 rounded-full hover:bg-white/10 transition-colors">
                    View Details
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.category.map((cat) => (
                    <span
                      key={cat}
                      className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded uppercase"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div
            className="relative w-full max-w-5xl bg-background rounded-xl shadow-2xl animate-in zoom-in-95 duration-200 border border-border my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Modal Content */}
            <div className="p-4 md:p-6">
              <div className="space-y-6">
                {/* Left Side: Avatar + Title + Description */}
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                  <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 overflow-hidden rounded-xl border-2 border-primary/20 bg-muted flex items-center justify-center shadow-lg">
                    <img
                      src={selectedProject.image || "/default.png"}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(selectedProject.title) + '&background=random&color=fff&size=128';
                      }}
                    />
                  </div>

                  <div className="space-y-3 flex-1">
                    <div className="space-y-1.5">
                      <h3 className="text-2xl md:text-4xl font-black tracking-tighter text-foreground leading-tight">{selectedProject.title}</h3>
                      <div className="flex flex-wrap justify-center md:justify-start gap-1.5">
                        {/* Display Categories as Clickable Tags if Links exist */}
                        {selectedProject.category.map((cat) => {
                          const link = selectedProject.links?.find(l =>
                            l.label.toLowerCase().includes(cat.toLowerCase()) ||
                            cat.toLowerCase().includes(l.label.toLowerCase())
                          );
                          const badgeClasses = "text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 transition-all active:scale-95 shadow-sm";

                          if (link) {
                            return (
                              <a key={cat} href={link.url} target="_blank" rel="noopener noreferrer">
                                <span className={`${badgeClasses} bg-primary text-primary-foreground hover:bg-primary/90`}>
                                  {cat}
                                  <ExternalLink size={10} />
                                </span>
                              </a>
                            );
                          }
                          return (
                            <span key={cat} className={`${badgeClasses} bg-muted text-muted-foreground`}>
                              {cat}
                            </span>
                          );
                        })}

                        {/* Display other links that don't match categories */}
                        {selectedProject.links && selectedProject.links
                          .filter(l => !selectedProject.category.some(cat =>
                            l.label.toLowerCase().includes(cat.toLowerCase()) ||
                            cat.toLowerCase().includes(l.label.toLowerCase())
                          ))
                          .map((link, idx) => (
                            <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer">
                              <span className="text-[9px] md:text-[10px] font-bold px-2 py-0.5 bg-foreground text-background rounded-full uppercase tracking-wider flex items-center gap-1 hover:opacity-80 transition-all active:scale-95 shadow-sm">
                                {link.label}
                                <ExternalLink size={10} />
                              </span>
                            </a>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical Details Tabs */}
                <div className="space-y-6">
                  {/* Tab Navigation */}
                  <div className="flex flex-wrap gap-2 md:gap-4 border-b border-border/60">
                    <button
                      onClick={() => setActiveSubTab("overview")}
                      className={`pb-3 px-2 text-sm font-bold uppercase tracking-tight transition-all relative ${activeSubTab === "overview" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      Overview
                      {activeSubTab === "overview" && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-in fade-in zoom-in duration-300"></span>
                      )}
                    </button>
                    {selectedProject.technicalDetails?.backend && (
                      <button
                        onClick={() => setActiveSubTab("backend")}
                        className={`pb-3 px-2 text-sm font-bold uppercase tracking-tight transition-all relative ${activeSubTab === "backend" ? "text-blue-500" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        Backend
                        {activeSubTab === "backend" && (
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full animate-in fade-in zoom-in duration-300"></span>
                        )}
                      </button>
                    )}
                    {selectedProject.technicalDetails?.frontend && (
                      <button
                        onClick={() => setActiveSubTab("frontend")}
                        className={`pb-3 px-2 text-sm font-bold uppercase tracking-tight transition-all relative ${activeSubTab === "frontend" ? "text-green-500" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        Frontend
                        {activeSubTab === "frontend" && (
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 rounded-full animate-in fade-in zoom-in duration-300"></span>
                        )}
                      </button>
                    )}
                    {selectedProject.technicalDetails?.mobile && (
                      <button
                        onClick={() => setActiveSubTab("mobile")}
                        className={`pb-3 px-2 text-sm font-bold uppercase tracking-tight transition-all relative ${activeSubTab === "mobile" ? "text-purple-500" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        Mobile
                        {activeSubTab === "mobile" && (
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 rounded-full animate-in fade-in zoom-in duration-300"></span>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Tab Content */}
                  <div className="min-h-[200px]">
                    {activeSubTab === "overview" && (
                      <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-500">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                          <h6 className="text-[10px] font-black uppercase text-primary tracking-widest">Project Summary</h6>
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-sm md:text-base whitespace-pre-wrap">
                          {selectedProject.overview || selectedProject.description}
                        </p>
                      </div>
                    )}

                    {activeSubTab === "backend" && selectedProject.technicalDetails?.backend && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-left-4 duration-500">
                        <div className="md:col-span-2 space-y-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
                            <h6 className="text-[10px] font-black uppercase text-blue-500 tracking-widest">Implementation Details</h6>
                          </div>
                          <ul className="space-y-3">
                            {selectedProject.technicalDetails.backend.map((item, i) => (
                              <li key={i} className="flex gap-3 text-sm text-muted-foreground items-start group">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0 group-hover:scale-125 transition-transform"></span>
                                <span className="leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="md:col-span-1 space-y-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
                            <h6 className="text-[10px] font-black uppercase text-blue-500 tracking-widest">Technologies</h6>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.technologies?.backend?.map(tech => (
                              <span key={tech} className="px-3 py-1.5 bg-muted border border-border text-[10px] font-bold rounded-lg text-foreground hover:border-blue-500 hover:bg-blue-50 transition-all cursor-default">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeSubTab === "frontend" && selectedProject.technicalDetails?.frontend && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-left-4 duration-500">
                        <div className="md:col-span-2 space-y-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-6 bg-green-500 rounded-full"></div>
                            <h6 className="text-[10px] font-black uppercase text-green-500 tracking-widest">Implementation Details</h6>
                          </div>
                          <ul className="space-y-3">
                            {selectedProject.technicalDetails.frontend.map((item, i) => (
                              <li key={i} className="flex gap-3 text-sm text-muted-foreground items-start group">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0 group-hover:scale-125 transition-transform"></span>
                                <span className="leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="md:col-span-1 space-y-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-6 bg-green-500 rounded-full"></div>
                            <h6 className="text-[10px] font-black uppercase text-green-500 tracking-widest">Technologies</h6>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.technologies?.frontend?.map(tech => (
                              <span key={tech} className="px-3 py-1.5 bg-muted border border-border text-[10px] font-bold rounded-lg text-foreground hover:border-green-500 hover:bg-green-50 transition-all cursor-default">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeSubTab === "mobile" && selectedProject.technicalDetails?.mobile && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-left-4 duration-500">
                        <div className="md:col-span-2 space-y-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-6 bg-purple-500 rounded-full"></div>
                            <h6 className="text-[10px] font-black uppercase text-purple-500 tracking-widest">Implementation Details</h6>
                          </div>
                          <ul className="space-y-3">
                            {selectedProject.technicalDetails.mobile.map((item, i) => (
                              <li key={i} className="flex gap-3 text-sm text-muted-foreground items-start group">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0 group-hover:scale-125 transition-transform"></span>
                                <span className="leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="md:col-span-1 space-y-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-6 bg-purple-500 rounded-full"></div>
                            <h6 className="text-[10px] font-black uppercase text-purple-500 tracking-widest">Technologies</h6>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.technologies?.mobile?.map(tech => (
                              <span key={tech} className="px-3 py-1.5 bg-muted border border-border text-[10px] font-bold rounded-lg text-foreground hover:border-purple-500 hover:bg-purple-50 transition-all cursor-default">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Backdrop Click to Close */}
          <div
            className="absolute inset-0 -z-10"
            onClick={() => setSelectedProject(null)}
          />
        </div>
      )}
    </section>
  );
}
