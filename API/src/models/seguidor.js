const { cargar_consulta } = require('../helpers/funciones')

const seguir = async (params) => {

  let respuesta
  let bool_error = 0
  if (params?.int_id_seguidor) {
    bool_error = 1
    respuesta.mensaje = 'No se ha enviado la ID del seguidor'
  }

  if (params?.int_id_seguido) {
    bool_error = 1
    respuesta.mensaje = 'No se ha enviado la ID del seguido'
  }

  if (!bool_error) {
    const ins = `INSERT INTO seguidor
                (int_id_seguidor, int_id_seguido)
                VALUES
                (${params.int_id_seguidor}, ${params.int_id_seguido})`
    cargar_consulta(ins)
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