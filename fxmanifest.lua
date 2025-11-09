fx_version 'cerulean'
game 'gta5'

author 'NRW'
description 'Écran de chargement'
version '1.0.0'

loadscreen 'dist/index.html'
loadscreen_cursor 'yes'
loadscreen_manual_shutdown 'yes'

files {
  'dist/**',
  'logo.png',
  'media/**'
}

client_scripts {
  'client.lua'
}
