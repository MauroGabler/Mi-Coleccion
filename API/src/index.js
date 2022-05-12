const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use('/API', require('./routes/articulo.js'))
app.use('/API', require('./routes/categoria.js'))
app.use('/API', require('./routes/comentario.js'))
app.use('/API', require('./routes/like.js'))
app.use('/API', require('./routes/publicacion.js'))
app.use('/API', require('./routes/reporte.js'))
app.use('/API', require('./routes/seguidor.js'))
app.use('/API', require('./routes/usuario.js'))
app.use('/API', require('./routes/valoracion.js'))
app.use('/API', require('./routes/venta.js'))

app.listen(port, () => console.log('API REST Oracle escuchando en el puerto %s!', port))