const oracledb = require('oracledb')

const password = 'oracle'
const password2 = 'admin'
// seteo para mac
oracledb.initOracleClient({libDir: '/Applications/InstantClientOracle'});

const conectar = () => {

  return new Promise((resolve, reject) => {

    resolve(oracledb.getConnection({
      user: 'MI_COLECCION',
      password,
      connectString: 'localhost:32118/XE'
      // connectString: 'localhost:1521/XE'
    }))

    reject(1)
  })
}

module.exports = {
  conectar
}