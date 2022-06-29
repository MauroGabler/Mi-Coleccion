/* eslint-disable linebreak-style */

const { Router } = require('express')
const { consultar, seguir, modificar } = require('../models/seguidor')

const router = Router()

router.get('/seguidor', async (req, res) => {
  const params = req.body
  const respuesta = await consultar(params)
  res.json(respuesta)
})

router.post('/seguidor', async (req, res) => {
  const params = req.body
  const respuesta = await seguir(params)
  res.json(respuesta)
})

router.put('/seguidor', async (req, res) => {
  const params = req.body
  const respuesta = await modificar(params)
  res.json(respuesta)
})

module.exports = router
