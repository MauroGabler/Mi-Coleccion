const { cargar_consulta } = require('../helpers/funciones')

const seguir = async (params) => {
  let respuesta = {}
  respuesta.mensaje = ''
  let bool_error = 0
  const bool_seguir = true

  if (params?.INT_ID_SEGUIDOR == undefined) {
    bool_error = 1
    respuesta.mensaje = 'No se ha enviado la ID del seguidor'
  }

  if (params?.INT_ID_SEGUIDO == undefined) {
    bool_error = 1
    respuesta.mensaje = 'No se ha enviado la ID del seguido'
  }

  if (params?.bool_seguir == false) {
    bool_seguir = false
  }

  if (!bool_error) {
    let res
    let id
    const sel =
      `SELECT
      NVL(MAX(int_id_vinculo), 0) + 1 AS int_id_vinculo
      FROM seguidor`
    id = await cargar_consulta(sel)
    id = id[0].INT_ID_VINCULO

    if (bool_seguir) {
      const ins = 
        `INSERT INTO seguidor
        (int_id_vinculo, int_id_seguidor, int_id_seguido, fecha_vinculo)
        VALUES
        (${id}, ${params.INT_ID_SEGUIDOR}, ${params.INT_ID_SEGUIDO}, SYSDATE)`

      respuesta.mensaje = 'Ya sigues a este usuario'
      res = await cargar_consulta(ins)
    } else {
      const ins = 
        `DELETE seguidor
        WHERE int_id_seguidor = ${params.int_id_seguidor}`

      respuesta.mensaje = 'Ya no sigues a este usuario'
      res = await cargar_consulta(ins)
    }
  }

  return respuesta
}

const noSeguir = async (params) => {

  let respuesta
  let bool_error = 0
  
  if (params?.int_id_vinculo) {
    bool_error = 1
    respuesta.mensaje = 'No se ha enviado la ID del vínculo'
  }

  if (!bool_error) {
    const del = `DELETE
                FROM seguidor
                WHERE int_id_vinculo = ${params.int_id_vinculo}`
    cargar_consulta(del)
    respuesta.mensaje = 'Ya no lo sigues'
  }

  return respuesta
}

module.exports = {
  seguir,
  noSeguir
}