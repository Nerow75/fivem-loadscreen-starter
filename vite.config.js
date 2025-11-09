import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
    copyPublicDir: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
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
  publicDir: "public",
});
