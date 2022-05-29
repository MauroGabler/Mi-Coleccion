const { cargar_consulta } = require('../helpers/funciones')

const consultar = async (params) => {

  let where

  if (params?.int_id_venta) {
    where = `WHERE int_id_venta = ${params.int_id_venta}`
  }

  const sel = `SELECT
              int_id_venta, nro_precio, bool_ofertar, nro_precio_oferta_min, bool_subasta,
              nro_precio_compra_ya, publicacion_int_id_publi
              FROM venta
              ${where}`
  const res = await cargar_consulta(sel)

  return res
}

const guardar = async (params) => {

  /*
  modificación a la tabla venta para que esta consulta funcione:

  ALTER TABLE VENTA  
  MODIFY (BOOL_OFERTAR DEFAULT 0 );

  ALTER TABLE VENTA  
  MODIFY (BOOL_SUBASTA DEFAULT 0 );
  */

  let respuesta = {}
  let bool_error = false
  let into = ''
  let values = ''

  if (params?.publicacion_int_id_publi) {
    bool_error = true
    respuesta.mensaje = 'No ha enviado la ID de la publicación'
  }

  if (params?.nro_precio) {
    bool_error = true
    respuesta.mensaje = 'No ha enviado el precio'
  }

  if (!bool_error) {

    if (params?.bool_ofertar != undefined) {
      into += ', bool_ofertar'
      values += `, ${params.bool_ofertar}`
    }

    if (params?.nro_precio_oferta_min != undefined) {
      into += ', nro_precio_oferta_min'
      values += `, ${params.nro_precio_oferta_min}`
    }

    if (params?.bool_subasta != undefined) {
      into += ', bool_subasta'
      values += `, ${params.bool_subasta}`
    }

    if (params?.nro_precio_compra_ya != undefined) {
      into += ', nro_precio_compra_ya'
      values += `, ${params.nro_precio_compra_ya}`
    }

    if (params?.nro_precio != undefined) {
      into += ', bool_ofertar'
      values += `, ${params.bool_ofertar}`
    }

    const sel = `SELECT MAX(int_id_venta) + 1 as id
                FROM valoracion`
    const res = await cargar_consulta(sel)
    const id = res[0].ID

    const ins = `INSERT INTO venta
                (int_id_venta, nro_precio, publicacion_int_id_publi
                ${into})
                VALUES 
                (${id}, ${params.nro_precio}, ${params.publicacion_int_id_publi}
                ${values}) `
    await cargar_consulta(ins)

    console.log(ins)

    respuesta.mensaje = 'Se ha guardado la publicación de venta'
  }

  return respuesta
}

const modificar = async (params) => {

  let respuesta = {}
  let bool_error = false
  let set = ''
  let int_id_venta

  params?.int_id_venta ? (int_id_venta = params.int_id_venta) : (respuesta.bool_error = true)

  if (bool_error) {

    if (params?.nro_precio != undefined) {
      set += `nro_precio = ${params.nro_precio}`
    }

    if (params?.bool_ofertar != undefined) {
      set += `, bool_ofertar = ${params.bool_ofertar}`
    }

    if (params?.nro_precio_oferta_min != undefined) {
      set += `, nro_precio_oferta_min = ${params.nro_precio_oferta_min}`
    }

    if (params?.bool_subasta != undefined) {
      set += `, bool_subasta = ${params.bool_subasta}`
    }

    if (params?.nro_precio_compra_ya != undefined) {
      set += `, nro_precio_compra_ya = ${params.nro_precio_compra_ya}`
    }

    if (params?.nro_precio != undefined) {
      set += `, bool_ofertar = ${params.bool_ofertar}`
    }

    let upd = `UPDATE publicacion
              SET
              (${set})
              WHERE int_id_venta = ${int_id_venta}`
    cargar_consulta(upd)

    respuesta['mensaje'] = 'Se ha modificado la publicación'
  }

  return respuesta
}

module.exports = {
  consultar,
  guardar,
  modificar
}