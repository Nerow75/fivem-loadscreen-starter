# FiveM Loading Screen

Écran de chargement moderne et personnalisable, développé avec **React** et **Vite**.  
Optimisé pour offrir une expérience fluide et esthétique avant l'entrée en jeu.

---

## Démonstration

<div align="center">

<!-- Démonstration locale : placez votre GIF ou capture d’écran ici -->
<img src="public/demo.gif" alt="Démonstration du loading screen" width="800"/>

</div>

---

## Caractéristiques

- Interface **responsive** compatible toutes résolutions.
- Gestion **audio** : playlist personnalisable avec volume sauvegardé localement.
- Vidéo de fond locale ou hébergée, compatible `.mp4` / `.webm`.
- Affichage en temps réel de **l'heure**, de la **date** et du **nombre de joueurs**.
- **Effets visuels** : particules, traînée de curseur et transitions fluides.
- Section **actualités** configurable depuis un simple fichier JavaScript.
- Intégration **Discord**, **Boutique**, **Panel** configurable via `config.js`.
- Compatibilité complète avec le système **loadscreen de FiveM**.
- Code clair, commenté et optimisé pour les performances.

---

## Installation

### 1. Cloner et installer

```bash
git clone https://github.com/votre-utilisateur/loading-screen.git
cd loading-screen
npm install
```

### 2. Lancer en mode développement

```bash
npm run dev
```

Puis ouvrez le projet sur [http://localhost:5173](http://localhost:5173).

### 3. Compiler pour la version FiveM

```bash
npm run build
```

Le build final se trouve dans le dossier `dist/`.

Placez le contenu du dossier `dist` dans votre ressource FiveM, puis ajoutez ceci dans votre `fxmanifest.lua` :

```lua
loadscreen 'dist/index.html'
loadscreen_cursor 'yes'
loadscreen_manual_shutdown 'yes'

files {
  'dist/**',
  'logo.png',
  'media/**'
}
```

---

## Configuration

Les paramètres se trouvent dans [`src/config.js`](./src/config.js).

- **VIDEOS** : liste des fichiers vidéo de fond
- **MUSIC** : playlist audio
- **TOP_PHRASES** : messages tournants en haut de l’écran
- **NEWS** : actualités affichées en bas à droite
- **LINKS** : liens externes (Discord, boutique, panel)
- **THEME** : couleurs et style global

---

## Structure du projet

```
src/
 ├─ components/      # Composants React (UI)
 ├─ hooks/           # Hooks personnalisés (audio, particules, etc.)
 ├─ assets/          # Images et vidéos
 ├─ styles/          # Feuilles CSS et animations
 ├─ config.js        # Fichier de configuration principal
 └─ main.jsx         # Entrée principale du projet
```

---

## Technologies utilisées

| Technologie   | Utilisation               |
| ------------- | ------------------------- |
| React         | Composants et logique UI  |
| Vite          | Compilation et hot reload |
| Tailwind CSS  | Mise en page responsive   |
| Framer Motion | Animations fluides        |
| Font Awesome  | Icônes vectorielles       |

---

## Licence

Ce projet est distribué sous licence **MIT**.
Toute redistribution ou revente non autorisée du code source est interdite sans accord préalable.

## Informations complémentaires

- Développé en React pour FiveM.
- Fonctionne sur toutes les résolutions d’écran modernes.
- Optimisé pour de hautes performances (faible utilisation CPU/GPU).
