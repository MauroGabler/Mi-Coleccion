const { cargar_consulta } = require('../helpers/funciones')

const consultar = async (params) => {

  let respuesta = {}
  respuesta['likes'] = {}
  let filtro = ''
  let where = 'WHERE'

  if (params.int_id_like) {
    let int_id_like = params.int_id_like
    filtro += where + ` int_id_like = ${int_id_like}`
  }

  if (params.int_id_usu) {
    let int_id_usu = params.int_id_usu
    filtro += where + ` usuario_int_id_usu = ${int_id_usu}`
  }

  if (params.int_id_publi) {
    let int_id_publi = params.int_id_publi
    filtro += where + ` publicacion_int_id_publi = ${int_id_publi}`
  }

  let sel = `SELECT
            int_id_like, nro_cantidad, usuario_int_id_usu, comentario_int_id_coment, publicacion_int_id_publi
            FROM like
            ${filtro}`

  return await cargar_consulta(sel)
}

// const meGusta = async (params)=> {
//   if (params?.int_id_publicacion != null) {

//     const int_id_publi = params.int_id_publi
  
//     let upd = 
//       `UPDATE publicacion
//       SET
//       int_megusta = (int_megusta + 1)
//       WHERE int_id_publi = ${int_id_publi}`
  
//     await cargar_consulta(upd)
//   }
// }

const meGusta = async (params) => {

  let respuesta = {}
  let bool_nuevo = 1
  let bool_error = 0
  let id = params?.int_id_usu
  let into = ''
  let values = ''
  let where = 'WHERE'

  id && (bool_nuevo = 0)

  if (bool_nuevo) {

    let usuario_int_id_usu = params?.usuario_int_id_usu

    if (usuario_int_id_usu === undefined) {
      bool_error = 1
      return respuesta['mensaje'] = 'No ha enviado la ID del usuario'
    }

    if (params?.comentario_int_id_coment !== undefined) {
      into += ', comentario_int_id_coment '
      values += `, ${params.comentario_int_id_coment} `
    }

    if (params?.publicacion_int_id_publi !== undefined) {
      into += ', publicacion_int_id_publi '
      values += `, ${params.publicacion_int_id_publi} `
    }

    if (!bool_error) {

      const sel = 
        `SELECT NVL(MAX(int_id_like), 0) + 1 as ID
        FROM likes`
      id = await cargar_consulta(sel)
      console.log(id);
      id = id[0].ID

      const ins = 
        `INSERT INTO likes
        (int_id_like, nro_cantidad, usuario_int_id_usu ${into})
        VALUES
        (${id}, 1, ${usuario_int_id_usu} ${values})`
      cargar_consulta(ins)
    }
  }

  if (!bool_nuevo) {

    let upd = `
    UPDATE like
    SET
    (nro_cantidad = nro_cantidad + 1)
    WHERE int_id_like = ${id}`
    cargar_consulta(upd)
  }

  respuesta['mensaje'] = '¡Te gusta!'

  return respuesta
}


const noMeGusta = async (params) => {

  let respuesta = {}
  let bool_error
  let id = params?.int_id_usu

  if (id) bool_error = 0
  else {bool_error = 1; respuesta.mensaje = 'No envió la ID del like'}

  if (!bool_error) {

    let upd = `UPDATE like
               SET
               (nro_cantidad = nro_cantidad + 1)
               WHERE int_id_like = ${id}`
    cargar_consulta(upd)

    respuesta['mensaje'] = 'Ya no te gusta'
  }

  return respuesta
}

module.exports = {
  consultar,
  meGusta,
  noMeGusta
}