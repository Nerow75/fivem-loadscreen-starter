// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  base: "./", // important pour NUI / chemins relatifs
  build: { outDir: "dist" },
});
