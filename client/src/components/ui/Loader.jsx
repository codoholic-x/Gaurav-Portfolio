export default function Loader({ label = "compiling portfolio..." }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-void gap-4">
      <div className="flex gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2.5 h-2.5 rounded-full bg-neon-violet animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2.5 h-2.5 rounded-full bg-neon-pink animate-bounce" />
      </div>
      <p className="font-mono text-xs text-ink-muted tracking-wide">{label}</p>
    </div>
  );
}
