/* eslint-disable linebreak-style */

const { Router } = require('express')
const { consultar, guardar, modificar } = require('../models/comentario')

const router = Router()

router.post('/getComentario', async (req, res) => {
  const params = req.body
  const respuesta = await consultar(params)
  res.json(respuesta)
})

router.post('/comentario', async (req, res) => {
  const params = req.body
  const respuesta = await guardar(params)
  res.json(respuesta)
})

router.put('/comentario', async (req, res) => {
  const params = req.body
  const respuesta = await modificar(params)
  res.json(respuesta)
})

module.exports = router
