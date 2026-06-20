import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import useScrollReveal from "../../hooks/useScrollReveal";

export default function About({ content }) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          fileTag="01_about.tsx"
          title="A little about me"
          subtitle="The story behind the code."
        />

        <div className="grid lg:grid-cols-5 gap-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <GlassCard glow="cyan" className="h-full">
              <p className="text-ink-muted text-base sm:text-lg leading-relaxed">
                {content?.bio}
              </p>
              {content?.tagline && (
                <p className="mt-5 font-mono text-sm text-neon-cyan">
                  // {content.tagline}
                </p>
              )}
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2"
          >
            <GlassCard glow="violet" className="h-full">
              <div className="flex items-center gap-2 mb-5">
                <GraduationCap size={20} className="text-neon-violet" />
                <h3 className="font-display font-semibold text-ink">Education</h3>
              </div>
              <div className="space-y-5">
                {content?.education?.map((edu, i) => (
                  <div key={i} className="border-l-2 border-neon-violet/30 pl-4">
                    <p className="font-medium text-ink text-sm">{edu.institution}</p>
                    <p className="text-ink-muted text-sm">{edu.degree}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-mono text-xs text-ink-dim">{edu.duration}</span>
                      {edu.score && (
                        <span className="font-mono text-xs text-neon-cyan">{edu.score}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
