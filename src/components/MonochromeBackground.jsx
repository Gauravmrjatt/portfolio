import React from "react";

/**
 * Reusable monochrome background pattern
 *
 * Props:
 * - theme: "dark" | "light"
 * - className: extra classes for positioning (optional)
 */
export default function MonochromeBackground({
  theme = "dark",
  className = "",
}) {
  const palette =
    theme === "dark"
      ? {
          base: "#040404",
          layers: [
            "radial-gradient(ellipse 80% 60% at 10% -10%, rgba(255,255,255,0.15), transparent 60%)",
            "radial-gradient(ellipse 90% 70% at 90% -20%, rgba(120,120,120,0.12), transparent 70%)",
          ],
          dots:
            "radial-gradient(circle at 25% 25%, rgba(250,250,250,0.08) 0.7px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(250,250,250,0.08) 0.7px, transparent 1px)",
          glow:
            "radial-gradient(60% 50% at 50% 10%, rgba(255,255,255,0.18), transparent 70%)",
        }
      : {
          base: "#f5f5f4",
          layers: [
            "radial-gradient(ellipse 80% 60% at 10% -10%, rgba(15,15,15,0.12), transparent 60%)",
            "radial-gradient(ellipse 90% 70% at 90% -20%, rgba(15,15,15,0.08), transparent 70%)",
          ],
          dots:
            "radial-gradient(circle at 25% 25%, rgba(17,17,17,0.12) 0.7px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(17,17,17,0.08) 0.7px, transparent 1px)",
          glow:
            "radial-gradient(60% 50% at 50% 10%, rgba(17,17,17,0.12), transparent 70%)",
        };

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      {/* Base gradients */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: palette.base,
          backgroundImage: palette.layers.join(", "),
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />

      {/* Dotted grid */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: palette.dots,
          backgroundSize: "12px 12px",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Glow */}
      <div
        className="absolute inset-0 blur-[22px]"
        style={{
          background: palette.glow,
        }}
      />
    </div>
  );
}
