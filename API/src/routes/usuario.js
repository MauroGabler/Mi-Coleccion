/* eslint-disable linebreak-style */
const { Router } = require('express')
const { consultar, consultarNombreDisponible, guardar, modificar, login } = require('../models/usuario')

const router = Router()

router.get('/usuario', async (req, res) => {
  const params = req.body
  const respuesta = await consultar(params)
  res.json(respuesta)
})

router.post('/consultarusuario', async (req, res) => {
  const params = req.body
  const respuesta = await consultar(params)
  res.json(respuesta)
})

router.post('/verificarNombreUsuario', async (req, res) => {
  const params = req.body
  const respuesta = await consultarNombreDisponible(params)
  res.json(respuesta)
})

router.post('/usuario', async (req, res) => {
  const params = req.body
  const respuesta = await guardar(params)
  res.json(respuesta)
})

router.post('/login', async (req, res) => {
  const params = req.body
  const respuesta = await login(params)
  res.json(respuesta)
})

router.put('/usuario', async (req, res) => {
  const params = req.body
  const respuesta = await modificar(params)
  res.json(respuesta)
})

module.exports = router
