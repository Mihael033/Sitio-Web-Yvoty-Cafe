// Extrai 1 frame de cada tela (meio da parte visível) para out/frames/.
import { execSync } from "node:child_process";
import { mkdirSync } from "node:fs";

mkdirSync("out/frames", { recursive: true });
const frames = [
  ["tela1-cafe", 80],
  ["tela2-granos", 182],
  ["tela3-tostado", 284],
  ["tela4-latte", 386],
  ["tela5-veni", 488],
  ["cierre", 585],
];
for (const [name, frame] of frames) {
  execSync(`npx remotion still YvotyReel out/frames/${name}.png --frame=${frame}`, { stdio: "inherit" });
}
