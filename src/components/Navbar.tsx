import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { MagneticButton } from "./MagneticButton";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-section-light/95 backdrop-blur-lg border-b-2 border-palette-blue"
            : "py-6"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-6">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <MagneticButton strength={0.15}>
              <motion.a
                href="#"
                className="text-3xl font-bold"
                whileHover={{ scale: 1.05 }}
              >
                <span className="font-serif italic text-palette-blue">Anugrah</span>
                <span className="text-palette-orange ml-1">S</span>
              </motion.a>
            </MagneticButton>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link, index) => (
                <MagneticButton key={link.name} strength={0.1}>
                  <motion.button
                    onClick={() => scrollToSection(link.href)}
                    className="relative px-5 py-2 text-sm font-medium text-palette-dark hover:text-palette-blue transition-colors"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {link.name}
                  </motion.button>
                </MagneticButton>
              ))}
            </div>

            {/* CTA Buttons - Desktop */}
            <div className="hidden md:flex items-center gap-3">
              <MagneticButton strength={0.2}>
                <motion.button
                  onClick={() => scrollToSection("#contact")}
                  className="px-5 py-2.5 rounded-lg bg-section-yellow text-palette-blue font-bold text-sm border-2 border-palette-blue hover:shadow-glow-highlight transition-shadow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Demo Request
                </motion.button>
              </MagneticButton>
              <MagneticButton strength={0.2}>
                <motion.button
                  className="px-5 py-2.5 rounded-lg bg-section-blue text-palette-white font-bold text-sm hover:shadow-glow transition-shadow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact
                </motion.button>
              </MagneticButton>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden w-10 h-10 rounded-lg bg-section-blue flex items-center justify-center text-palette-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-section-blue"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.nav
              className="relative h-full flex flex-col items-center justify-center gap-8 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-3xl font-bold text-palette-white hover:text-palette-yellow transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {link.name}
                </motion.button>
              ))}

              <motion.button
                onClick={() => scrollToSection("#contact")}
                className="mt-8 px-8 py-4 rounded-xl bg-section-yellow text-palette-blue font-bold text-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                Get in Touch
              </motion.button>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
