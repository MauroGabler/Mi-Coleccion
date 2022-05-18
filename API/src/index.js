<<<<<<< HEAD
/* eslint-disable linebreak-style */
=======
>>>>>>> cf14752f2bf7fb106c58032602d31c06e0f70f61
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
<<<<<<< HEAD
// app.use('/API', require('./routes/reporte.js'))
app.use('/API', require('./routes/seguidor.js'))
app.use('/API', require('./routes/usuario.js'))
app.use('/API', require('./routes/valoracion.js'))
// app.use('/API', require('./routes/venta.js'))
=======
app.use('/API', require('./routes/reporte.js'))
app.use('/API', require('./routes/seguidor.js'))
app.use('/API', require('./routes/usuario.js'))
app.use('/API', require('./routes/valoracion.js'))
app.use('/API', require('./routes/venta.js'))
>>>>>>> cf14752f2bf7fb106c58032602d31c06e0f70f61

app.listen(port, () => console.log('API REST Oracle escuchando en el puerto %s!', port))