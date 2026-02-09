import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "../MagneticButton";
import { ScrollIndicator } from "../ScrollIndicator";

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main name animation with split text
      const nameElement = nameRef.current;
      if (nameElement) {
        const firstName = nameElement.querySelector(".first-name");
        const lastName = nameElement.querySelector(".last-name");

        gsap.fromTo(
          firstName,
          { y: 200, opacity: 0, rotateX: -45 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1.2, ease: "power4.out", delay: 0.3 }
        );

        gsap.fromTo(
          lastName,
          { y: 200, opacity: 0, rotateX: -45 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1.2, ease: "power4.out", delay: 0.5 }
        );
      }

      // Subtitle stagger animation
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current.querySelectorAll(".subtitle-line"),
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.15, delay: 0.8 }
        );
      }

      // CTA buttons
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.querySelectorAll("button, a"),
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1, delay: 1.2 }
        );
      }

      // Robot float animation
      if (robotRef.current) {
        gsap.fromTo(
          robotRef.current,
          { scale: 0, opacity: 0, rotation: -15 },
          { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: "elastic.out(1, 0.5)", delay: 0.6 }
        );

        gsap.to(robotRef.current, {
          y: -20,
          duration: 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // Speech bubble
      if (bubbleRef.current) {
        gsap.fromTo(
          bubbleRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)", delay: 1 }
        );
      }

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (nameRef.current) {
            gsap.set(nameRef.current, { y: progress * 100 });
          }
          if (robotRef.current) {
            gsap.set(robotRef.current, { y: progress * -80, scale: 1 - progress * 0.3 });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-section-light">
      {/* Decorative shapes */}
      <motion.div
        className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-section-yellow opacity-50"
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 left-[5%] w-40 h-40 rounded-2xl bg-section-blue opacity-30"
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 left-[15%] w-20 h-20 rounded-full border-4 border-palette-blue opacity-40"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Floating Robot/Character */}
      <div
        ref={robotRef}
        className="absolute right-[5%] md:right-[10%] bottom-[15%] md:bottom-[20%]"
      >
        <div className="w-32 h-32 md:w-56 md:h-56 bg-section-blue rounded-3xl flex items-center justify-center relative shadow-glow">
          {/* Robot face */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-section-blue rounded-full" />
          <div className="w-20 h-14 md:w-32 md:h-24 bg-section-light rounded-xl flex items-center justify-center gap-3 md:gap-6">
            <div className="w-5 h-5 md:w-8 md:h-8 bg-section-blue rounded-full animate-pulse" />
            <div className="w-5 h-5 md:w-8 md:h-8 bg-section-blue rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
          </div>
          {/* Smile */}
          <div className="absolute bottom-8 md:bottom-10 w-12 md:w-16 h-2 border-b-4 border-palette-light rounded-full" />
        </div>
      </div>

      {/* Speech bubble with yellow */}
      <div
        ref={bubbleRef}
        className="absolute right-[25%] md:right-[30%] top-[30%] md:top-[25%] hidden md:block"
      >
        <div className="relative bg-section-yellow border-4 border-palette-blue rounded-2xl p-8 w-52 h-36 shadow-glow-highlight">
          <span className="text-palette-blue font-display font-bold text-lg">Let's build something amazing!</span>
          {/* Triangle pointer */}
          <div className="absolute -bottom-6 right-8 w-0 h-0 border-l-[20px] border-l-transparent border-t-[24px] border-t-[#F2F56F] border-r-[20px] border-r-transparent" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-6xl">
          {/* Main Name with mixed typography */}
          <div ref={nameRef} className="mb-6 overflow-hidden">
            <h1 className="leading-none" style={{ perspective: "1000px" }}>
              <span className="first-name block font-serif italic text-palette-orange" style={{ fontSize: "clamp(5rem, 18vw, 14rem)", lineHeight: 0.85 }}>
                Anugrah
              </span>
              <span className="last-name block font-display font-black text-palette-blue tracking-tighter" style={{ fontSize: "clamp(5rem, 18vw, 14rem)", lineHeight: 0.85 }}>
                Sengar
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div ref={subtitleRef} className="overflow-hidden mb-10">
            <h2 className="font-display font-bold leading-tight" style={{ fontSize: "clamp(1.8rem, 5vw, 4rem)" }}>
              <span className="subtitle-line block text-palette-blue">Creative Developer</span>
              <span className="subtitle-line block font-serif italic text-palette-orange">@ BITS Pilani</span>
            </h2>
          </div>

          {/* CTA Section */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-5 items-start">
            <MagneticButton strength={0.3}>
              <motion.button
                onClick={scrollToProjects}
                className="px-12 py-6 bg-section-blue text-palette-white font-display font-black text-xl md:text-2xl rounded-2xl shadow-glow hover:shadow-glow transition-all duration-300 uppercase tracking-wide"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View Work
              </motion.button>
            </MagneticButton>

            <MagneticButton strength={0.3}>
              <motion.button
                onClick={scrollToContact}
                className="px-12 py-6 bg-section-yellow text-palette-blue font-display font-black text-xl md:text-2xl rounded-2xl border-4 border-palette-blue shadow-glow-highlight hover:shadow-glow transition-all duration-300 uppercase tracking-wide"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Contact
              </motion.button>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
};
