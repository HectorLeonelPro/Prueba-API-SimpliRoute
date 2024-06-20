
const { sql, sqlConn, sqlFormatoRespuesta } = require('../config/conexion')


const descarga = {

    insertardatos: async (data) => {
        try {
            let resultado = await sqlConn.request()
                .input('VISITAID', sql.NVarChar, String(data.visitaId))
                .input('TRACKINGID', sql.NVarChar, String(data.trackingId))
                .input('ROUTEID', sql.NVarChar, String(data.routeId))
                .input('REFERENCE', sql.NVarChar, String(data.reference))
                .query(`
                		EXEC 
                        INSERTAR_DATOS_RUTA 
                        @VISITAID, 
                        @TRACKINGID, 
                        @ROUTEID, 
                        @REFERENCE
                		`)
            return sqlFormatoRespuesta(resultado)
        } catch (error) {
            console.log(error)
        }
    },

}

module.exports = {
    descarga
}