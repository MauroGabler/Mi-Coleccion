/* eslint-disable no-unsafe-finally */
const { conectar } = require('../config/dbConfig')
const oracledb = require('oracledb')

/**
 * 
 * @param {String} consulta Recibe la consulta que será hecha a la BD
 * @returns un Array con los resultados de la consulta
 */
const cargar_consulta = async (consulta) => {

  let respuesta
  try {
    var connection = await conectar()

    console.log('conectado a la base de datos')

    var result = await connection.execute(consulta, {}, { autoCommit: true, outFormat: oracledb.OBJECT })
    console.log(result)
  } catch (err) {
    //send error message
    console.error(err.message)
    return
  } finally {

    if (connection) {

      try {
        // Always close connections
        await connection.close()
        console.log('conexión cerrada exitosamente')
      } catch (err) {

        console.error(err.message)
      }
    }
    
    // result.slice(0,3) == 'ORA' && (respuesta = result)
    result?.rowsAffected > 0 && (respuesta = 0) // insert
    result?.rows?.length > 0 && (respuesta = result.rows) // select
    
    return respuesta
  }
}

module.exports = {
  cargar_consulta
}