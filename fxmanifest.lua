fx_version 'cerulean'
game 'gta5'

author 'NRW'
description 'Écran de chargement React / Vite optimisé'
version '2.0.0'

loadscreen 'ui/dist/index.html'
loadscreen_cursor 'yes'
loadscreen_manual_shutdown 'yes'

files {
    'ui/dist/index.html',
    'ui/dist/assets/**',
    'ui/dist/media/**',
    'ui/dist/webfonts/**',
    'assets/logo.png',
    'assets/media/**'
}

client_scripts {
    'fivem/client.lua'
}