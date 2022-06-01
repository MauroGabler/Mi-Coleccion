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
  respuesta['publicaciones'] = await cargar_consulta(consulta)
  return respuesta
}

const guardar = async (params) => {
  console.log(params)
  let respuesta = {}
  let into = ''
  let values = ''
  let bool_error = false
  let img_publi = params.IMG_PUBLI;
  let img_publi2 = params.IMG_PUBLI2;
  let img_publi3 = params.IMG_PUBLI3;

  if (!params?.var_titulo_publi) {
    bool_error = true
    return respuesta.mensaje = 'No ha enviado el nombre del artículo'
  }

  if (!params?.usuario_int_id_usu) {
    bool_error = true
    return respuesta.mensaje = 'No ha enviado el usuario asociado a la publicación'
  }

  if (!params?.cat_col_int_id_cat_colecc) {
    bool_error = true
    return respuesta.mensaje = 'No ha enviado la categoria asociada a la publicación'
  }

  if (params?.bool_evento == undefined && params?.bool_discusion == undefined && params?.bool_venta == undefined && params?.bool_coleccion == undefined) {
    bool_error = true
    return respuesta.mensaje = 'No ha enviado el tipo de publicación'
  } else {

    if (params?.bool_evento != undefined) {
      into += ', bool_evento'
      values += `, ${params.bool_evento}`
    }

    if (params?.bool_discusion != undefined) {
      into += ', bool_discusion'
      values += `, ${params.bool_discusion}`
    }

    if (params?.bool_venta != undefined) {
      into += ', bool_venta'
      values += `, ${params.bool_venta}`
    }

    if (params?.bool_coleccion != undefined) {
      into += ', bool_colecc'
      values += `, ${params.bool_coleccion}`
    }

    // if (params?.img_publi != undefined) {
    //   into += ', img_publi'
    //   values += `, ${params.img_publi}`
    // }

    // if (params?.img_publi2 != undefined) {
    //   into += ', img_publi2'
    //   values += `, ${params.img_publi2}`
    // }

    // if (params?.img_publi3 != undefined) {
    //   into += ', img_publi3'
    //   values += `, ${params.img_publi3}`
    // }
  }

  if (!bool_error) {

    const sel = `SELECT MAX(int_id_publi) + 1 as ID
                FROM publicacion`
    const res = await cargar_consulta(sel)

    const id = res[0].ID

    const ins = `INSERT INTO publicacion
                 (int_id_publi, var_titulo_publi, var_des_publi, fecha_publi, usuario_int_id_usu, cat_col_int_id_cat_colecc,img_publi,img_publi2,img_publi3
                  ${into})
                 VALUES
                 (${id}, '${params.var_titulo_publi}', '${params.var_des_publi}', SYSDATE, ${params.usuario_int_id_usu}, ${params.cat_col_int_id_cat_colecc}, '${img_publi}', '${img_publi2}','${img_publi3}'
                  ${values})`

    console.log(ins)
    // console.log()
    await cargar_consulta(ins)

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