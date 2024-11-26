const express = require('express');
const router = express.Router();
const express = require('express');

const { pegarTodosArtistas, pegarArtistaPorId, pegarAlbumsPorArtista } = '../controlador/controlador_artista.js'
const rotas_artistas = express.Router()
rotas_artistas.get('/', pegarTodosArtistas)
rotas_artistas.get('/:id', pegarArtistaPorId)
rotas_artistas.get('/:id/albums/', pegarAlbumsPorArtista)  
{rotas_artistas}
module.exports = router;