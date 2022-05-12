const { cargar_consulta } = require('../helpers/funciones')

const consultar = async (params) => {

  let respuesta = {}
  respuesta['usuarios'] = []
  let where = ''

  if (params.int_id_usu) {
    let int_id_usu = params['int_id_usu']
    where += `WHERE int_id_usu = ${int_id_usu}`
  }

  let consulta = `SELECT 
                  int_id_usu, nro_rut_usu, var_prim_nombre, var_seg_nombre, var_ape_paterno,
                  var_ape_materno, var_mail_usu, var_user, fecha_creacion, var_desc_user,
                  bool_activa, bool_admin
                  FROM usuario
                  ${where}`

  return await cargar_consulta(consulta)
}

const guardar = async (params) => {

  let values = ''
  let into = ''
  let respuesta = {}
  respuesta['bool_error'] = 0

  let nro_rut_usu, var_prim_nombre, var_seg_nombre, var_ape_paterno, var_ape_materno, var_mail_usu, var_user, var_pass, var_desc_user

  params?.nro_rut_usu ? (nro_rut_usu = params.nro_rut_usu) : (respuesta['bool_error'] = 1)
  params?.var_prim_nombre ? (var_prim_nombre = params.var_prim_nombre) : (respuesta['bool_error'] = 1)
  params?.var_ape_paterno ? (var_ape_paterno = params.var_ape_paterno) : (respuesta['bool_error'] = 1)
  params?.var_ape_materno ? (var_ape_materno = params.var_ape_materno) : (respuesta['bool_error'] = 1)
  params?.var_mail_usu ? (var_mail_usu = params.var_mail_usu) : (respuesta['bool_error'] = 1)
  params?.var_user ? (var_user = params.var_user) : (respuesta['bool_error'] = 1)
  params?.var_pass ? (var_pass = params.var_pass) : (respuesta['bool_error'] = 1)

  if (params?.var_seg_nombre && params?.var_seg_nombre != ' ') {
    var_seg_nombre = params.var_seg_nombre
    into += ', var_seg_nombre'
    values += `, '${var_seg_nombre}'`
  }

  if (params?.var_desc_user && params?.var_desc_user != ' ') {
    var_desc_user = params.var_desc_user
    into += ', var_desc_user'
    values += `, '${var_desc_user}'`
  }

  if (params.bool_error == 0) {

    let sel = `SELECT COUNT(int_id_usu) as ID
             FROM usuario`
    let id = await cargar_consulta(sel)
    id = id[0].ID + 1

    let ins = `INSERT INTO usuario
             (int_id_usu, nro_rut_usu, var_prim_nombre, var_ape_paterno, 
              var_ape_materno, var_mail_usu, var_user, fecha_creacion, var_pass 
              ${into})
             VALUES
             (${id}, '${nro_rut_usu}', '${var_prim_nombre}', '${var_ape_paterno}', 
             '${var_ape_materno}', '${var_mail_usu}', '${var_user}', SYSDATE, '${var_pass}' 
             ${values})`
    const res = await cargar_consulta(ins)

    res === 0 ? (respuesta['mensaje'] = 'Se ha guardado un nuevo usuario') : (respuesta['mensaje'] = 'No se han insertado datos')
  }

  return respuesta
}

const modificar = async (params) => {

  let respuesta = {}
  respuesta['bool_error'] = 0
  let set = ''

  let nro_rut_usu, var_prim_nombre, var_seg_nombre, var_ape_paterno, var_ape_materno, var_mail_usu, var_user, var_pass, var_desc_user, bool_activa, bool_admin

  params?.nro_rut_usu ? (nro_rut_usu = params.nro_rut_usu) : (respuesta['bool_error'] = 1)
  params?.var_prim_nombre ? (var_prim_nombre = params.var_prim_nombre) : (respuesta['bool_error'] = 1)
  params?.var_ape_paterno ? (var_ape_paterno = params.var_ape_paterno) : (respuesta['bool_error'] = 1)
  params?.var_ape_materno ? (var_ape_materno = params.var_ape_materno) : (respuesta['bool_error'] = 1)
  params?.var_mail_usu ? (var_mail_usu = params.var_mail_usu) : (respuesta['bool_error'] = 1)
  params?.var_user ? (var_user = params.var_user) : (respuesta['bool_error'] = 1)
  params?.var_pass ? (var_pass = params.var_pass) : (respuesta['bool_error'] = 1)

  if (params?.var_desc_user && params?.var_desc_user != ' ') {
    var_desc_user = params.var_desc_user
    set += `, var_desc_user = ${var_desc_user}`
  }

  if (params?.bool_activa) {
    bool_activa = params.bool_activa
    set += `, bool_activa = ${bool_activa}`
  }

  if (params?.bool_admin) {
    bool_admin = params.bool_admin
    set += `, bool_activa = ${bool_admin}`
  }

  if (respuesta['bool_error'] == 0) {

    let upd = `UPDATE usuario
               SET var_prim_nombre = ${var_prim_nombre}, var_seg_nombre = ${var_seg_nombre}, var_ape_paterno = ${var_ape_paterno},
               var_ape_materno = ${var_ape_materno}, var_mail_usu = ${var_mail_usu}, var_user = ${var_user}, var_pass = ${var_pass} ${set}
               WHERE nro_rut_usu = ${nro_rut_usu}`
    await cargar_consulta(upd)

    respuesta['mensaje'] = 'Se ha modificado al usuario'
  }

  return respuesta
}

module.exports = {
  consultar,
  guardar,
  modificar
}