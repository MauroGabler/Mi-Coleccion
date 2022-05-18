<<<<<<< HEAD
/* eslint-disable linebreak-style */
const { Router } = require('express')
const { consultar, guardar, modificar, login } = require('../models/usuario')
=======
const { Router } = require('express')
const { consultar, guardar, modificar } = require('../models/usuario')
>>>>>>> cf14752f2bf7fb106c58032602d31c06e0f70f61

const router = Router()

router.get('/usuario', async (req, res) => {
  const params = req.body
  const respuesta = await consultar(params)
  res.json(respuesta)
})

router.post('/usuario', async (req, res) => {
  const params = req.body
  const respuesta = await guardar(params)
  res.json(respuesta)
})

<<<<<<< HEAD
router.get('/login', async (req, res) => {
  const params = req.body
  const respuesta = await login(params)
  res.json(respuesta)
})

=======
>>>>>>> cf14752f2bf7fb106c58032602d31c06e0f70f61
router.put('/usuario', async (req, res) => {
  const params = req.body
  const respuesta = await modificar(params)
  res.json(respuesta)
})

module.exports = router