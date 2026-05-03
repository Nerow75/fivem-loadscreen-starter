// config.js
// Configuration principale du template

// Couleurs du theme
export const THEME = {
  primary: "#22A7E8",
  secondary: "#5E2CA5",
  accent: "#FFD400",
  white: "#FFFFFF",
  primaryLight: "#9ADCF8",
};

// Liens externes
export const LINKS = {
  discord: "https://discord.gg/votre-serveur",
  shop: "https://votre-serveur.tebex.io",
  panel: "https://panel.votre-serveur.example",
};

// Videos de fond : utiliser un chemin relatif pour FiveM
export const VIDEOS = {
  // list: ["https://www.youtube.com/watch?v=QkkoHAzjnUs"],
  list: ["media/videos/video1.mp4"],
  // list: ["https://www.youtube.com/exemple", "media/videos/video.mp4"],
};

// Musique : utiliser des chemins relatifs pour FiveM
export const MUSIC = {
  list: [
    // { title: "Votre piste", url: "media/music/votre-piste.mp3" },
    // { title: "Votre piste 02", url: "media/music/votre-piste-02.mp3" },
  ],
};

// Phrases en haut de l'application
export const TOP_PHRASES = [
  "Personnalise ce starter depuis ui/src/config/config.js.",
  "Remplace le logo, les liens et les medias avant la mise en production.",
  "Ajoute ici tes phrases d'accueil, conseils et annonces serveur.",
  "Utilise ce loadscreen comme base pour ton identite visuelle FiveM.",
  "Garde des messages courts pour une lecture rapide pendant le chargement.",
  "Pense a mettre a jour Discord, boutique et panel avant publication.",
  "Tu peux adapter cette section a du RP, du PvP, du freestyle ou du dev.",
];

// News
export const NEWS = [
  {
    icon: "\u{1F3AF}",
    title: "Annonce principale",
    description: "Utilise cette carte pour afficher une info importante.",
    date: "01/05/2026",
  },
  {
    icon: "\u{1F6E0}\u{FE0F}",
    title: "Mise a jour",
    description: "Resume ici une nouveaute, un patch ou un ajout contenu.",
    date: "28/04/2026",
  },
  {
    icon: "\u{1F4E3}",
    title: "Communaute",
    description: "Ajoute un rappel vers Discord, le reglement ou un event.",
    date: "24/04/2026",
  },
  {
    icon: "\u{1F9E9}",
    title: "Personnalisation",
    description: "Tu peux modifier les icones, les textes et les dates librement.",
    date: "20/04/2026",
  },
  // { icon: "\u{1F389}", title: "Votre news", description: "Votre description", date: "01/01/2026" },
];

// Version du serveur
export const SERVER = {
  version: "Starter 1.0.0",
};
