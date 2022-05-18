<<<<<<< HEAD
/* eslint-disable linebreak-style */
=======
>>>>>>> cf14752f2bf7fb106c58032602d31c06e0f70f61
const { Router } = require('express')
const { consultar, guardar, modificar } = require('../models/publicacion')

const router = Router()

router.get('/publicacion', async (req, res) => {
  const params = req.body
  const respuesta = await consultar(params)
  res.json(respuesta)
})

router.post('/publicacion', async (req, res) => {
  const params = req.body
  const respuesta = await guardar(params)
  res.json(respuesta)
})

router.put('/publicacion', async (req, res) => {
  const params = req.body
  const respuesta = await modificar(params)
  res.json(respuesta)
})

module.exports = router