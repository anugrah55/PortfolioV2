import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { PhysicsBackground } from "./PhysicsBackground";

gsap.registerPlugin(ScrollTrigger);

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 100, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Stats cards stagger animation
      if (statsRef.current) {
        const cards = statsRef.current.querySelectorAll(".stat-card");
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { y: 120, opacity: 0, scale: 0.8, rotateX: -20 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotateX: 0,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
              delay: index * 0.2,
            }
          );

          // Counter animation
          const valueEl = card.querySelector(".stat-value");
          if (valueEl) {
            const endValue = parseInt(valueEl.textContent || "0");
            gsap.fromTo(
              { val: 0 },
              { val: endValue },
              {
                val: endValue,
                duration: 2.5,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                },
                onUpdate: function () {
                  valueEl.textContent = Math.floor(this.targets()[0].val) + "+";
                },
              }
            );
          }
        });
      }

      // Quote card animation
      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { y: 100, opacity: 0, scale: 0.9, rotateY: 10 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: quoteRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Content paragraphs with stagger
      if (contentRef.current) {
        const paragraphs = contentRef.current.querySelectorAll("p");
        paragraphs.forEach((p, index) => {
          gsap.fromTo(
            p,
            { y: 80, opacity: 0, x: index % 2 === 0 ? -50 : 50 },
            {
              y: 0,
              opacity: 1,
              x: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: p,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
              delay: index * 0.15,
            }
          );
        });

        // Skill tags with elastic animation
        const tags = contentRef.current.querySelectorAll(".skill-tag");
        tags.forEach((tag, index) => {
          gsap.fromTo(
            tag,
            { scale: 0, opacity: 0, rotation: -20, y: 50 },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              y: 0,
              duration: 0.7,
              ease: "elastic.out(1, 0.5)",
              scrollTrigger: {
                trigger: contentRef.current,
                start: "top 50%",
              },
              delay: 0.6 + index * 0.08,
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: "10", label: "Projects Completed", icon: "🚀" },
    { value: "15", label: "Technologies Learned", icon: "⚡" },
    { value: "3", label: "Years of Experience", icon: "💫" },
  ];

  const skills = [
    "Full-Stack",
    "React",
    "Flutter",
    "Three.js",
    "UI/UX",
    "Node.js",
    "MongoDB",
    "GSAP",
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 md:py-44 bg-section-orange overflow-hidden"
    >
      {/* Physics Background */}
      <PhysicsBackground />

      {/* Content Container */}
      <div className="relative z-10">
        {/* Section Heading */}
        <div className="container mx-auto px-6 mb-16">
          <h2
            ref={headingRef}
            className="font-display font-black text-palette-light leading-none"
            style={{ fontSize: "clamp(4rem, 15vw, 12rem)" }}
          >
            About <span className="font-serif italic text-section-yellow">Me</span>
          </h2>
        </div>

        {/* Stats Cards */}
        <div ref={statsRef} className="container mx-auto px-6 mb-20">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                className="stat-card group bg-section-yellow rounded-[2rem] p-8 md:p-10 text-center shadow-premium relative overflow-hidden border-4 border-palette-blue"
                style={{ perspective: "1000px" }}
                whileHover={{ scale: 1.03, y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="stat-value font-display font-black text-palette-blue leading-none" style={{ fontSize: "clamp(5rem, 12vw, 10rem)" }}>
                  {stat.value}+
                </div>
                <div className="text-palette-blue font-display font-bold text-lg md:text-xl uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quote Banner */}
        <div className="container mx-auto px-6 mb-20">
          <motion.div
            ref={quoteRef}
            className="relative bg-section-light border-4 border-palette-blue rounded-[2rem] p-10 md:p-14 overflow-hidden"
            whileHover={{ scale: 1.01 }}
          >
            <p className="font-display font-black text-palette-blue text-center leading-tight" style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)" }}>
              Building <span className="font-serif italic text-palette-orange">modern</span> &{" "}
              <span className="font-serif italic text-palette-orange">interactive</span> digital experiences.
            </p>
          </motion.div>
        </div>

        {/* Skill tags */}
        <div ref={contentRef} className="container mx-auto px-6">
          <div className="flex flex-wrap gap-4 md:gap-5 justify-center">
            {skills.map((skill) => (
              <motion.span
                key={skill}
                className="skill-tag px-8 py-4 rounded-full bg-section-yellow text-palette-blue font-display font-black text-xl md:text-2xl border-4 border-palette-blue cursor-default uppercase tracking-wide"
                whileHover={{
                  scale: 1.1,
                  y: -5,
                  rotate: Math.random() * 6 - 3,
                }}
                whileTap={{ scale: 0.95 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
