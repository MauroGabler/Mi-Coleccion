/* eslint-disable linebreak-style */

const { cargar_consulta } = require('../helpers/funciones')

const consultar = async (params) => {

  let respuesta = {}
  let where = ''

  if (params.var_user) {
    let var_user = params['var_user']
    where += `WHERE u.var_user = '${var_user}'`
  }

  let consulta = 
    `SELECT 
    u.int_id_usu, u.nro_rut_usu, u.var_prim_nombre, u.var_seg_nombre, u.var_ape_paterno,
    u.var_ape_materno, u.var_mail_usu, u.var_user, u.fecha_creacion, u.var_desc_user,
    u.bool_activa, u.bool_admin, 
      (SELECT COUNT(*)
      FROM seguidor s
      WHERE s.int_id_seguido = u.int_id_usu) as seguidores,
      (SELECT COUNT(*)
      FROM seguidor s
      WHERE s.int_id_seguidor = u.int_id_usu) as seguidos
    FROM usuario u
    ${where}`

  respuesta.usuarios = await cargar_consulta(consulta)

  return respuesta
}

const consultarNombreDisponible = async (params) => {
  const var_user = params.var_user

  const consulta = `SELECT
                    COUNT(var_user) as cuenta
                    FROM usuario
                    WHERE var_user = '${var_user}'`
  const res = await cargar_consulta(consulta)

  return res[0].CUENTA === 1 ? true : false
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

  if (respuesta.bool_error == 0) {

    let sel = `SELECT COUNT(int_id_usu) as ID
             FROM usuario`
    let id = await cargar_consulta(sel)
    console.log(id);
    id = id[0].ID + 1

    let ins = `INSERT INTO usuario
             (INT_ID_USU, NRO_RUT_USU, VAR_PRIM_NOMBRE, VAR_APE_PATERNO, 
              VAR_APE_MATERNO, VAR_MAIL_USU, VAR_USER, fecha_creacion, VAR_PASS, BOOL_ACTIVA, BOOL_ADMIN
              )
             VALUES
             ('${id}', '${nro_rut_usu}', '${var_prim_nombre}', '${var_ape_paterno}', 
             '${var_ape_materno}', '${var_mail_usu}', '${var_user}', SYSDATE, '${var_pass}', '1','0'
             )`

    const res = await cargar_consulta(ins)

    res === 0 ? (respuesta['mensaje'] = 'Se ha guardado un nuevo usuario') : (respuesta['mensaje'] = 'No se han insertado datos')
  }

  return respuesta
}

const login = async (params) => {

  try {
    let respuesta = {}
    let bool_error = 0
    params?.usuario ?? (bool_error = 1)
    params?.contrasena ?? (bool_error = 1)

    bool_error == 1 && (respuesta.mensaje = 'Usuario y/o contraseña incorrecto')

    if (!bool_error) {
      let sel = `SELECT COUNT(*) as u
              FROM usuario
              WHERE var_user = '${params.usuario}'
              AND var_pass = '${params.contrasena}'`
      const res = await cargar_consulta(sel)

      res[0].U == 1 ? respuesta.logueado = true : respuesta.mensaje = 'El usuario ingresado no existe'
    }

    return respuesta
  }
  catch (e) {
    console.log(e)
  }
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
  consultarNombreDisponible,
  guardar,
  login,
  modificar
}
