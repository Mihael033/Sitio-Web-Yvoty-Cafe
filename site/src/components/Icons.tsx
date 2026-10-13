const base = {
  width: 40,
  height: 40,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const IconGrano = () => (
  <svg {...base}>
    <path d="M12 3c4.5 2 6.5 6 6 10s-3.5 8-6 8-5.5-4-6-8 1.5-8 6-10z" />
    <path d="M12 3c-2 4 2 7 0 11s0 7 0 7" />
  </svg>
);
export const IconFuego = () => (
  <svg {...base}>
    <path d="M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z" />
  </svg>
);
export const IconWifi = () => (
  <svg {...base}>
    <path d="M2.5 9a14 14 0 0 1 19 0M5.5 12.5a9.5 9.5 0 0 1 13 0M8.7 16a5 5 0 0 1 6.6 0" />
    <circle cx="12" cy="19.5" r="1" fill="currentColor" />
  </svg>
);
export const iconFor = (k: "grano" | "fuego" | "wifi") =>
  k === "grano" ? <IconGrano /> : k === "fuego" ? <IconFuego /> : <IconWifi />;
