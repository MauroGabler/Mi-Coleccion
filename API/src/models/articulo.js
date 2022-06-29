const { cargar_consulta } = require('../helpers/funciones')

const consultar = async (params) => {

  let where = ''
  let int_id_art 

  if (params?.int_id_art) {
    int_id_art = params.int_id_art
    where += `WHERE int_id_art = ${int_id_art}`
  }

  let sel = `SELECT
            a.int_id_art, a.var_nom_art, a.venta_int_id_venta
            FROM articulo a
            ${where}`

  const res = await cargar_consulta(sel)

  return res
}

const guardar = async (params) => {

  let respuesta = {}
  respuesta['mensaje'] = 'Se ha guardado un artículo'
   
  let var_nom_art = params?.var_nom_art
  let venta_int_id_venta = params?.venta_int_id_venta

  if (var_nom_art == undefined) {
    return respuesta['mensaje'] = 'No ha enviado el nombre del artículo'
  } 

  if (venta_int_id_venta == undefined) {
    return respuesta['mensaje'] = 'No ha enviado el código de venta asociado al artículo'
  }

  const sel = `SELECT COUNT(int_id_art)
              FROM articulo`
  const id = cargar_consulta(sel)

  const ins = `INSERT INTO articulos
               (int_id_art, var_nom_art, venta_int_id_venta)
               VALUES
               (${id}, ${var_nom_art}, ${venta_int_id_venta})`
  cargar_consulta(ins)

  return respuesta
}

const modificar = async (params) => {

  let respuesta = {}
  respuesta['bool_error'] = 0
  // let set = ''

  let int_id_art, var_nom_art

  params?.int_id_art ? (int_id_art = params.int_id_art) : (respuesta.bool_error = 1)
  params?.var_nom_art ? (var_nom_art = params.var_nom_art) : (respuesta.bool_error = 1)
  // params?.venta_int_id_venta ? (venta_int_id_venta = params.venta_int_id_venta) : (respuesta.bool_error = 1)

  if (respuesta.bool_error == 0) {

    let upd = `UPDATE articulo
               SET
               (var_nom_art = ${var_nom_art})
               WHERE int_id_art = ${int_id_art}`
    cargar_consulta(upd)

    respuesta['mensaje'] = 'Se ha modificado el artículo'
  }

  return respuesta
}

module.exports = {
  consultar,
  guardar,
  modificar
}
