import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export const ScrollIndicator = () => {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer group"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      onClick={scrollToNext}
    >
      <motion.span
        className="text-xs uppercase tracking-[0.3em] text-palette-blue mb-2 group-hover:text-palette-orange transition-colors font-medium"
      >
        Scroll
      </motion.span>
      <motion.div
        className="relative w-6 h-10 rounded-full border-2 border-palette-blue group-hover:border-palette-orange transition-colors"
      >
        <motion.div
          className="absolute top-2 left-1/2 w-1 h-2 -translate-x-1/2 rounded-full bg-section-blue"
          animate={{ y: [0, 12, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="mt-2"
      >
        <ChevronDown className="w-5 h-5 text-palette-blue group-hover:text-palette-orange transition-colors" />
      </motion.div>
    </motion.div>
  );
};
