export const Flor = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
    {[0, 72, 144, 216, 288].map((a) => (
      <ellipse key={a} cx="20" cy="9.5" rx="5.5" ry="9" fill="#C8602E" transform={`rotate(${a} 20 20)`} />
    ))}
    <circle cx="20" cy="20" r="4.5" fill="#F3E9DC" />
  </svg>
);

export const Logo = ({ tone = "light" }: { tone?: "light" | "dark" }) => (
  <span className="inline-flex items-center gap-2">
    <Flor />
    <span
      className={`font-display text-2xl font-bold tracking-tight ${tone === "light" ? "text-crema" : "text-espresso"}`}
    >
      Yvoty
    </span>
  </span>
);
