// vite.config.js
// Configuration principale du bundler Vite pour un projet React.
// Gère la compilation, la sortie de build et la structure des fichiers générés.

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()], // Activation du support React via le plugin officiel
  base: "./", // Chemin de base relatif pour compatibilité avec le déploiement local
  publicDir: "public", // Répertoire contenant les ressources statiques non transformées

  build: {
    outDir: "dist", // Dossier de sortie pour la build de production
    assetsInlineLimit: 0, // Désactivation de l’inlining automatique des fichiers
    copyPublicDir: true, // Copie du répertoire public dans le build final

    rollupOptions: {
      output: {
        // Configuration des noms de fichiers générés selon le type de ressource
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || "";

          // Gestion spécifique des polices
          if (/\.(woff2?|ttf)$/.test(name)) return "webfonts/[name][extname]";

          // Gestion des fichiers multimédias (vidéos et sons)
          if (/\.(mp4|webm|mp3|ogg)$/i.test(name))
            return "media/[name][extname]";

          // Format général par défaut avec hash unique
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});
