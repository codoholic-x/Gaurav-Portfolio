import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import useScrollReveal from "../../hooks/useScrollReveal";

export default function Certifications({ content }) {
  const [ref, isVisible] = useScrollReveal();

  if (!content?.certifications?.length) return null;

  return (
    <section id="certifications" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          fileTag="04b_certifications.yaml"
          title="Certifications"
          subtitle="Courses and credentials I've completed along the way."
        />

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {content.certifications.map((cert, i) => (
            <motion.a
              key={i}
              href={cert.link && cert.link !== "#" ? cert.link : undefined}
              target={cert.link && cert.link !== "#" ? "_blank" : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="glass rounded-2xl p-5 flex items-start gap-3 hover:shadow-neon-pink hover:border-neon-pink/40 transition-all cursor-pointer group"
            >
              <div className="p-2.5 rounded-xl bg-neon-pink/10 text-neon-pink shrink-0">
                <Award size={18} />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-ink text-sm leading-snug">{cert.title}</p>
                <p className="font-mono text-xs text-ink-dim mt-1">{cert.issuer}</p>
              </div>
              {cert.link && cert.link !== "#" && (
                <ExternalLink
                  size={14}
                  className="ml-auto text-ink-dim group-hover:text-neon-pink transition-colors shrink-0"
                />
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
