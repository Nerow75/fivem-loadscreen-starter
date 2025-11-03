# 🎮 Écran de Chargement FiveM - React + Vite + TailwindCSS

Écran de chargement moderne et professionnel pour FiveM avec architecture conventionnelle.

## 📁 Structure du projet

```
loadscreen-fivem/
├── src/
│   ├── App.jsx              # Composant principal
│   ├── main.jsx             # Point d'entrée React
│   └── index.css            # Styles + TailwindCSS
├── public/
│   └── logo.png             # Votre logo (à remplacer)
├── dist/                    # Build de production (généré)
├── fxmanifest.lua           # Configuration FiveM
├── package.json             # Dépendances NPM
├── package-lock.json        # Lock des dépendances
├── vite.config.js           # Configuration Vite
├── tailwind.config.js       # Configuration TailwindCSS
├── postcss.config.js        # Configuration PostCSS
└── index.html               # Template HTML
```

## 🚀 Installation

### 1. Installer les dépendances

```bash
npm install
```

### 2. Personnaliser le contenu

**Logo** : Remplacez `public/logo.png` par votre logo

**Vidéos** : Dans `src/App.jsx`, ligne 8-12 :
```javascript
const backgroundVideos = [
  'https://votre-url-video-1.mp4',
  'https://votre-url-video-2.mp4',
];
```

**Musique** : Dans `src/App.jsx`, ligne 15 :
```javascript
const musicUrl = 'https://votre-musique.mp3';
```

**Nom du serveur** : Dans `src/App.jsx`, ligne 74 :
```javascript
<h1>VOTRE NOM SERVEUR</h1>
```

### 3. Build pour production

```bash
npm run build
```

### 4. Déployer sur FiveM

1. Copiez **tout le dossier** dans `resources/`
2. Ajoutez dans `server.cfg` :
```
ensure loadscreen-fivem
```

## 🛠️ Développement

### Lancer le serveur de dev
```bash
npm run dev
```

### Preview du build
```bash
npm run preview
```

## ✨ Fonctionnalités

✅ React 18 avec Vite (build ultra rapide)  
✅ TailwindCSS pour le styling  
✅ Vidéo aléatoire en arrière-plan  
✅ Musique avec autoplay  
✅ Barre de progression animée  
✅ Logo centré avec animation  
✅ Compatible FiveM  
✅ Package-lock.json inclus  

## 🎨 Personnalisation avancée

### Modifier les couleurs du gradient

Dans `src/App.jsx`, ligne 86 :
```javascript
className="bg-gradient-to-r from-blue-500 to-purple-600"
```

Couleurs TailwindCSS disponibles : `red`, `blue`, `green`, `purple`, `pink`, `yellow`, etc.

### Modifier les animations

Dans `src/App.jsx`, ligne 71 (logo) :
```javascript
className="... animate-pulse"
```

Animations disponibles : `animate-spin`, `animate-ping`, `animate-bounce`

### Ajouter des composants

Créez de nouveaux fichiers `.jsx` dans `src/` et importez-les dans `App.jsx`

## 📦 Dépendances

- **react** : ^18.3.1
- **react-dom** : ^18.3.1
- **vite** : ^6.0.1
- **@vitejs/plugin-react** : ^4.3.4
- **tailwindcss** : ^3.4.15
- **postcss** : ^8.4.49
- **autoprefixer** : ^10.4.20

## 🔧 Scripts disponibles

```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run preview  # Preview du build
```

## 📝 Notes importantes

- **TOUJOURS** faire `npm run build` avant de déployer
- Le dossier `dist/` contient les fichiers pour FiveM
- Ne modifiez **jamais** directement les fichiers dans `dist/`
- Les modifications se font dans `src/`

## 🐛 Résolution de problèmes

### Le loadscreen ne s'affiche pas
- Vérifiez que vous avez fait `npm run build`
- Vérifiez que le dossier `dist/` existe
- Vérifiez le `fxmanifest.lua`

### Erreur "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### La musique ne démarre pas
- Normal dans le navigateur (autoplay bloqué)
- Fonctionne automatiquement dans FiveM

## 🌐 Sources recommandées

**Vidéos gratuites :**
- Pexels : https://www.pexels.com/videos/
- Pixabay : https://pixabay.com/videos/
- Mixkit : https://mixkit.co/

**Musique gratuite :**
- Pixabay Music : https://pixabay.com/music/
- YouTube Audio Library : https://youtube.com/audiolibrary
- Incompetech : https://incompetech.com/

## 📄 Licence

Libre d'utilisation pour votre serveur FiveM.

---

**Bon développement ! 🚀**
