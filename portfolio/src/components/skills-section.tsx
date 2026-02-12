import skillsData from "../data/skills.json";

interface Skill {
    icon: string;
}

interface SkillCategory {
    title: string;
    skills: Skill[];
}

export function SkillsSection() {
    const skillCategories = skillsData.skillCategories as SkillCategory[];

    return (
        <section id="skills" className="min-h-screen flex items-center py-20 px-6 md:px-12 lg:px-20 bg-background">
            <div className="container mx-auto max-w-6xl">
                {/* Section Header */}
                <div className="text-center mb-16 relative">
                    <h2 className="text-6xl md:text-7xl font-bold text-muted/30 uppercase tracking-wider absolute left-1/2 -translate-x-1/2 top-0">
                        EXPERTISE
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold pt-6 relative z-10">
                        MY <span className="text-primary">SKILLS</span>
                    </h3>
                </div>

                {/* Skills Content */}
                <div className="space-y-12">
                    {skillCategories.map((category, idx) => (
                        <div key={idx} className="text-center">
                            <h5 className="text-lg font-semibold text-muted-foreground mb-6">{category.title}</h5>
                            <div className="flex flex-wrap justify-center gap-4">
                                {category.skills.map((skill, sIdx) => {
                                    const imgSrc = `https://go-skill-icons.vercel.app/api/icons?i=${skill.icon}`;
                                    const label = skill.icon;
                                    return (
                                        <div
                                            key={sIdx}
                                            className={`w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden flex items-center justify-center transform hover:scale-110 transition-transform cursor-default group relative`}
                                        >
                                            {imgSrc ? (
                                                <img src={imgSrc} alt={label} className="w-full h-full object-contain p-2 md:p-3" />
                                            ) : (
                                                <span className={`text-[10px] md:text-xs font-bold text-white uppercase px-1 text-center leading-tight`}>
                                                    {label}
                                                </span>
                                            )}

                                            {/* Tooltip */}
                                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                {label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
