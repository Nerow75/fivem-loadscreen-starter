// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  base: "./",
  publicDir: "public",
  build: {
    outDir: "dist",
    assetsInlineLimit: 0,
    copyPublicDir: true,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || "";
          if (/\.(woff2?|ttf)$/.test(name)) return "webfonts/[name][extname]";
          if (/\.(mp4|webm|mp3|ogg)$/i.test(name))
            return "media/[name][extname]";
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});
