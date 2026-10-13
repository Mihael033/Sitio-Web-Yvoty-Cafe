import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../brand/theme";
import { drawProps, pop, stroke } from "./draw";

const svg = { viewBox: "0 0 200 200", width: "100%", height: "100%" };

// Tela 1 — xícara se desenhando + vapor em loop
export const CupIcon: React.FC = () => {
  const f = useCurrentFrame();
  const steam = (i: number) => {
    const t = (((f - 20 + i * 13) % 40) + 40) % 40 / 40;
    return { opacity: f < 20 ? 0 : Math.sin(t * Math.PI), transform: `translateY(${-t * 18}px)` };
  };
  return (
    <svg {...svg}>
      <g stroke={colors.crema} {...stroke}>
        <path d="M45 85 h95 v40 a40 40 0 0 1 -40 40 h-15 a40 40 0 0 1 -40 -40 z" {...drawProps(f, 0, 25)} />
        <path d="M140 95 h12 a18 18 0 0 1 0 36 h-14" {...drawProps(f, 15, 15)} />
        <path d="M30 185 h125" {...drawProps(f, 20, 12)} />
      </g>
      <g stroke={colors.terracota} {...stroke} strokeWidth={7}>
        {[70, 92, 114].map((x, i) => (
          <path key={x} d={`M${x} 70 q-8 -12 0 -24 q8 -12 0 -24`} style={steam(i)} />
        ))}
      </g>
    </svg>
  );
};

const Bean: React.FC<{ x: number; y: number; s: number; color: string }> = ({ x, y, s, color }) => (
  <g transform={`translate(${x} ${y}) scale(${s}) rotate(-25)`}>
    <ellipse rx="16" ry="23" fill="none" stroke={color} strokeWidth={6} />
    <path d="M0 -21 q-8 21 0 42" fill="none" stroke={color} strokeWidth={5} strokeLinecap="round" />
  </g>
);

// Tela 2 — grão cai, quica e vira 5 grãos acendendo um por um
export const BeansIcon: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const drop = pop(f, fps, 0);
  const split = interpolate(f, [24, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const xs = [22, 61, 100, 139, 178];
  return (
    <svg {...svg}>
      {split < 1 && (
        <Bean x={100} y={interpolate(drop, [0, 1], [-40, 100])} s={1.6 * (1 - split)} color={colors.crema} />
      )}
      {xs.map((x, i) => (
        <Bean
          key={x}
          x={x}
          y={100}
          s={0.78 * pop(f, fps, 30 + i * 5)}
          color={f > 45 + i * 6 ? colors.terracota : colors.crema}
        />
      ))}
    </svg>
  );
};

// Tela 3 — tambor de torra girando sobre chama pulsante + faíscas
export const RoastIcon: React.FC = () => {
  const f = useCurrentFrame();
  const flame = 1 + Math.sin(f / 3) * 0.08;
  return (
    <svg {...svg}>
      <g stroke={colors.crema} {...stroke}>
        <circle cx="100" cy="72" r="52" {...drawProps(f, 0, 22)} />
        <g transform={`rotate(${f * 4} 100 72)`}>
          <path d="M100 30 v84 M58 72 h84" strokeWidth={6} {...drawProps(f, 12, 15)} />
        </g>
        <path d="M60 130 h80 M72 130 v10 M128 130 v10" {...drawProps(f, 18, 10)} />
      </g>
      <g transform={`translate(100 196) scale(${flame * 0.8}) translate(-100 -192)`}>
        <path
          d="M100 192 c-22 0 -30 -18 -20 -34 c4 8 10 10 12 6 c-4 -14 4 -24 12 -30 c0 12 18 18 16 36 c-2 14 -10 22 -20 22 z"
          stroke={colors.terracota}
          {...stroke}
          strokeWidth={7}
          {...drawProps(f, 8, 18)}
        />
      </g>
      {[0, 1, 2, 3].map((i) => {
        const t = ((f + i * 9) % 36) / 36;
        return (
          <circle
            key={i}
            cx={70 + i * 20 + Math.sin(t * 6 + i) * 6}
            cy={170 - t * 24}
            r={4}
            fill={colors.terracota}
            opacity={f < 25 ? 0 : 1 - t}
          />
        );
      })}
    </svg>
  );
};

// Pétala reutilizada (tela 4 e logo)
export const Petal: React.FC<{ angle: number; s: number; color: string; filled?: boolean }> = ({
  angle,
  s,
  color,
  filled,
}) => (
  <path
    d="M0 0 C-22 -18 -18 -52 0 -64 C18 -52 22 -18 0 0 Z"
    transform={`rotate(${angle}) scale(${s})`}
    fill={filled ? color : "none"}
    stroke={color}
    strokeWidth={filled ? 0 : 6}
    strokeLinejoin="round"
  />
);

// Tela 4 — xícara vista de cima, latte art abrindo em flor
export const LatteFlowerIcon: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <svg {...svg}>
      <circle cx="100" cy="100" r="88" stroke={colors.crema} {...stroke} {...drawProps(f, 0, 20)} />
      <circle cx="100" cy="100" r="74" fill="rgba(243,233,220,0.12)" opacity={pop(f, fps, 10)} />
      <g transform="translate(100 100)">
        <path
          d="M0 0 q40 14 50 50"
          fill="none"
          stroke={colors.verdeHoja}
          strokeWidth={7}
          strokeLinecap="round"
          {...drawProps(f, 18, 14)}
        />
        {[0, 72, 144, 216, 288].map((a, i) => (
          <Petal key={a} angle={a} s={0.85 * pop(f, fps, 22 + i * 5)} color={colors.terracota} />
        ))}
        <circle r={9 * pop(f, fps, 48)} fill={colors.crema} />
      </g>
    </svg>
  );
};

// Tela 5 — pin cai e crava; notebook + xícara aparecem
export const PinIcon: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const drop = pop(f, fps, 0);
  return (
    <svg {...svg}>
      <ellipse cx="100" cy="116" rx={26 * drop} ry={6 * drop} fill="rgba(0,0,0,0.35)" />
      <g transform={`translate(0 ${interpolate(drop, [0, 1], [-120, 0])})`}>
        <path d="M100 112 c-28 -30 -40 -46 -40 -64 a40 40 0 0 1 80 0 c0 18 -12 34 -40 64 z" fill={colors.terracota} />
        <circle cx="100" cy="48" r="14" fill={colors.espresso} />
      </g>
      <g stroke={colors.crema} {...stroke} strokeWidth={7}>
        <path d="M18 186 h88 M32 178 v-42 h60 v42" {...drawProps(f, 20, 18)} />
        <path
          d="M128 150 h36 v20 a14 14 0 0 1 -14 14 h-8 a14 14 0 0 1 -14 -14 z M164 156 h6 a8 8 0 0 1 0 16 h-6"
          {...drawProps(f, 28, 18)}
        />
      </g>
    </svg>
  );
};
