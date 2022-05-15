const { Router } = require('express')
const { consultar, meGusta, noMeGusta } = require('../models/like')

const router = Router()

router.get('/like', async (req, res) => {
  const params = req.body
  const respuesta = await consultar(params)
  res.json(respuesta)
})

router.post('/like', async (req, res) => {
  const params = req.body
  const respuesta = await meGusta(params)
  res.json(respuesta)
})

router.put('/like', async (req, res) => {
  const params = req.body
  const respuesta = await noMeGusta(params)
  res.json(respuesta)
})

module.exports = router