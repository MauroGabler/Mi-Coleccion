const oracledb = require('oracledb')

const password = 'oracle'
// const password = 'admin'
// const connectString = 'localhost:1521/XE'

// seteo para mac
oracledb.initOracleClient({libDir: '/Applications/InstantClientOracle'});
const connectString = 'localhost:32118/XE'

const conectar = () => {

  return new Promise((resolve, reject) => {

    resolve(oracledb.getConnection({
      user: 'MI_COLECCION',
      password,
      connectString
    }))

    reject(1)
  })
}

module.exports = {
  conectar
}