import { interpolate, spring } from "remotion";

// Desenha traços de 0→1 (usar com pathLength={1}).
export const drawProps = (frame: number, start: number, length: number) => {
  const p = interpolate(frame, [start, start + length], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - p };
};

export const pop = (frame: number, fps: number, delay = 0) =>
  spring({ frame: frame - delay, fps, config: { damping: 11, mass: 0.6 } });

export const stroke = {
  fill: "none",
  strokeWidth: 9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
