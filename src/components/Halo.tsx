// The sacred-geometry halo from the Christ Cosmic cover: rings, a seed of
// life, and twelve rays, drawn in gold hairlines and turning very slowly.
const PETALS = Array.from({ length: 6 }, (_, i) => (i * Math.PI) / 3);
const RAYS = Array.from({ length: 24 }, (_, i) => (i * Math.PI) / 12);

export default function Halo({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none ${className}`}>
      <div className="absolute inset-[18%] rounded-full bg-gold/10 blur-3xl" />
      <svg viewBox="-100 -100 200 200" className="relative h-full w-full overflow-visible">
        <defs>
          <radialGradient id="halo-fade" r="0.5">
            <stop offset="0.55" stopColor="rgb(250 208 140)" stopOpacity="0.9" />
            <stop offset="1" stopColor="rgb(250 208 140)" stopOpacity="0.15" />
          </radialGradient>
        </defs>
        <g stroke="url(#halo-fade)" fill="none" strokeWidth="0.25" className="origin-center animate-[spin_240s_linear_infinite] motion-reduce:animate-none">
          <circle r="96" />
          <circle r="92" strokeDasharray="0.6 2.4" />
          {RAYS.map((a, i) => (
            <line
              key={a}
              x1={Math.cos(a) * 64}
              y1={Math.sin(a) * 64}
              x2={Math.cos(a) * (i % 2 ? 70 : 78)}
              y2={Math.sin(a) * (i % 2 ? 70 : 78)}
            />
          ))}
          {RAYS.filter((_, i) => i % 2 === 0).map((a) => (
            <circle key={a} cx={Math.cos(a) * 96} cy={Math.sin(a) * 96} r="0.55" fill="rgb(250 208 140)" stroke="none" />
          ))}
        </g>
        <g stroke="url(#halo-fade)" fill="none" strokeWidth="0.3" className="origin-center animate-[spin_180s_linear_infinite_reverse] motion-reduce:animate-none">
          <circle r="60" />
          <circle r="20" />
          {PETALS.map((a) => (
            <circle key={a} cx={Math.cos(a) * 20} cy={Math.sin(a) * 20} r="20" />
          ))}
          {PETALS.map((a) => (
            <circle key={`o${a}`} cx={Math.cos(a + Math.PI / 6) * 34.6} cy={Math.sin(a + Math.PI / 6) * 34.6} r="20" strokeOpacity="0.45" />
          ))}
        </g>
      </svg>
    </div>
  );
}
