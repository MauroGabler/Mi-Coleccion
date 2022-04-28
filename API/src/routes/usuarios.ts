import express from 'express'

const router = express.Router()

router.get('/', (_req, res) => {
    res.send('Recuperando usuarios')
})

router.post('/', (_req, res) => {
    res.send('Guardando usuario')
})

export default router    