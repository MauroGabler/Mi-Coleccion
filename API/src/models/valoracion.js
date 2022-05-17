const { cargar_consulta } = require('../helpers/funciones')

const consultar = async (params) => {

  let where

  if (params?.int_id_valo) {
    where = `WHERE int_id_valo = ${params.int_id_valo}`
  }

  const sel = `SELECT
              int_id_valo, nro_estrellas_valo, usuario_int_id_usu
              FROM valoracion
              ${where}`
  const res = await cargar_consulta(sel)

  return res
}

const guardar = async (params) => {

  let respuesta
  let bool_error = 0
  
  if (params?.usuario_int_id_usu) {
    bool_error = 1
    respuesta.mensaje = 'No ha enviado al usuario '
  }

  if (!bool_error) {

    const sel = `SELECT MAX(int_id_valo) + 1
                FROM valoracion`
    const id = await cargar_consulta(sel)
  
    const ins = `INSERT INTO valoracion
                (int_id_valo, usuario_int_id_usu)
                VALUES (${id}, ${params.usuario_int_id_usu}) `
    await cargar_consulta(ins)
  
    respuesta.mensaje = 'Se ha guardado la valoración'
  }

  return respuesta
}

module.exports = {
  consultar,
  guardar,
}