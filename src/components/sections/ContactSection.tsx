import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Sparkles, CheckCircle, Mail, User, MessageSquare } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

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

      // Form card animation
      if (formRef.current) {
        gsap.fromTo(
          formRef.current.parentElement,
          { y: 100, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current.parentElement,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Button animation
    gsap.to(e.currentTarget.querySelector("button[type='submit']"), {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const inputClasses = (field: string) =>
    `w-full bg-section-light border-4 rounded-2xl px-6 py-5 text-palette-dark font-display text-lg placeholder:text-palette-dark/40 outline-none transition-all duration-300 ${
      focusedField === field
        ? "border-palette-orange shadow-glow-accent"
        : "border-palette-blue hover:border-palette-orange"
    }`;

  return (
    <section ref={sectionRef} id="contact" className="relative py-28 md:py-36 bg-section-blue overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 right-[5%] w-48 h-48 rounded-full bg-section-yellow opacity-30"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="overflow-hidden mb-12">
            <h2 className="header-line font-display font-black text-palette-white" style={{ fontSize: "clamp(4rem, 15vw, 12rem)", lineHeight: 0.9 }}>
              Let's
            </h2>
            <h2 className="header-line font-serif italic text-palette-yellow" style={{ fontSize: "clamp(4rem, 15vw, 12rem)", lineHeight: 0.9 }}>
              Connect
            </h2>
          </div>

          {/* Form Card */}
          <motion.div
            className="bg-section-yellow border-4 border-palette-blue rounded-3xl p-10 md:p-14 shadow-glow-highlight"
            whileHover={{ scale: 1.01 }}
          >
            {isSubmitted ? (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <motion.div
                  className="w-24 h-24 mx-auto mb-8 rounded-full bg-section-blue flex items-center justify-center shadow-glow"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  <CheckCircle className="w-12 h-12 text-palette-white" />
                </motion.div>
                <h3 className="text-4xl font-display font-bold text-palette-blue mb-4">
                  Message Sent!
                </h3>
                <p className="text-palette-dark/70 text-xl font-display">
                  Thank you for reaching out. I'll get back to you soon!
                </p>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                {/* Name Field */}
                <div className="relative">
                  <motion.label
                    className={`absolute left-6 transition-all duration-300 pointer-events-none flex items-center gap-2 font-display ${
                      focusedField === "name" || formData.name
                        ? "-top-4 text-sm text-palette-orange bg-section-yellow px-3 font-bold"
                        : "top-5 text-palette-dark/50 text-lg"
                    }`}
                  >
                    <User className="w-5 h-5" />
                    Your Name
                  </motion.label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className={inputClasses("name")}
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="relative">
                  <motion.label
                    className={`absolute left-6 transition-all duration-300 pointer-events-none flex items-center gap-2 font-display ${
                      focusedField === "email" || formData.email
                        ? "-top-4 text-sm text-palette-orange bg-section-yellow px-3 font-bold"
                        : "top-5 text-palette-dark/50 text-lg"
                    }`}
                  >
                    <Mail className="w-5 h-5" />
                    Email Address
                  </motion.label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className={inputClasses("email")}
                    required
                  />
                </div>

                {/* Message Field */}
                <div className="relative">
                  <motion.label
                    className={`absolute left-6 transition-all duration-300 pointer-events-none flex items-center gap-2 font-display ${
                      focusedField === "message" || formData.message
                        ? "-top-4 text-sm text-palette-orange bg-section-yellow px-3 font-bold"
                        : "top-5 text-palette-dark/50 text-lg"
                    }`}
                  >
                    <MessageSquare className="w-5 h-5" />
                    Your Message
                  </motion.label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    rows={5}
                    className={`${inputClasses("message")} resize-none`}
                    required
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 rounded-2xl font-display font-black text-xl bg-section-blue text-palette-white uppercase tracking-wide"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center gap-4">
                    {isSubmitting ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="w-6 h-6" />
                        </motion.span>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send
                        <Send className="w-6 h-6" />
                      </>
                    )}
                  </span>
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
