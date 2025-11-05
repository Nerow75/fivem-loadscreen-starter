import { copyFileSync, mkdirSync, readdirSync } from "fs";
import { join } from "path";

const sourceDir = "node_modules/@fortawesome/fontawesome-free/webfonts";
const targetDir = "dist/webfonts";

try {
  mkdirSync(targetDir, { recursive: true });
  const files = readdirSync(sourceDir);

  files.forEach((file) => {
    if (
      file.endsWith(".woff2") ||
      file.endsWith(".woff") ||
      file.endsWith(".ttf")
    ) {
      copyFileSync(join(sourceDir, file), join(targetDir, file));
      console.log(`✅ Copié: ${file}`);
    }
  });

  console.log("✅ Webfonts copiées avec succès!");
} catch (err) {
  console.error("❌ Erreur:", err);
}
