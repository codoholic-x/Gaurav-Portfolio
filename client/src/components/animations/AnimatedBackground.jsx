export default function AnimatedBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden bg-void">
      <div className="absolute inset-0 bg-mesh-gradient" />
      <div className="absolute inset-0 bg-grid-pattern bg-[size:46px_46px] opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="absolute top-[-10%] left-[-10%] w-[420px] h-[420px] rounded-full bg-neon-violet/20 blur-[110px] animate-blob" />
      <div className="absolute top-[20%] right-[-10%] w-[380px] h-[380px] rounded-full bg-neon-cyan/15 blur-[110px] animate-blob [animation-delay:-5s]" />
      <div className="absolute bottom-[-10%] left-[30%] w-[420px] h-[420px] rounded-full bg-neon-pink/15 blur-[110px] animate-blob [animation-delay:-9s]" />
    </div>
  );
}
