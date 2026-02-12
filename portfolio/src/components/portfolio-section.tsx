import { useState } from "react";
import { X, ExternalLink } from "lucide-react";
import portfolioData from "../data/portfolio.json";

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
  links: PortfolioLink[];
  category: Category[];
}

const portfolioItems: PortfolioItem[] = portfolioData.items as PortfolioItem[];
const filters: { label: string; value: Category | "all" }[] = portfolioData.filters as { label: string; value: Category | "all" }[];

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<Category | "all">("all");
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const filteredItems =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category.includes(activeFilter));

  return (
    <section id="portfolio" className="min-h-screen flex items-center py-20 bg-background relative">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center mb-12 relative">
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
              className={`text-sm font-medium tracking-wider transition-colors uppercase ${activeFilter === filter.value
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedProject(item)}
              className="group relative overflow-hidden rounded-lg cursor-pointer bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image || "./public/default.png"}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-5xl bg-background rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-border"
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
            <div className="p-6 md:p-8">
              {/* Header: Avatar + Title */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-xl border border-border/50">
                  <img
                    src={selectedProject.image || "./public/default.png"}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold">{selectedProject.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedProject.category.map((cat) => (
                      <span
                        key={cat}
                        className="text-xs font-bold px-2.5 py-1 bg-primary/10 text-primary rounded-md uppercase"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {selectedProject.description}
                </p>
              </div>

              {/* Links */}
              <div className="flex flex-col sm:flex-row gap-3">
                {selectedProject.links && selectedProject.links.length > 0 ? (
                  selectedProject.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-5 py-2.5 bg-black font-medium rounded-lg hover:bg-black/80 gap-2 flex-1 sm:flex-none sm:w-auto min-w-[140px] text-white transition-colors"
                    >
                      <span>{link.label}</span>
                      <ExternalLink size={16} className="opacity-70 text-white" />
                    </a>
                  ))
                ) : (
                  <span className="text-muted-foreground text-sm italic">No links available</span>
                )}
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
