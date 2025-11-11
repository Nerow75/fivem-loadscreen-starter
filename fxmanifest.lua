-- fxmanifest.lua
fx_version 'cerulean'
game 'gta5'

author 'NRW'
description 'Écran de chargement React / Vite optimisé'
version '1.0.0'

-- Type : loadscreen
loadscreen 'dist/index.html'
loadscreen_cursor 'yes'
loadscreen_manual_shutdown 'yes'

files {
  'dist/index.html',
  'dist/assets/**',
  'dist/media/**',
  'dist/webfonts/**',
  'logo.png',
  'media/**'
}

client_scripts {
  'client.lua'
}
