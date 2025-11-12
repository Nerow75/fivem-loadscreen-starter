-- fxmanifest.lua
-- Fichier de déclaration principal du script pour l’environnement FiveM.
-- Définit la version du manifest, le jeu cible, les métadonnées et les ressources à charger.

fx_version 'cerulean'          -- Version du manifest compatible avec la build Cerulean
game 'gta5'                    -- Cible le jeu Grand Theft Auto V

author 'NRW'                   -- Auteur ou organisation responsable du projet
description 'Écran de chargement React / Vite optimisé' -- Brève description du module
version '2.0.0'                -- Version actuelle du projet

-- Spécifie la page HTML utilisée comme écran de chargement
loadscreen 'ui/dist/index.html'

-- Active le curseur durant le chargement
loadscreen_cursor 'yes'

-- Indique que la fermeture du chargement doit être contrôlée manuellement par le client
loadscreen_manual_shutdown 'yes'

-- Liste des fichiers intégrés dans la ressource
files {
    'ui/dist/index.html',  -- Fichier principal de l’interface utilisateur
    'ui/dist/assets/**',   -- Fichiers statiques générés par Vite (CSS, JS, images)
    'ui/dist/media/**',    -- Fichiers multimédias (vidéos, sons)
    'ui/dist/webfonts/**', -- Polices intégrées au build
    'assets/logo.png',     -- Logo de l’écran de chargement
    'assets/media/**'      -- Ressources additionnelles (sons, vidéos)
}

-- Déclaration des scripts côté client
client_scripts {
    'fivem/client.lua'     -- Script client gérant la logique de synchronisation et d’arrêt du chargement
}
