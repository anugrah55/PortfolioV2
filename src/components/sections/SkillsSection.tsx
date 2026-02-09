import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  icon: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML", icon: "🌐" },
      { name: "CSS", icon: "🎨" },
      { name: "JavaScript", icon: "⚡" },
      { name: "React", icon: "⚛️" },
      { name: "Tailwind", icon: "💨" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: "🟢" },
      { name: "Express", icon: "🚂" },
      { name: "MongoDB", icon: "🍃" },
      { name: "SQL", icon: "💾" },
    ],
  },
  {
    title: "Mobile",
    skills: [
      { name: "Flutter", icon: "📱" },
      { name: "Dart", icon: "🎯" },
    ],
  },
  {
    title: "Languages",
    skills: [
      { name: "Python", icon: "🐍" },
      { name: "Java", icon: "☕" },
      { name: "C++", icon: "⚙️" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", icon: "📦" },
      { name: "GitHub", icon: "🐙" },
      { name: "Linux", icon: "🐧" },
      { name: "APIs", icon: "🔌" },
    ],
  },
  {
    title: "Graphics",
    skills: [
      { name: "Three.js", icon: "🎮" },
      { name: "WebGL", icon: "🌈" },
      { name: "Shaders", icon: "✨" },
    ],
  },
];

interface Particle {
  id: number;
  x: number;
  y: number;
  icon: string;
  vx: number;
  vy: number;
}

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isExploding, setIsExploding] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const allSkills = skillCategories.flatMap((cat) => cat.skills);

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

      // Skill cards stagger
      const cards = sectionRef.current?.querySelectorAll(".skill-card");
      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { y: 80, opacity: 0, scale: 0.9 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
              delay: index * 0.1,
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const triggerExplosion = useCallback(() => {
    if (isExploding) return;

    setIsExploding(true);

    // GSAP explosion on button
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1.2,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      });
    }

    const newParticles: Particle[] = allSkills.map((skill, index) => {
      const angle = (Math.PI * 2 * index) / allSkills.length;
      const speed = 200 + Math.random() * 150;
      return {
        id: index,
        x: 0,
        y: 0,
        icon: skill.icon,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
      };
    });

    setParticles(newParticles);

    setTimeout(() => {
      setIsExploding(false);
      setParticles([]);
    }, 1500);
  }, [isExploding, allSkills]);

  return (
    <section ref={sectionRef} id="skills" className="relative py-28 md:py-36 bg-section-light overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        className="absolute bottom-20 right-[10%] w-56 h-56 rounded-full bg-section-yellow opacity-40"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="overflow-hidden mb-12">
          <h2 className="header-line font-display font-black text-palette-blue" style={{ fontSize: "clamp(4rem, 15vw, 12rem)", lineHeight: 0.9 }}>
            Skills
          </h2>
          <h2 className="header-line font-serif italic text-palette-orange" style={{ fontSize: "clamp(4rem, 15vw, 12rem)", lineHeight: 0.9 }}>
            & Tech
          </h2>
        </div>

        {/* Explosion Trigger Button */}
        <div className="flex justify-center mb-16 relative">
          <motion.button
            ref={buttonRef}
            onClick={triggerExplosion}
            disabled={isExploding}
            className="relative px-10 py-5 rounded-2xl font-display font-black text-xl md:text-2xl bg-section-orange text-palette-white overflow-hidden uppercase tracking-wide"
            whileHover={{ scale: isExploding ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-3">
              {isExploding ? "💥 Boom!" : "💥 Explode Skills"}
            </span>
          </motion.button>

          {/* Explosion Particles */}
          <AnimatePresence>
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute pointer-events-none text-5xl z-50"
                initial={{ x: 0, y: 0, opacity: 1, scale: 1.5 }}
                animate={{
                  x: particle.vx,
                  y: particle.vy,
                  opacity: 0,
                  scale: 0.5,
                  rotate: Math.random() * 360,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                {particle.icon}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              className="skill-card group"
              onMouseEnter={() => setActiveCategory(category.title)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <motion.div
                className="bg-section-blue rounded-3xl p-6 md:p-8 h-full"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <h3 className="font-display font-black text-palette-white mb-6 uppercase tracking-wide" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                  {category.title}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-section-yellow text-palette-blue font-display font-bold text-sm uppercase"
                      whileHover={{ scale: 1.1, y: -3 }}
                      animate={
                        activeCategory === category.title
                          ? {
                              y: [0, -5, 0],
                              transition: {
                                delay: skillIndex * 0.05,
                                duration: 0.3,
                              },
                            }
                          : {}
                      }
                    >
                      <span>{skill.icon}</span>
                      <span>{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
