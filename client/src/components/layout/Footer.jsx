import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer({ content }) {
  const year = new Date().getFullYear();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-glass-border px-6 sm:px-10 lg:px-20 py-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="font-mono text-sm text-ink-muted text-center sm:text-left">
          <span className="text-ink">© {year} {content?.name || "Gaurav Pandey"}</span>
          <span className="text-ink-dim">{"  // built with the MERN stack"}</span>
        </div>

        <div className="flex items-center gap-4">
          {content?.socials?.github && (
            <a
              href={content.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-2.5 rounded-full glass text-ink-muted hover:text-neon-cyan hover:shadow-neon-cyan transition-all"
            >
              <Github size={18} />
            </a>
          )}
          {content?.socials?.linkedin && (
            <a
              href={content.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 rounded-full glass text-ink-muted hover:text-neon-violet hover:shadow-neon-violet transition-all"
            >
              <Linkedin size={18} />
            </a>
          )}
          {content?.email && (
            <a
              href={`mailto:${content.email}`}
              aria-label="Email"
              className="p-2.5 rounded-full glass text-ink-muted hover:text-neon-pink hover:shadow-neon-pink transition-all"
            >
              <Mail size={18} />
            </a>
          )}
          <button
            onClick={scrollTop}
            aria-label="Scroll to top"
            className="p-2.5 rounded-full glass text-ink-muted hover:text-neon-cyan transition-all"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>

      <div className="text-center mt-8">
        <Link
          to="/admin/login"
          className="font-mono text-[11px] text-ink-dim hover:text-neon-cyan transition-colors"
        >
          ~/admin
        </Link>
      </div>
    </footer>
  );
}
