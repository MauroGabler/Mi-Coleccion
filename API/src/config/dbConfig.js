const oracledb = require('oracledb')

const password = 'oracle'
const password2 = 'admin'

const conectar = () => {

  return new Promise((resolve, reject) => {

    resolve(oracledb.getConnection({
      user: 'MI_COLECCION',
      password: "password2",
      connectString: 'localhost:1521/xe'
    }))

    reject(1)
  })
}

module.exports = {
  conectar
}