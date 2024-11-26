
const express = require('express');
const cors = require('cors');
import { criarTabelas } from './db.js';
import rotas from './roteamento/rotas_autenticacao.js';
import rotas_users from './roteamento/rotas_usuarios.js';
import rotas_artistas from './roteamento/rotas_artista.js';
import rotas_albums from './roteamento/rotas_album.js';
import artistsRoutes from './roteamento/artists.js';
import albumsRoutes from './roteamento/albums.js';
import songsRoutes from './roteamento/songs.js';
import playlistsRoutes from './roteamento/playlists.js';
import recommendationsRoutes from './roteamento/recommendations.js';
import searchRoutes from './roteamento/search.js';
import authRoutes from './roteamento/auth.js';
const app = express();
app.use(express.json());
app.use(cors());
// Uncomment if table creation is needed
// criarTabelas();
app.use('/autenticacao', rotas);
app.use('/user', rotas_users);
app.use('/artista', rotas_artistas);
app.use('/album', rotas_albums);
app.use('/artists', artistsRoutes);
app.use('/albums', albumsRoutes);
app.use('/songs', songsRoutes);
app.use('/playlists', playlistsRoutes);
app.use('/recommendations', recommendationsRoutes);
app.use('/search', searchRoutes);
app.use('/auth', authRoutes);
app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
});
const router = express.Router();

module.exports = router;
