// config.js
// Configuration de l'application

// Couleurs du thème
export const THEME = {
  primary: "#22A7E8",
  secondary: "#5E2CA5",
  accent: "#FFD400",
  white: "#FFFFFF",
  primaryLight: "#9ADCF8",
};

// Liens vers les sites web
export const LINKS = {
  discord: "https://discord.gg/YV4xnhfWbC",
  shop: "https://sunandreas.tebex.io",
  panel: "https://tonsite.com/panel",
};

// Vidéos de fond : utiliser un chemin relatif pour FiveM
export const VIDEOS = {
  // list: ["https://www.youtube.com/watch?v=QkkoHAzjnUs"],
  list: ["media/videos/video1.mp4"],
  // list: ["https://www.youtube.com/exemple"],["media/videos/video.mp4"],
};

// Musique : utiliser des chemins relatifs pour FiveM
export const MUSIC = {
  list: [
    { title: "Night – J2S", url: "media/music/Night.mp3" },
    {
      title: "Bienvenue sur Sun Andreas – J2S",
      url: "media/music/Bienvenue_Sur_SunAndreas.mp3",
    },
    // { title: "Example", url: "media/music/Example.mp3" },
  ],
};

// Phrases en haut de l'application
export const TOP_PHRASES = [
  "Utilise ton Nom et Prénom RP sur le Discord.",
  "Consulte le Panel pour suivre ton personnage et les événements.",
  "Bon jeu à toutes et à tous sur le serveur.",
  "Lis les règles du serveur avant de jouer.",
  "Le respect entre joueurs est la priorité n°1.",
  "Rejoins notre Discord pour ne rien manquer.",
  "Les actions ont des conséquences. Choisis-les avec sagesse.",
];

// News
export const NEWS = [
  {
    icon: "🎃",
    title: "Event Halloween",
    description: "Participez à la chasse aux bonbons jusqu'au 15/11.",
    date: "05/11/2025",
  },
  {
    icon: "🚗",
    title: "Nouveaux véhicules",
    description: "5 nouveaux véhicules ajoutés au concessionnaire.",
    date: "01/11/2025",
  },
  {
    icon: "⚖️",
    title: "Mise à jour des règles",
    description: "Consultez les nouvelles règles RP sur le Discord.",
    date: "28/10/2025",
  },
  {
    icon: "🎁",
    title: "Boutique",
    description: "Nouveaux packs disponibles sur Tebex.",
    date: "25/10/2025",
  },
  // { icon: "🎉", title: "Example", description: "Example", date: "01/01/2025" },
];

// Version du serveur
export const SERVER = {
  version: "v1.0 – 04/11/2025",
};
