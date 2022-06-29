const { cargar_consulta } = require('../helpers/funciones')

const consultar = async (params) => {

  let where = ''
  let INT_ID_PUBLI

  if (params?.INT_ID_PUBLI) {
    INT_ID_PUBLI = params.INT_ID_PUBLI
    where += `WHERE INT_ID_PUBLI = ${INT_ID_PUBLI}`
  }

  let sel = `SELECT 
            p.int_id_publi, p.var_titulo_publi, p.var_des_publi, p.fecha_publi, p.usuario_int_id_usu, 
            p.cat_col_int_id_cat_colecc, p.img_publi, p.img_publi2, p.img_publi3, p.bool_evento, 
            p.bool_discusion, p.bool_venta, p.bool_colecc, u.var_user, 
              (SELECT COUNT(*)
              FROM likes l
              WHERE l.publicacion_int_id_publi = p.int_id_publi) AS megusta
            FROM publicacion p
            JOIN usuario u ON p.usuario_int_id_usu = u.int_id_usu
            ${where}`

  const res = await cargar_consulta(sel)

  return res
}

//rescatar publicaciones de usuario 
const publicacionxusuario = async (params) => {

  let respuesta = {}
  let where = 'WHERE '
  let and = ''

  if (params.USUARIO_INT_ID_USU) {
    let USUARIO_INT_ID_USU = params['USUARIO_INT_ID_USU']
    where += ` ${and} USUARIO_INT_ID_USU = ${USUARIO_INT_ID_USU} `
    and = 'AND'
  }

  if (params.CAT_COL_INT_ID_CAT_COLECC) {
    let CAT_COL_INT_ID_CAT_COLECC = params['CAT_COL_INT_ID_CAT_COLECC']
    where += `${and} CAT_COL_INT_ID_CAT_COLECC = ${CAT_COL_INT_ID_CAT_COLECC}`
  }

  let consulta = 
    `SELECT
    p.int_id_publi, p.var_titulo_publi, p.var_des_publi, p.fecha_publi, p.usuario_int_id_usu,
    p.cat_col_int_id_cat_colecc, p.img_publi, p.img_publi2, p.img_publi3, p.bool_evento,
    p.bool_discusion, p.bool_venta, p.bool_colecc,
      (SELECT COUNT(*)
      FROM likes l
      WHERE l.publicacion_int_id_publi = p.int_id_publi) AS megusta
    FROM publicacion p
    ${where}`

  respuesta['publicaciones'] = await cargar_consulta(consulta)
  return respuesta
}
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Rescatar publicaciones x categorias
  const publicacionxcategoria = async (params) => {
    let respuesta = {};
    let where = '';

    if (params.CAT_COL_INT_ID_CAT_COLECC) {
      let CAT_COL_INT_ID_CAT_COLECC = params['CAT_COL_INT_ID_CAT_COLECC']
      where += `WHERE CAT_COL_INT_ID_CAT_COLECC = ${CAT_COL_INT_ID_CAT_COLECC}`
    }

    let consulta = `SELECT *
                    FROM publicacion
                    ${where}`
                    console.log(consulta);
    respuesta['publicaciones'] = await cargar_consulta(consulta)
    return respuesta;

  }

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


const guardar = async (params) => {

  let respuesta = {}
  let into = ''
  let values = ''
  let bool_error = false
  let img_publi = params.IMG_PUBLI;
  let img_publi2 = params.IMG_PUBLI2;
  let img_publi3 = params.IMG_PUBLI3;

  if (!params?.var_titulo_publi) {
    bool_error = true
    respuesta.mensaje = 'No ha enviado el nombre del artículo'
    return respuesta
  }

  if (!params?.usuario_int_id_usu) {
    bool_error = true
    respuesta.mensaje = 'No ha enviado el usuario asociado a la publicación'
    return respuesta
  }

  if (!params?.cat_col_int_id_cat_colecc) {
    bool_error = true
    respuesta.mensaje = 'No ha enviado la categoria asociada a la publicación'
    return respuesta
  }

  if (params?.bool_evento == undefined && params?.bool_discusion == undefined && params?.bool_venta == undefined && params?.bool_coleccion == undefined) {
    bool_error = true
    respuesta.mensaje = 'No ha enviado el tipo de publicación'
    return respuesta
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

  //   if (params?.img_publi1 != undefined) {
  //     into += ', img_publi1'
  //     values += `, ${params.img_publi1}`
  //   }

  //   if (params?.img_publi2 != undefined) {
  //     into += ', img_publi2'
  //     values += `, ${params.img_publi2}`
  //   }

  //   if (params?.img_publi3 != undefined) {
  //     into += ', img_publi3'
  //     values += `, ${params.img_publi3}`
  //   }
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
  publicacionxusuario,
  publicacionxcategoria
}