/* eslint-disable linebreak-style */
const { Router } = require('express')
const { consultar, guardar, modificar } = require('../models/articulo')

const router = Router()

router.get('/articulo', async (req, res) => {
  const parametros = req.body
  const respuesta = await consultar(parametros)
  res.json(respuesta)
})

router.post('/articulo', async (req, res) => {
  const parametros = req.body
  const respuesta = await guardar(parametros)
  res.json(respuesta)
})

router.put('/articulo', async (req, res) => {
  const parametros = req.body
  const respuesta = await modificar(parametros)
  res.json(respuesta)
})
    
module.exports = router