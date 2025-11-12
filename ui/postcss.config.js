// postcss.config.js
// Configuration PostCSS pour le traitement CSS automatisé.
// Intègre TailwindCSS et Autoprefixer pour la compatibilité multi-navigateurs.

export default {
  plugins: {
    tailwindcss: {}, // Activation de TailwindCSS
    autoprefixer: {}, // Ajout automatique des préfixes CSS nécessaires
  },
};
