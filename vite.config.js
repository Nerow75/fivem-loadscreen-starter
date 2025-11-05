import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
    // Copier les assets publics
    copyPublicDir: true,
    // S'assurer que les assets sont bien inclus
    assetsInlineLimit: 0, // Ne pas inline les assets
    rollupOptions: {
      output: {
        // Structure propre pour les assets
        assetFileNames: (assetInfo) => {
          // Garder les webfonts dans un dossier webfonts/
          if (
            assetInfo.name.endsWith(".woff2") ||
            assetInfo.name.endsWith(".woff") ||
            assetInfo.name.endsWith(".ttf")
          ) {
            return "webfonts/[name][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
  // S'assurer que le dossier public est bien configuré
  publicDir: "public",
});
