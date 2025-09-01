import { useState, MouseEvent } from "react";

interface Ripple {
  x: number;
  y: number;
  id: number;
}

const PageRipple = ({ children }: { children: React.ReactNode }) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const createRipple = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    // 🚫 Ignore clicks on interactive elements
    if (
      target.closest("button") ||
      target.closest("a") ||
      target.closest("input") ||
      target.closest("textarea") ||
      target.closest("select")
    ) {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 800);
  };

  return (
    <div
      onClick={createRipple}
      className="relative overflow-hidden min-h-screen bg-background text-foreground"
    >
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          style={{ top: r.y, left: r.x }}
          className="absolute w-20 h-20 bg-blue-400/30 rounded-full animate-ripple pointer-events-none"
        />
      ))}
    </div>
  );
};

export default PageRipple;
