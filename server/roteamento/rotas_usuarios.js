const express = require('express');
const router = express.Router();
const express = require('express');

// criar rotas para listar todos os usuarios
const {pegar_usuario, listar_usuarios, deletar_usuario, trocar_img} = '../controlador/controlador_usuarios.js'
const rotas_users = express.Router()
rotas_users.get('/:id', pegar_usuario)
rotas_users.get('/', listar_usuarios)
rotas_users.delete('/:id', deletar_usuario)
rotas_users.post('/trocar-img/:id', trocar_img)
{ rotas_users }
module.exports = router;