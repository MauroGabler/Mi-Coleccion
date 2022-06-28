/* eslint-disable linebreak-style */

const { Router } = require('express')
const { consultar, guardar, modificar, publicacionxusuario,publicacionxcategoria } = require('../models/publicacion')

const router = Router()


router.get('/publicaciones', async (req, res) => {
  //const params = req.body
  const respuesta = await consultar()
  res.json(respuesta)
})


router.post('/consultarPublicacion', async (req, res) => {
  const params = req.body
  const respuesta = await consultar(params)
  res.json(respuesta)
})

router.post('/publicacionxusuario', async (req, res) => {
  const params = req.body
  const respuesta = await publicacionxusuario(params)
  res.json(respuesta)
})

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.post('/publicacionxcategoria', async (req, res) => {
  const params = req.body
  const respuesta = await publicacionxcategoria(params)
  res.json(respuesta)
});

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


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
