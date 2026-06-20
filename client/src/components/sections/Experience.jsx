import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import useScrollReveal from "../../hooks/useScrollReveal";

export default function Experience({ content }) {
  const [ref, isVisible] = useScrollReveal();

  if (!content?.experience?.length) return null;

  return (
    <section id="experience" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          fileTag="04_experience.log"
          title="Where I've worked"
          subtitle="Hands-on experience building real things with real teams."
        />

        <div ref={ref} className="relative pl-8 sm:pl-10">
          <div className="absolute left-2.5 sm:left-3 top-1 bottom-1 w-px bg-gradient-to-b from-neon-cyan via-neon-violet to-neon-pink" />

          {content.experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative mb-10 last:mb-0"
            >
              <span
                className={`absolute -left-[26px] sm:-left-[30px] top-1.5 w-3 h-3 rounded-full border-2 border-void ${
                  exp.current ? "bg-neon-lime animate-pulse" : "bg-neon-cyan"
                }`}
              />
              <div className="glass rounded-2xl p-6 hover:shadow-neon-cyan hover:border-neon-cyan/40 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} className="text-neon-cyan" />
                    <h3 className="font-display font-semibold text-ink">{exp.role}</h3>
                  </div>
                  {exp.current && (
                    <span className="font-mono text-[10px] px-2 py-1 rounded-full bg-neon-lime/10 text-neon-lime border border-neon-lime/30">
                      ONGOING
                    </span>
                  )}
                </div>
                <p className="text-neon-violet font-medium text-sm mb-1">{exp.organization}</p>
                <p className="font-mono text-xs text-ink-dim mb-4">
                  {exp.duration} {exp.location && `· ${exp.location}`}
                </p>
                <ul className="space-y-1.5">
                  {exp.description?.map((d, idx) => (
                    <li key={idx} className="text-sm text-ink-muted flex gap-2">
                      <span className="text-neon-pink">›</span> {d}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
