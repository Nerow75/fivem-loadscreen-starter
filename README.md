
# Loading Screen — FiveM (React + Lua)

Un **écran de chargement professionnel** pour serveur FiveM : vidéo de fond locale, musique, progression, particules, horloge, liens cliquables (Discord / Boutique / Panel) et thème personnalisable — sans dépendance YouTube.

---

## ✨ Fonctionnalités

- **Vidéo de fond locale** (aucun lecteur externe)
- **Musique** avec contrôle du volume (persisté en localStorage)
- **Logo + barre de progression**
- **Particules / Mouse trail** optionnels
- **Phrases/actus dynamiques**
- **Liens externes cliquables** via `window.invokeNative('openUrl', url)`
- **Compteur joueurs** via `GetActivePlayers()`
- **Chargement fluide** + **fermeture manuelle** du loadscreen
- **Thème et liens** centralisés dans `config.js`

---

## 📁 Structure (extrait)

```
loading_screen/
├─ client.lua
├─ fxmanifest.lua
├─ config.js
├─ constants.js
├─ main.jsx
├─ App.jsx
├─ components/
│  ├─ VideoBackground.jsx
│  ├─ MusicPlayer.jsx
│  ├─ Logo.jsx
│  ├─ ProgressBar.jsx
│  ├─ SocialLinks.jsx
│  ├─ Clock.jsx
│  ├─ Particles.jsx
│  └─ ...
├─ hooks/
│  ├─ useAudioPlayer.js
│  ├─ useNUIMessages.js
│  └─ ...
├─ styles/
│  ├─ index.css
│  └─ animations.css
└─ media/
   ├─ videos/
   └─ music/
```

---

## ⚙️ Installation

1) Copier la ressource dans `resources/[ui]/loading_screen`  
2) `server.cfg` :
```cfg
ensure loading_screen
```
3) `fxmanifest.lua` minimal recommandé :
```lua
fx_version 'cerulean'
game 'gta5'

loadscreen 'dist/index.html'
loadscreen_cursor 'yes'
loadscreen_manual_shutdown 'yes'

files {
  'dist/**',
  'media/**',
  'logo.png'
}

client_script 'client.lua'
```
4) Configurer `config.js` (liens + couleurs) :
```js
export const LINKS = {
  discord: 'https://discord.gg/votre-lien',
  panel:   'https://panel.votreserveur.fr',
  shop:    'https://boutique.votreserveur.fr',
};

export const THEME = {
  primary: '#d4af37', // couleur principale (logo/accents)
  accent:  '#ffffff',
};
```

---

## 🧪 Développement

```bash
# Dépendances
npm install

# Dev (hot reload)
npm run dev

# Build de prod -> /dist
npm run build
```

> En dev, l’ouverture de liens tombe en **fallback** sur `window.open` si `window.invokeNative` n’est pas disponible.

---

## 🧩 Notes d’implémentation

### Côté client (Lua)

- Envoi d’infos au front :
```lua
CreateThread(function()
  while true do
    local playerCount = #GetActivePlayers()
    SendLoadingScreenMessage(json.encode({ playerCount = playerCount }))
    Wait(2000)
  end
end)

AddEventHandler('playerSpawned', function()
  ShutdownLoadingScreen()
end)
```

### Côté front (React)

- Liens externes (Discord, Panel, Boutique) :
```jsx
const openExternal = (url) => {
  if (typeof window.invokeNative === 'function') {
    window.invokeNative('openUrl', url);
  } else {
    window.open(url, '_blank');
  }
};
```
- Réception NUI : `useNUIMessages.js` écoute `window.addEventListener('message', ...)`.

---

## 🪄 Animation Framer Motion (option pro)

> Ajoute une **micro‑interaction élégante** sur le logo au survol / au rythme de la progression.  
> Nécessite `framer-motion` (zero-config côté Vite).

### Installation
```bash
npm i framer-motion
```

### Exemple `Logo.jsx` (extrait)
```jsx
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

export default function Logo({ progress = 0 }) {
  const controls = useAnimation();

  useEffect(() => {
    // Micro "breathing" toutes les ~3s
    controls.start({
      scale: [1, 1.03, 1],
      rotate: [0, 1.5, 0],
      transition: { duration: 0.9, ease: 'easeInOut' }
    });
    const id = setInterval(() => {
      controls.start({
        scale: [1, 1.03, 1],
        rotate: [0, 1.5, 0],
        transition: { duration: 0.9, ease: 'easeInOut' }
      });
    }, 3000);
    return () => clearInterval(id);
  }, [controls]);

  const hover = {
    scale: 1.06,
    filter: 'drop-shadow(0 0 12px rgba(0,0,0,.35))',
    transition: { type: 'spring', stiffness: 240, damping: 18 }
  };

  // Légère pulsation liée à la progression (facultatif)
  const pulse = 1 + Math.min(progress / 100, 1) * 0.02;

  return (
    <motion.img
      src="/logo.png"
      alt="Logo"
      animate={controls}
      whileHover={hover}
      style={{
        width: 160,
        height: 'auto',
        transform: `scale(${pulse})`
      }}
    />
  );
}
```

**Variantes rapides :**
- Mode **entrance** (au mount) : `initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}`  
- **Sync barre de progression** : change `pulse` en fonction de la progression pour un effet « qui vit ».  
- **Focus pro** : animations < 1s, sobres, sans overshoot excessif.

---

## 🎬 Faire un « showcase » propre

### A) Vidéo de démonstration (recommandé)
1. Installer **OBS** (1080p/60fps).  
2. Scène *Capture de fenêtre* → ciblez la fenêtre FiveM.  
3. Démarrer l’enregistrement depuis le menu principal → *Connect* → laissez le loadscreen se jouer 10‑15 s.  
4. Export en **.mp4 (h264)**, coupez le début/fin si besoin (VLC, CapCut, Premiere…).  
5. Uploader sur **YouTube non répertorié** ou **Drive** pour partage rapide.

### B) GIF court (pour GitHub/README)
1. Enregistrez 5‑8 s en 1080p.  
2. Convertissez en GIF (ezgif.com ou ffmpeg local).  
3. Ajoutez-le au README :  
   ```md
   ![Preview](docs/preview.gif)
   ```

### C) Démo web (hébergement statique)
1. `npm run build` → dossier `/dist`.  
2. Hébergez `/dist` sur **GitHub Pages**, **Netlify**, **Vercel**.  
3. Note : certaines APIs NUI n’existent pas en web. Les liens utilisent le fallback `window.open`.

### D) Captures d’écran
- Écran **idle**, **progression à ~50%**, **liens au survol**, **mobile/low‑res** si pertinent.  
- Placez-les dans `docs/` et référencez-les dans le README.

---

## ✅ Checklist prod

- [ ] Liens `config.js` mis à jour (Discord/Panel/Boutique)  
- [ ] Couleurs validées avec le logo (contraste AA)  
- [ ] Vidéo `.mp4` optimisée (≤ 15 Mo conseillé)  
- [ ] Audio `.mp3` normalisé (‑14 LUFS approx.)  
- [ ] `loadscreen_cursor yes` & `manual_shutdown yes` dans `fxmanifest.lua`  
- [ ] `SendLoadingScreenMessage` OK + `ShutdownLoadingScreen()` au spawn  
- [ ] Test hors-ligne + en charge (20+ joueurs)  

---

## Licence

Usage privé autorisé pour votre serveur. Pour redistribution publique, créez un *fork* avec attribution.
