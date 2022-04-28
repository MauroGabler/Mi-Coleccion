import express from 'express'
import oracledb from 'oracledb'
import usuariosRoutes from './routes/usuarios'

const app = express()
var password = '<PASSWORD>';

app.use(express.json())

const PORT = 3000

app.get('/pin', (_req, res) => {
    console.log('alguien hizo ping');
    res.send('pong')
})

app.use('/api/usuarios', usuariosRoutes)

app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT} el ${new Date().toLocaleString()}`);
})

async function connect() {
    const connection = await oracledb.getConnection({
        user: "hr",
        password: password,
        connectString: "localhost:1521/xepdb1"
    })
}
