import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";

const socials = [
  { name: "GitHub", icon: Github, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Email", icon: Mail, href: "mailto:contact@anugrahsengar.dev" },
];

export const Footer = () => {
  return (
    <footer className="relative py-12 bg-section-dark border-t-4 border-palette-blue">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo/Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-3xl font-bold">
              <span className="font-serif italic text-palette-blue">A</span>
              <span className="text-palette-yellow">S</span>
            </span>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {socials.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                className="w-12 h-12 rounded-xl bg-section-blue flex items-center justify-center text-palette-white hover:bg-section-yellow hover:text-palette-blue transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="flex items-center gap-2 text-sm text-palette-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span>Made with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-palette-orange fill-current" />
            </motion.span>
            <span>by Anugrah Sengar</span>
          </motion.div>
        </div>

        {/* Bottom text */}
        <motion.div
          className="mt-8 pt-8 border-t border-palette-light/10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-xs text-palette-light/40">
            © {new Date().getFullYear()} Anugrah Sengar. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
