// config.christmas.js
// Configuration du thème Noël

// Couleurs du thème Noël
export const CHRISTMAS_THEME = {
  primary: "#C41E3A", // Rouge Noël
  secondary: "#165B33", // Vert sapin
  accent: "#FFD700", // Or
  white: "#FFFFFF",
  primaryLight: "#FF6B6B",
  gold: "#D4AF37",
  darkGreen: "#0F4C28",
  snow: "#F0F8FF",
};

// Liens vers les sites web (identique à config.js)
export const LINKS = {
  discord: "https://discord.gg/YV4xnhfWbC",
  shop: "https://sunandreas.tebex.io",
  panel: "https://tonsite.com/panel",
};

// Vidéos de fond : utiliser un chemin relatif pour FiveM
export const VIDEOS = {
  list: ["media/videos/video1.mp4"],
};

// Musique de Noël : utiliser des chemins relatifs pour FiveM
export const MUSIC = {
  list: [
    { title: "Jingle Bells - Remix", url: "media/music/jingle-bells.mp3" },
    { title: "Carol of the Bells", url: "media/music/carol-bells.mp3" },
    { title: "Winter Wonderland", url: "media/music/winter-wonderland.mp3" },
  ],
};

// Phrases de Noël
export const TOP_PHRASES = [
  "Joyeuses fêtes sur Sun Andreas !",
  "Profite de l'événement Noël jusqu'au 31 décembre.",
  "Des cadeaux exclusifs disponibles dans la boutique.",
  "Rejoins l'événement spécial Noël sur le Discord.",
  "Le Père Noël est passé sur le serveur !",
  "Bonnes fêtes de fin d'année à tous !",
  "Nouvelle année, nouvelles aventures RP !",
];

// News de Noël
export const NEWS = [
  {
    icon: "🎄",
    title: "Event Noël 2025",
    description: "Participez à la chasse aux cadeaux jusqu'au 31/12.",
    date: "01/12/2025",
  },
  {
    icon: "🎁",
    title: "Cadeaux exclusifs",
    description: "Objets rares disponibles uniquement pendant les fêtes.",
    date: "15/12/2025",
  },
  {
    icon: "❄️",
    title: "Météo hivernale",
    description: "La neige s'invite sur San Andreas !",
    date: "20/12/2025",
  },
  {
    icon: "🎅",
    title: "Visite du Père Noël",
    description: "Rencontrez le Père Noël en jeu chaque jour.",
    date: "24/12/2025",
  },
];

// Version du serveur
export const SERVER = {
  version: "v1.0 - Édition Noël 2025",
};

// Configuration des particules de neige
export const SNOW_CONFIG = {
  count: 150,
  minSize: 2,
  maxSize: 6,
  minSpeed: 0.5,
  maxSpeed: 2,
  wind: 0.3,
  opacity: 0.8,
};

// Configuration des décorations
export const DECORATIONS_CONFIG = {
  lights: {
    enabled: true,
    colors: ["#FFD700", "#FF6B6B", "#4CAF50", "#2196F3"],
    count: 20,
  },
  stars: {
    enabled: true,
    count: 10,
    sparkleInterval: 2000,
  },
};
