const { cargar_consulta } = require('../helpers/funciones')

const consultar = async (params) => {

  let respuesta = {}
  respuesta['comentarios'] = {}
  let filtro = ''
  let where = 'WHERE'
  
  if (params.PUBLICACION_INT_ID_PUBLI) {
    let PUBLICACION_INT_ID_PUBLI = params['PUBLICACION_INT_ID_PUBLI']
    filtro += where + ` PUBLICACION_INT_ID_PUBLI = ${PUBLICACION_INT_ID_PUBLI}`
  }

  let sel = 
    `SELECT
    C.INT_ID_COMENT, C.VAR_COMENT_DESC, C.BOOL_ACTIVA, C.PUBLICACION_INT_ID_PUBLI, U.VAR_USER,
      (SELECT COUNT(*) 
      FROM LIKES L 
      WHERE L.COMENTARIO_INT_ID_COMENT = C.INT_ID_COMENT) AS LIKES
    FROM comentario C
    JOIN usuario U on (C.USUARIO_INT_ID_USU = U.INT_ID_USU)
    ${filtro}`

  const res = await cargar_consulta(sel)
  return res
}

const guardar = async (params) => {
  let respuesta = {}
  respuesta['mensaje'] = 'Se ha guardado el comentario'

  //let var_nom_cat = params?.var_nom_cat

    let coment_desc = params.VAR_COMENT_DESC;
    let userId = params.USUARIO_INT_ID_USU;
    let publiId = params.PUBLICACION_INT_ID_PUBLI;
    let bolActiva = '1'

    if (coment_desc == undefined) {
      return respuesta['mensaje'] = 'No ha guardado comentario'
    }
 
  const sel = `SELECT COUNT(INT_ID_COMENT)+1 as id
              FROM COMENTARIO`
  const rest = await cargar_consulta(sel)
  const id = rest[0].ID

  const ins = `INSERT INTO COMENTARIO
               (INT_ID_COMENT, VAR_COMENT_DESC, USUARIO_INT_ID_USU, PUBLICACION_INT_ID_PUBLI, BOOL_ACTIVA)
               VALUES
               (${id}, '${coment_desc}',  ${userId}, ${publiId}, ${bolActiva})`
  
  await cargar_consulta(ins)
  return respuesta
}

module.exports = {
  consultar,
  guardar
}