const { Router } = require('express')
const { consultar, guardar, modificar } = require('../models/valoracion')

const router = Router()

router.get('/valoracion', async (req, res) => {
  const params = req.body
  const respuesta = await consultar(params)
  res.json(respuesta)
})

router.post('/valoracion', async (req, res) => {
  const params = req.body
  const respuesta = await guardar(params)
  res.json(respuesta)
})

router.put('/valoracion', async (req, res) => {
  const params = req.body
  const respuesta = await modificar(params)
  res.json(respuesta)
})

module.exports = router