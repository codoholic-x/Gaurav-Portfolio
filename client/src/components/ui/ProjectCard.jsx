import { motion } from "framer-motion";
import { ExternalLink, Github, Globe, ChevronRight } from "lucide-react";
import useScrollReveal from "../../hooks/useScrollReveal";

export default function ProjectCard({ project, index }) {
  const [ref, isVisible] = useScrollReveal();
  const glow = index % 2 === 0 ? "cyan" : "violet";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`glass rounded-3xl p-6 sm:p-8 lg:p-10 transition-all duration-500 group ${
        glow === "cyan" ? "hover:shadow-neon-cyan hover:border-neon-cyan/40" : "hover:shadow-neon-violet hover:border-neon-violet/40"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <span className="font-mono text-xs text-neon-cyan">
            project_{String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-semibold text-ink mt-1 group-hover:text-gradient transition-all">
            {project.title}
          </h3>
        </div>
        {project.duration && (
          <span className="font-mono text-xs text-ink-dim border border-glass-border rounded-full px-3 py-1 whitespace-nowrap">
            {project.duration}
          </span>
        )}
      </div>

      <p className="text-ink-muted leading-relaxed mb-5">{project.overview}</p>

      {project.highlights?.length > 0 && (
        <ul className="space-y-2 mb-6">
          {project.highlights.slice(0, 5).map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-ink-muted">
              <ChevronRight size={15} className="text-neon-pink mt-0.5 shrink-0" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      {project.techStack?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-white/5 border border-glass-border text-ink-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {project.demoLink && project.demoLink !== "#" && (
          <a href={project.demoLink} target="_blank" rel="noreferrer" className="btn-outline !py-2 !px-4 text-xs">
            <ExternalLink size={14} /> Demo
          </a>
        )}
        {project.websiteLink && project.websiteLink !== "#" && (
          <a href={project.websiteLink} target="_blank" rel="noreferrer" className="btn-outline !py-2 !px-4 text-xs">
            <Globe size={14} /> Website
          </a>
        )}
        {project.githubLink && project.githubLink !== "#" && (
          <a href={project.githubLink} target="_blank" rel="noreferrer" className="btn-outline !py-2 !px-4 text-xs">
            <Github size={14} /> GitHub
          </a>
        )}
      </div>
    </motion.div>
  );
}
