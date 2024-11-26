const express = require('express');
const router = express.Router();
const express = require('express');

const { pegarTodosAlbums, pegarAlbumPorId, pegarMusicaPeloAlbum } = '../controlador/controlador_album.js'
const rotas_albums = express.Router()
rotas_albums.get('/', pegarTodosAlbums)
rotas_albums.get('/:id', pegarAlbumPorId) 
rotas_albums.get('/:id/musicas/', pegarMusicaPeloAlbum)  
{rotas_albums}
module.exports = router;