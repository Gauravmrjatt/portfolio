export default function Glow({ x, y, color , size = 40}) {
  return (
    <div
      className={`absolute left-1/2 top-1/2 h-${size} w-${size} -translate-x-1/2 -translate-y-1/2 rounded-full`}
      style={{
        transform: `translate(${x}px, ${y}px)`,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
    />
  );
}
