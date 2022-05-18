/* eslint-disable linebreak-style */
const { Router } = require('express')
const { consultar, guardar, modificar } = require('../models/categoria')

const router = Router()

router.get('/categoria', async (req, res) => {
  const params = req.body
  const respuesta = await consultar(params)
  res.json(respuesta)
})

router.post('/categoria', async (req, res) => {
  const params = req.body
  const respuesta = await guardar(params)
  res.json(respuesta)
})

router.put('/categoria', async (req, res) => {
  const params = req.body
  const respuesta = await modificar(params)
  res.json(respuesta)
})

module.exports = router