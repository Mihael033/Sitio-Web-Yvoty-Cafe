import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts } from "../brand/theme";

type Props = {
  text: string;
  highlight: string[]; // palavras em terracota
  photo?: string;
  overlay: number; // opacidade do overlay espresso (0–1)
  icon: React.ReactNode;
};

const Background: React.FC<{ photo?: string; overlay: number }> = ({ photo, overlay }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const scale = interpolate(frame, [0, durationInFrames], [1.04, 1.1]);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.espresso }}>
      {photo ? (
        <Img
          src={staticFile(photo)}
          style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale})` }}
        />
      ) : (
        <AbsoluteFill
          style={{
            transform: `scale(${scale})`,
            background: `radial-gradient(circle at 50% 38%, #5a3524 0%, ${colors.espresso} 55%, #170d08 100%)`,
          }}
        />
      )}
      <AbsoluteFill style={{ backgroundColor: colors.espresso, opacity: photo ? overlay : 0.25 }} />
      <AbsoluteFill
        style={{ background: "radial-gradient(circle, transparent 55%, rgba(0,0,0,0.45) 100%)" }}
      />
    </AbsoluteFill>
  );
};

const clean = (w: string) => w.replace(/[¿?¡!,.]/g, "").toLowerCase();

const Words: React.FC<{ text: string; highlight: string[] }> = ({ text, highlight }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        fontFamily: fonts.title,
        fontWeight: 600,
        fontSize: 118,
        lineHeight: 1.08,
        color: colors.crema,
        textAlign: "center",
        padding: "0 90px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        columnGap: 30,
      }}
    >
      {text.split(" ").map((w, i) => {
        const s = spring({ frame: frame - 14 - i * 5, fps, config: { damping: 14, mass: 0.7 } });
        const hot = highlight.includes(clean(w));
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: s,
              transform: `translateY(${(1 - s) * 60}px)`,
              color: hot ? colors.terracota : colors.crema,
              fontStyle: hot ? "italic" : "normal",
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};

export const Scene: React.FC<Props> = ({ text, highlight, photo, overlay, icon }) => {
  return (
    <AbsoluteFill>
      <Background photo={photo} overlay={overlay} />
      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 90 }}
      >
        <div style={{ width: 460, height: 460 }}>{icon}</div>
        <Words text={text} highlight={highlight} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
