-- Fichier de declaration principal du script pour l'environnement FiveM.

fx_version 'cerulean'
game 'gta5'

author 'Template Maintainer'
description 'Starter de loading screen React / Vite pour FiveM'
version '1.0.0'

loadscreen 'ui/dist/index.html'
loadscreen_cursor 'yes'
loadscreen_manual_shutdown 'yes'

files {
    'ui/dist/index.html',
    'ui/dist/logo.svg',
    'ui/dist/assets/**',
    'ui/dist/media/**',
    'ui/dist/webfonts/**'
}

client_scripts {
    'fivem/client.lua'
}
