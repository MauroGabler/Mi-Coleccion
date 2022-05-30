const oracledb = require('oracledb')
const mauro = 'password2'
const password = 'oracle'
 var password2 = 'admin'

const conectar = () => {

  return new Promise((resolve, reject) => {

    resolve(oracledb.getConnection({
      user: 'MI_COLECCION',
      password: mauro,
      connectString: 'localhost:1521/xe'
    }))

    reject(1)
  })
}

module.exports = {
  conectar
}