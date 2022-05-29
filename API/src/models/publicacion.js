const { cargar_consulta } = require('../helpers/funciones')

const consultar = async (params) => {

  let where = ''
  let int_id_publi 

  if (params?.int_id_publi) {
    int_id_publi = params.int_id_publi
    where += `WHERE int_id_publi = ${int_id_publi}`
  }

  let sel = `SELECT
            int_id_publi, var_titulo_publi, var_des_publi, img_publi, fecha_publi,
            bool_evento, bool_discusion, bool_venta, BOOL_COLECC, bool_activa,
            usuario_int_id_usu, cat_col_int_id_cat_colecc
            FROM publicacion
            ${where}`

  const res = await cargar_consulta(sel)

  return res
}

//rescatar publicaciones de usuario 
const publicacionxusuario = async (params) => {

  let respuesta = {}
  let where = '' 

  if (params.USUARIO_INT_ID_USU) {
    let USUARIO_INT_ID_USU = params['USUARIO_INT_ID_USU']
    where += `WHERE USUARIO_INT_ID_USU = ${USUARIO_INT_ID_USU}`

  }
  
  let consulta = `SELECT *
            FROM publicacion
            ${where}`
  respuesta ['publicaciones'] =  await cargar_consulta(consulta)
  return respuesta
}



const guardar = async (params) => {

  let respuesta = {}
  let into = ''
  let values = ''
  let bool_error

  if (!params?.var_titulo_publi) {
    bool_error = 1
    return respuesta['mensaje'] = 'No ha enviado el nombre del artículo'
  }

  if (!params?.usuario_int_id_usu) {
    bool_error = 1
    return respuesta['mensaje'] = 'No ha enviado el usuario asociado a la publicación'
  }

  if (!params?.img_publi) {
    bool_error = 1
    return respuesta['mensaje'] = 'No ha enviado una imagen'
  }

  if (!params?.cat_col_int_id_cat_colecc) {
    bool_error = 1
    return respuesta['mensaje'] = 'No ha enviado la categoria asociada a la publicación'
  }

  if (!params?.bool_evento || !params?.bool_discusion || !params?.bool_venta || !params?.bool_coleccion) {
    bool_error = 1
    return respuesta['mensaje'] = 'No ha enviado el tipo de publicación'
  } else {
    params?.bool_evento && ((into += ', bool_evento') (values += `, ${params.bool_evento}`))
    params?.bool_discusion && ((into += ', bool_discusion') (values += `, ${params.bool_discusion}`))
    params?.bool_venta && ((into += ', bool_venta') (values += `, ${params.bool_venta}`))
    params?.bool_coleccion && ((into += ', bool_coleccion') (values += `, ${params.bool_coleccion}`))
  }

  if (!bool_error) {

    const sel = `SELECT MAX(int_id_publi) + 1
                FROM publicacion`
    const id = cargar_consulta(sel)
  
    const ins = `INSERT INTO publicacion
                 (int_id_publi, var_nom_art, var_des_publi, img_publi, fecha_publi, usuario_int_id_usu, cat_col_int_id_cat_colecc 
                  ${into})
                 VALUES
                 (${id}, ${params.var_nom_art}, ${params.venta_int_id_venta}, ${params.img_publi}, SYSDATE, ${params.usuario_int_id_usu}, ${params.cat_col_int_id_cat_colecc} 
                  ${values})`
  
    cargar_consulta(ins)

    respuesta.mensaje = 'Se ha guardado la publicación'
  }

  return respuesta
}

const modificar = async (params) => {

  let respuesta = {}
  respuesta.bool_error = 0
  let set = ''
  let int_id_publi

  params?.int_id_publi ? (int_id_publi = params.int_id_publi) : (respuesta.bool_error = 1)

  if (params?.var_titulo_publi) {
    set += `var_titulo_publi = ${params.var_titulo_publi}`
  }

  if (params?.var_des_publi) {
    set += `var_des_publi = ${params.var_des_publi}`
  }

  if (params?.img_publi) {
    set += `img_publi = ${params.img_publi}`
  }

  if (respuesta.bool_error == 0) {

    let upd = `UPDATE publicacion
               SET
               (${set})
               WHERE int_id_publi = ${int_id_publi}`
    cargar_consulta(upd)

    respuesta['mensaje'] = 'Se ha modificado la publicación'
  }

  return respuesta
}

module.exports = {
  consultar,
  guardar,
  modificar,
  publicacionxusuario
}