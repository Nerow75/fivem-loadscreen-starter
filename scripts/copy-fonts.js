// copy-fonts.js
import { copyFileSync, mkdirSync, readdirSync, existsSync } from "fs";
import { join } from "path";

const sourceDir = "node_modules/@fortawesome/fontawesome-free/webfonts";
const targetDir = "dist/webfonts";

try {
  if (!existsSync(sourceDir)) {
    console.warn(
      "Avertissement : le répertoire source FontAwesome est introuvable."
    );
    process.exit(0);
  }

  mkdirSync(targetDir, { recursive: true });
  const files = readdirSync(sourceDir);

  const copied = files.filter((file) => /\.(woff2?|ttf)$/i.test(file));

  if (copied.length === 0) {
    console.warn("Aucune webfont détectée à copier.");
    process.exit(0);
  }

  for (const file of copied) {
    const src = join(sourceDir, file);
    const dest = join(targetDir, file);
    copyFileSync(src, dest);
    console.log(`Copie effectuée : ${file}`);
  }

  console.log("Webfonts copiées avec succès vers dist/webfonts.");
} catch (err) {
  console.error("Erreur lors de la copie des webfonts :", err);
  process.exit(1);
}
