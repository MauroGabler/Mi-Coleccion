const { cargar_consulta } = require('../helpers/funciones')

const consultar = async (params) => {

  let respuesta = {}
  respuesta['categoria_coleccion'] = {}
  let where = ''
  
  if (params.int_id_cat_coleccion) {
    let int_id_cat_coleccion = params['int_id_cat_coleccion']
    where += `WHERE int_id_cat_coleccion = ${int_id_cat_coleccion}`
  }

  let sel = `SELECT
            int_id_cat_coleccion, var_nom_cat, bool_activa
            FROM categoria_coleccion
            ${where}`

  respuesta['categoria_coleccion'] = await cargar_consulta(sel)

  return respuesta
}

const guardar = async (params) => {

  let respuesta = {}
  respuesta['mensaje'] = 'Se ha guardado una categoria'
   
  let var_nom_cat = params?.var_nom_cat

  if (var_nom_cat == undefined) {
    return respuesta['mensaje'] = 'No ha enviado el nombre de categoria'
  } 

  const sel = `SELECT COUNT(int_id_cat_colecc)
              FROM categoria_coleccion`
  const id = cargar_consulta(sel)

  const ins = `INSERT INTO categoria_coleccion
               (int_id_cat_colecc, var_nom_cat)
               VALUES
               (${id}, ${var_nom_cat})`
  cargar_consulta(ins)

  return respuesta
}

const modificar = async (params) => {

  let respuesta = {}
  respuesta['bool_error'] = 0
  let set = ''
  let int_id_cat_coleccion, var_nom_cat, bool_activa

  params?.int_id_cat_coleccion ? (int_id_cat_coleccion = params.int_id_cat_coleccion) : (respuesta.bool_error = 1)
  params?.var_nom_cat ? (var_nom_cat = params.var_nom_cat) : (respuesta.bool_error = 1)

  if (params?.bool_activa) {
    bool_activa = params.bool_activa
    set += `, bool_activa = ${bool_activa}`
  }

  if (respuesta.bool_error == 0) {

    let upd = `UPDATE categoria
               SET
               (var_nom_cat = ${var_nom_cat} ${set})
               WHERE int_id_cat_coleccion = ${int_id_cat_coleccion}`
    cargar_consulta(upd)

    respuesta['mensaje'] = 'Se ha modificado la categoría'
  }

  return respuesta
}

module.exports = {
  consultar,
  guardar,
  modificar
}