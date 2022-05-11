const { cargar_consulta } = require('../helpers/funciones')

const consultar = async (params) => {

  let respuesta = {}
  respuesta['comentarios'] = {}
  let filtro = ''
  let where = 'WHERE'
  
  if (params.var_coment_desc) {
    let var_coment_desc = params['var_coment_desc']
    filtro += where + ` var_coment_desc = ${var_coment_desc}`
  }

  let sel = `SELECT
            int_id_cat_coleccion, var_nom_cat, bool_activa
            FROM categoria_coleccion
            ${filtro}`

  const res = await cargar_consulta(sel)

  res.forEach(c => {

    let comentario = {}

    comentario['int_id_art'] = c[0]
    comentario['var_nom_art'] = c[1]
    comentario['venta_int_id_venta'] = c[2]

    respuesta.comentario.push(comentario)
  })

  return respuesta
}

const guardar = async (params) => {

  let respuesta = {}
  respuesta['mensaje'] = 'Se ha guardado el comentario'
   
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

module.exports = {
  consultar,
  guardar
}