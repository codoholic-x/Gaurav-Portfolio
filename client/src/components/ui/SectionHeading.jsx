import { motion } from "framer-motion";
import useScrollReveal from "../../hooks/useScrollReveal";

// fileTag example: "02_skills.json" — encodes section order + content type, IDE-explorer style
export default function SectionHeading({ fileTag, title, subtitle, align = "left" }) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`mb-14 ${align === "center" ? "text-center mx-auto" : ""} max-w-2xl`}
    >
      <motion.p
        initial={{ opacity: 0, x: -10 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="eyebrow mb-3"
      >
        {fileTag}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-ink-muted text-base sm:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
