import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../brand/theme";
import { pop } from "../icons/draw";
import { Petal } from "../icons/Icons";

// Logo: flor de 5 pétalas terracota + wordmark "Yvoty" em Fraunces
const Logo: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = pop(f, fps, 0);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: `scale(${interpolate(s, [0, 1], [0.9, 1])})`,
        opacity: s,
      }}
    >
      <svg viewBox="-80 -80 160 160" width={260} height={260}>
        {[0, 72, 144, 216, 288].map((a, i) => (
          <Petal key={a} angle={a} s={pop(f, fps, 4 + i * 3)} color={colors.terracota} filled />
        ))}
        <circle r={12 * pop(f, fps, 20)} fill={colors.espresso} />
      </svg>
      <div
        style={{
          fontFamily: fonts.title,
          fontWeight: 700,
          fontSize: 190,
          lineHeight: 1,
          color: colors.espresso,
          letterSpacing: -4,
          marginTop: 10,
        }}
      >
        Yvoty
      </div>
      <div
        style={{
          fontFamily: fonts.body,
          fontWeight: 600,
          fontSize: 38,
          letterSpacing: 18,
          color: colors.verdeHoja,
          marginTop: 6,
        }}
      >
        CAFÉ
      </div>
    </div>
  );
};

export const Closing: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tag = pop(f, fps, 22);
  const handle = pop(f, fps, 32);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.crema,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 70,
      }}
    >
      <Logo />
      <div
        style={{
          fontFamily: fonts.title,
          fontStyle: "italic",
          fontSize: 60,
          color: colors.espresso,
          textAlign: "center",
          padding: "0 110px",
          lineHeight: 1.2,
          opacity: tag,
          transform: `translateY(${(1 - tag) * 30}px)`,
        }}
      >
        Café de especialidad, hecho en <span style={{ color: colors.terracota }}>Santa Rita</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          fontFamily: fonts.body,
          fontWeight: 600,
          fontSize: 50,
          color: colors.espresso,
          opacity: handle,
        }}
      >
        <svg viewBox="0 0 24 24" width={54} height={54} fill="none" stroke={colors.terracota} strokeWidth={2}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.8" fill={colors.terracota} />
        </svg>
        @yvotycafe
      </div>
    </AbsoluteFill>
  );
};
