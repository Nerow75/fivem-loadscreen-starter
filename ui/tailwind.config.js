// tailwind.config.js
// Configuration du framework TailwindCSS pour la personnalisation du design system.

export default {
  // Chemins analysés par Tailwind pour la purge des classes inutilisées
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      // Palette de couleurs personnalisée
      colors: {
        primary: "#22A7E8", // Couleur principale
        secondary: "#5E2CA5", // Couleur secondaire
        accent: "#FFD400", // Couleur d’accentuation
        light: "#9ADCF8", // Couleur claire complémentaire
      },
      // Police principale de l’interface
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },

  // Aucun plugin supplémentaire défini
  plugins: [],
};
