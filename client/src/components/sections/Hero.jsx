import { motion } from "framer-motion";
import { Download, ArrowRight, MapPin } from "lucide-react";
import TypingTerminal from "../animations/TypingTerminal";

export default function Hero({ content, apiUrl }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-32 pb-20 px-6 sm:px-10 lg:px-20"
    >
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-14 items-center">
        {/* Left: copy */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-5 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-neon-lime animate-pulse" />
            available for opportunities
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink leading-[1.1]"
          >
            Hi, I'm{" "}
            <span className="text-gradient">{content?.name || "Gaurav Pandey"}</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 font-mono text-lg sm:text-xl text-ink-muted"
          >
            {content?.title || "Full-Stack Web Developer"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-ink-muted text-base sm:text-lg leading-relaxed max-w-lg"
          >
            {content?.bio}
          </motion.p>

          {content?.location && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-4 flex items-center gap-1.5 text-sm text-ink-dim font-mono"
            >
              <MapPin size={14} />
              {content.location}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <a href={`${apiUrl}/resume/download`} className="btn-primary">
              <Download size={16} />
              Download Resume
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-outline"
            >
              View Projects
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>

        {/* Right: terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <TypingTerminal />
        </motion.div>
      </div>
    </section>
  );
}
