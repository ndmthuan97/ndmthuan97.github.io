import { Mail, Github, Linkedin, MapPin } from "lucide-react";
import contactData from "../data/contact.json";
import { useReveal } from "../hooks/use-reveal";

const ICON_MAP: Record<string, React.ElementType> = {
    Mail,
    Github,
    Linkedin,
    MapPin,
};

export function ContactSection() {
    const { isVisible, ref } = useReveal(0.05);

    return (
        <section id="contact" ref={ref} className="min-h-screen flex items-center py-20 bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                {/* Header */}
                <div className={`text-center mb-16 relative transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl md:text-8xl font-bold text-muted/30 uppercase tracking-widest select-none whitespace-nowrap">
                        CONTACT
                    </span>
                    <h2 className="relative text-3xl md:text-4xl font-bold">
                        <span className="text-foreground">GET IN </span>
                        <span className="text-primary">TOUCH</span>
                    </h2>
                    <div className="w-20 h-1.5 bg-primary mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Intro Text */}
                <div className={`mb-12 text-center max-w-3xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                    <h3 className="text-3xl font-bold mb-4">{contactData.intro.title}</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        {contactData.intro.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Contact Info */}
                    <div className="flex flex-col gap-6">
                        {contactData.contacts.map((contact, index) => {
                            const Icon = ICON_MAP[contact.icon];
                            const isLink = !!contact.href;
                            const Wrapper = isLink ? "a" : "div";
                            const wrapperProps = isLink
                                ? {
                                    href: contact.href,
                                    target: contact.id !== "email" ? "_blank" : undefined,
                                    rel: contact.id !== "email" ? "noopener noreferrer" : undefined,
                                }
                                : {};

                            return (
                                <Wrapper
                                    key={contact.id}
                                    {...wrapperProps}
                                    className={`group flex items-center gap-5 p-5 rounded-xl bg-card border border-border/50 ${isVisible ? "animate-in slide-in-from-left fade-in duration-500 fill-mode-backwards" : "opacity-0"} ${isLink
                                        ? "hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                                        : ""
                                        }`}
                                    style={{ animationDelay: isVisible ? `${300 + (index * 100)}ms` : '0ms' }}
                                >
                                    <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                        {Icon && <Icon size={28} />}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-foreground">{contact.label}</h4>
                                        <p className="text-muted-foreground group-hover:text-primary transition-colors">
                                            {contact.value}
                                        </p>
                                    </div>
                                </Wrapper>
                            );
                        })}
                    </div>

                    {/* Contact Form / Decorative Image */}
                    <div className={`relative ${isVisible ? "animate-in slide-in-from-right fade-in duration-700 delay-500 fill-mode-backwards" : "opacity-0"}`}>
                        <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-16 -mt-16 transition-all duration-500 group-hover:bg-primary/20"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/10 rounded-full blur-2xl -ml-12 -mb-12 transition-all duration-500 group-hover:bg-secondary/20"></div>

                            <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
                            <form className="flex flex-col gap-4">
                                <div className="flex flex-col md:flex-row gap-4">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="w-full p-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full p-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Subject"
                                    className="w-full p-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                                />
                                <textarea
                                    placeholder="Message"
                                    rows={5}
                                    className="w-full p-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
                                ></textarea>
                                <button
                                    type="button"
                                    className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all transform hover:scale-[1.02] shadow-lg shadow-primary/25"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
