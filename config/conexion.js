const sql = require("mssql");
const { fecha } = require("../extras/fecha");
// let sqlConfig = require("./credenciales");
let sqlConfig = {}

sqlConfig = require("./credenciales").mssql;
  // sqlConfig = require("./credenciales");


  const sqlConn = new sql.ConnectionPool(sqlConfig, (err) => {
    let date = new Date()
    if (err) {
      console.log(err)
      console.log('No se pudo conectar a la BD, reintentando...', date);
      connectSQL();
    } else {
      console.log('Conectado a la BD', date);
    }
  })

  const connectSQL = () => {
    sqlConn.connect()
      .then(() => {
        console.log('Conectado a la BD');
      })
      .catch((err) => {
        if (err) {
          let date = new Date();
          console.log('No se pudo conectar a la BD, reintentando...', date, err);
          setTimeout(() => {
            connectSQL();
          }, 2500)
        } 
      })
  }
  
const sqlFormatoRespuesta = (resultado) => {
	try {
		if (resultado.recordsets.length > 1) {
			return { estatus: 'OK', datos: resultado.recordsets }
		}

		if (!resultado.recordset) {
			return { estatus: 'OK', datos: [] }
		}

		return { estatus: 'OK', datos: resultado.recordset }
	} catch (err) {
		return { estatus: 'ERROR' }
	}
}

module.exports = {
  sqlConn,
  sql,
  sqlFormatoRespuesta

};