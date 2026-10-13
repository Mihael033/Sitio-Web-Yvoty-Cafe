import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const fraunces = loadFraunces("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin"],
});
const inter = loadInter("normal", { weights: ["400", "600"], subsets: ["latin"] });

export const colors = {
  espresso: "#2B1A12",
  crema: "#F3E9DC",
  terracota: "#C8602E",
  verdeHoja: "#4F7A4A",
  blanco: "#FFFFFF",
} as const;

export const fonts = {
  title: fraunces.fontFamily,
  body: inter.fontFamily,
} as const;

export const VIDEO = {
  width: 1080,
  height: 1920,
  fps: 30,
  durationInFrames: 600, // 20 s
  sceneFrames: 114, // 5 telas; com sobreposição das transições ≈ 3,4 s visíveis
  closingFrames: 90,
  transitionFrames: 12,
} as const;
