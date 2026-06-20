import { useEffect, useState } from "react";

const codeLines = [
  { text: "const developer = {", color: "text-ink-muted" },
  { text: '  name: "Gaurav Pandey",', color: "text-neon-cyan" },
  { text: '  role: "Full-Stack Web Developer",', color: "text-neon-cyan" },
  { text: '  stack: ["React", "Node.js", "Express", "MongoDB Atlas"],', color: "text-neon-violet" },
  { text: '  building: "Online Programming Judge & STODOX",', color: "text-neon-pink" },
  { text: "  available: true,", color: "text-neon-lime" },
  { text: "};", color: "text-ink-muted" },
];

export default function TypingTerminal() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (lineIndex >= codeLines.length) {
      setDone(true);
      return;
    }
    const currentLine = codeLines[lineIndex].text;

    if (charIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setCharIndex((c) => c + 1);
      }, 18 + Math.random() * 22);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setLineIndex((l) => l + 1);
        setCharIndex(0);
      }, 220);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, lineIndex]);

  return (
    <div className="glass-strong rounded-2xl overflow-hidden shadow-glass w-full max-w-xl mx-auto">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-glass-border bg-white/[0.02]">
        <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
        <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
        <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
        <span className="ml-3 font-mono text-[11px] text-ink-dim">
          gaurav.dev — ~/portfolio
        </span>
      </div>

      {/* Tab bar */}
      <div className="flex items-center border-b border-glass-border bg-white/[0.015]">
        <div className="px-4 py-2 font-mono text-xs text-neon-cyan border-b-2 border-neon-cyan bg-white/[0.03]">
          intro.js
        </div>
        <div className="px-4 py-2 font-mono text-xs text-ink-dim">about.md</div>
      </div>

      {/* Code body */}
      <div className="p-5 sm:p-6 font-mono text-[13px] sm:text-sm leading-relaxed min-h-[230px]">
        {codeLines.slice(0, lineIndex).map((line, i) => (
          <div key={i} className={line.color}>
            {line.text}
          </div>
        ))}
        {!done && lineIndex < codeLines.length && (
          <div className={codeLines[lineIndex].color}>
            {codeLines[lineIndex].text.slice(0, charIndex)}
            <span className="inline-block w-[7px] h-[15px] bg-neon-cyan ml-0.5 animate-blink translate-y-[2px]" />
          </div>
        )}
        {done && (
          <div className="flex items-center mt-1 text-ink-dim">
            <span className="text-neon-lime mr-2">✓</span> compiled successfully
            <span className="inline-block w-[7px] h-[15px] bg-neon-cyan ml-1.5 animate-blink translate-y-[2px]" />
          </div>
        )}
      </div>
    </div>
  );
}
