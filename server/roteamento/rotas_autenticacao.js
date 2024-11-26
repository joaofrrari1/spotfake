const express = require('express');
const router = express.Router();
const express = require('express');
const rotas = express.Router();
// Example route for testing
rotas.get('/', (req, res) => {
    res.send('Rota de autenticação funcionando!');
});
module.exports = rotas;

module.exports = router;
