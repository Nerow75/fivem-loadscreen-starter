fx_version 'cerulean'
game 'gta5'

author 'NRW'
description 'Écran de chargement'
version '1.0.0'

loadscreen 'dist/index.html'

files {
  'dist/index.html',
  'dist/assets/*.js',
  'dist/assets/*.css',
  'dist/logo.png',
  'dist/media/music/*.mp3'
}

client_scripts {
  'client.lua'
}