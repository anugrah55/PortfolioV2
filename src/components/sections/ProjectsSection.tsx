import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, Code2, Globe, CheckSquare, Cloud } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  icon: React.ReactNode;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Calculator App",
    description: "A sleek, responsive calculator with scientific functions and a beautiful interface. Built with clean architecture and smooth animations.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    icon: <Code2 className="w-10 h-10" />,
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "This immersive portfolio showcasing my work with stunning animations, effects, and a premium user experience.",
    tech: ["React", "Framer Motion", "Tailwind"],
    icon: <Globe className="w-10 h-10" />,
  },
  {
    id: 3,
    title: "Task Manager",
    description: "A powerful task management app with drag-and-drop, categories, due dates, and real-time sync.",
    tech: ["React", "Node.js", "MongoDB", "Socket.io"],
    icon: <CheckSquare className="w-10 h-10" />,
  },
  {
    id: 4,
    title: "Weather App",
    description: "Beautiful weather application with location detection, 7-day forecasts, animated weather icons.",
    tech: ["React", "OpenWeather API", "CSS3"],
    icon: <Cloud className="w-10 h-10" />,
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = cardRef.current!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;

      gsap.to(cardRef.current, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    };

    const card = cardRef.current;
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="project-card group relative"
      initial={{ opacity: 0, y: 80, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative bg-section-blue rounded-3xl overflow-hidden h-full shadow-glow"
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        {/* Card Content */}
        <div className="p-8 md:p-10">
          {/* Number */}
          <div className="text-palette-yellow font-display font-black opacity-20 absolute top-4 right-6" style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}>
            0{project.id}
          </div>

          <h3 className="font-display font-black text-palette-white mb-4 relative z-10" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            {project.title}
          </h3>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6 relative z-10">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 text-sm rounded-xl bg-section-yellow text-palette-blue font-display font-bold uppercase tracking-wide"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-4 relative z-10">
            <motion.button
              className="flex-1 flex items-center justify-center gap-3 py-4 rounded-xl bg-section-yellow text-palette-blue font-display font-black text-lg uppercase tracking-wide"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <ExternalLink className="w-5 h-5" />
              View
            </motion.button>
            <motion.button
              className="p-4 rounded-xl bg-section-light text-palette-blue hover:bg-palette-white transition-colors"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll(".header-line"),
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative py-28 md:py-36 bg-section-yellow overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 right-[10%] w-40 h-40 rounded-full border-4 border-palette-blue opacity-30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="overflow-hidden mb-12">
          <h2 className="header-line font-display font-black text-palette-blue" style={{ fontSize: "clamp(4rem, 15vw, 12rem)", lineHeight: 0.9 }}>
            Featured
          </h2>
          <h2 className="header-line font-serif italic text-palette-orange" style={{ fontSize: "clamp(4rem, 15vw, 12rem)", lineHeight: 0.9 }}>
            Projects
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
