<<<<<<< HEAD
/* eslint-disable linebreak-style */
const { Router } = require('express')
const { consultar, guardar, modificar } = require('../models/articulo')
=======
const { Router } = require('express')
const { consultar, guardar } = require('../models/articulo')
>>>>>>> cf14752f2bf7fb106c58032602d31c06e0f70f61

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
<<<<<<< HEAD

router.put('/articulo', async (req, res) => {
  const parametros = req.body
  const respuesta = await modificar(parametros)
  res.json(respuesta)
})
    
=======
  
>>>>>>> cf14752f2bf7fb106c58032602d31c06e0f70f61
module.exports = router