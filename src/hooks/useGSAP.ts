import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useGSAP = () => {
  const scope = useRef<HTMLElement | null>(null);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return { scope };
};

export const useScrollReveal = (selector: string, options?: gsap.TweenVars) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((el, index) => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 80,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.1,
          ...options,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [selector, options]);
};

export const useParallax = (selector: string, speed: number = 0.5) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);

    elements.forEach((el) => {
      gsap.to(el, {
        y: () => speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [selector, speed]);
};

export const useTextReveal = (selector: string) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);

    elements.forEach((el) => {
      const text = el.textContent || "";
      el.innerHTML = "";
      
      text.split("").forEach((char, i) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "translateY(100px) rotateX(-90deg)";
        el.appendChild(span);
      });

      gsap.to(el.querySelectorAll("span"), {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.02,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [selector]);
};

export { gsap, ScrollTrigger };
