export default function GlassCard({ children, className = "", glow = "cyan", hover = true }) {
  const glowMap = {
    cyan: "hover:shadow-neon-cyan hover:border-neon-cyan/40",
    violet: "hover:shadow-neon-violet hover:border-neon-violet/40",
    pink: "hover:shadow-neon-pink hover:border-neon-pink/40",
  };

  return (
    <div
      className={`glass rounded-2xl p-6 sm:p-8 transition-all duration-300 ${
        hover ? glowMap[glow] : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
