// Copia as fotos de ../assets para public/ e gera src/photos.generated.ts
// com as que existirem. Foto ausente → a cena usa gradiente escuro.
import { copyFileSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const names = ["foto-hero.png", "foto-latte.png", "foto-interior.png"];
const src = join(import.meta.dirname, "..", "..", "assets");
const pub = join(import.meta.dirname, "..", "public");
mkdirSync(pub, { recursive: true });

const found = {};
for (const n of names) {
  const key = n.replace("foto-", "").replace(".png", "");
  if (existsSync(join(src, n))) {
    copyFileSync(join(src, n), join(pub, n));
    found[key] = n;
  }
}
writeFileSync(
  join(import.meta.dirname, "..", "src", "photos.generated.ts"),
  `// Gerado por scripts/sync-assets.mjs — não editar.\nexport const photos: Partial<Record<"hero" | "latte" | "interior", string>> = ${JSON.stringify(found)};\n`,
);
console.log("Fotos encontradas:", Object.keys(found).join(", ") || "nenhuma (usando gradiente)");
