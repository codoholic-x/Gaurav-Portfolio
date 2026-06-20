import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, Terminal } from "lucide-react";

const navItems = [
  { label: "about", ext: ".tsx", href: "#about" },
  { label: "skills", ext: ".json", href: "#skills" },
  { label: "projects", ext: "/", href: "#projects" },
  { label: "experience", ext: ".log", href: "#experience" },
  { label: "contact", ext: ".sh", href: "#contact" },
];

export default function Navbar({ apiUrl }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <nav
        className={`mx-auto max-w-6xl flex items-center justify-between px-5 sm:px-7 rounded-2xl transition-all duration-300 ${
          scrolled ? "glass-strong shadow-glass py-2.5" : "py-1"
        }`}
      >
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#hero");
          }}
          className="flex items-center gap-2 font-mono text-sm sm:text-base font-medium text-ink"
        >
          <Terminal size={18} className="text-neon-cyan" />
          gaurav<span className="text-neon-cyan">.dev</span>
          <span className="w-[2px] h-4 bg-neon-cyan animate-blink ml-0.5" />
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1 font-mono text-sm">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="group flex items-center px-3 py-2 rounded-lg text-ink-muted hover:text-neon-cyan transition-colors"
              >
                <span className="text-neon-violet/70 mr-0.5 group-hover:text-neon-pink transition-colors">
                  #
                </span>
                {item.label}
                <span className="text-ink-dim">{item.ext}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href={`${apiUrl}/resume/download`}
            className="btn-outline !py-2 !px-4 text-xs"
          >
            <Download size={14} />
            Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-ink p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden mx-4 mt-2 glass-strong rounded-2xl overflow-hidden"
          >
            <ul className="flex flex-col font-mono text-sm divide-y divide-glass-border">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="flex items-center px-5 py-3.5 text-ink-muted hover:text-neon-cyan hover:bg-white/5 transition-colors"
                  >
                    <span className="text-neon-violet/70 mr-1">#</span>
                    {item.label}
                    <span className="text-ink-dim">{item.ext}</span>
                  </a>
                </li>
              ))}
              <li className="p-4">
                <a
                  href={`${apiUrl}/resume/download`}
                  className="btn-primary w-full justify-center !py-2.5"
                >
                  <Download size={16} />
                  Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
