import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import useScrollReveal from "../../hooks/useScrollReveal";

const glowCycle = ["cyan", "violet", "pink"];

export default function Skills({ content }) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="skills" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          fileTag="02_skills.json"
          title="Tech I work with"
          subtitle="Tools and languages I reach for when building products."
        />

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {content?.skills?.map((group, i) => {
            const glow = glowCycle[i % glowCycle.length];
            const glowClass =
              glow === "cyan"
                ? "hover:shadow-neon-cyan hover:border-neon-cyan/40"
                : glow === "violet"
                ? "hover:shadow-neon-violet hover:border-neon-violet/40"
                : "hover:shadow-neon-pink hover:border-neon-pink/40";
            const dotClass =
              glow === "cyan" ? "bg-neon-cyan" : glow === "violet" ? "bg-neon-violet" : "bg-neon-pink";

            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className={`glass rounded-2xl p-6 transition-all duration-300 ${glowClass}`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
                  <h3 className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                    {group.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items?.map((item) => (
                    <span
                      key={item}
                      className="font-mono text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-glass-border text-ink"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
