import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PhysicsObject {
  el: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
}

export const PhysicsBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const objectsRef = useRef<PhysicsObject[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const shapes = [
      { type: "circle", size: 80, color: "bg-section-yellow" },
      { type: "square", size: 60, color: "bg-section-blue" },
      { type: "circle", size: 100, color: "bg-palette-blue opacity-20" },
      { type: "square", size: 50, color: "bg-section-yellow opacity-60" },
      { type: "circle", size: 40, color: "bg-section-gray" },
      { type: "square", size: 70, color: "bg-palette-blue opacity-30" },
      { type: "circle", size: 55, color: "bg-section-yellow opacity-40" },
      { type: "square", size: 45, color: "bg-section-blue opacity-50" },
    ];

    // Create shape elements
    shapes.forEach((shape, index) => {
      const el = document.createElement("div");
      el.className = `absolute ${shape.color} ${
        shape.type === "circle" ? "rounded-full" : "rounded-2xl"
      } pointer-events-none`;
      el.style.width = `${shape.size}px`;
      el.style.height = `${shape.size}px`;
      el.style.willChange = "transform";

      container.appendChild(el);

      const startX = Math.random() * (container.offsetWidth - shape.size);
      const startY = Math.random() * (container.offsetHeight - shape.size);

      objectsRef.current.push({
        el,
        x: startX,
        y: startY,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
      });

      // Initial position
      gsap.set(el, {
        x: startX,
        y: startY,
        rotation: Math.random() * 360,
        scale: 0,
      });

      // Entrance animation
      gsap.to(el, {
        scale: 1,
        duration: 0.8,
        delay: index * 0.1,
        ease: "elastic.out(1, 0.5)",
      });
    });

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    container.addEventListener("mousemove", handleMouseMove);

    // Physics animation loop
    const animate = () => {
      const bounds = container.getBoundingClientRect();
      const friction = 0.99;
      const mouseInfluence = 0.15;
      const mouseRadius = 150;

      objectsRef.current.forEach((obj) => {
        // Mouse repulsion
        const dx = obj.x + 40 - mouseRef.current.x;
        const dy = obj.y + 40 - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRadius && dist > 0) {
          const force = (mouseRadius - dist) / mouseRadius;
          obj.vx += (dx / dist) * force * mouseInfluence;
          obj.vy += (dy / dist) * force * mouseInfluence;
        }

        // Apply velocity
        obj.x += obj.vx;
        obj.y += obj.vy;
        obj.rotation += obj.rotationSpeed;

        // Friction
        obj.vx *= friction;
        obj.vy *= friction;

        // Bounce off walls
        const elWidth = obj.el.offsetWidth;
        const elHeight = obj.el.offsetHeight;

        if (obj.x <= 0) {
          obj.x = 0;
          obj.vx = Math.abs(obj.vx) * 0.8;
        } else if (obj.x >= bounds.width - elWidth) {
          obj.x = bounds.width - elWidth;
          obj.vx = -Math.abs(obj.vx) * 0.8;
        }

        if (obj.y <= 0) {
          obj.y = 0;
          obj.vy = Math.abs(obj.vy) * 0.8;
        } else if (obj.y >= bounds.height - elHeight) {
          obj.y = bounds.height - elHeight;
          obj.vy = -Math.abs(obj.vy) * 0.8;
        }

        // Add slight random movement
        if (Math.random() < 0.02) {
          obj.vx += (Math.random() - 0.5) * 0.5;
          obj.vy += (Math.random() - 0.5) * 0.5;
        }

        // Update position with GSAP for smooth rendering
        gsap.set(obj.el, {
          x: obj.x,
          y: obj.y,
          rotation: obj.rotation,
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      objectsRef.current.forEach((obj) => obj.el.remove());
      objectsRef.current = [];
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-auto"
      style={{ zIndex: 0 }}
    />
  );
};
