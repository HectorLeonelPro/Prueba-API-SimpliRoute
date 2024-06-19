
const { sql, sqlConn, sqlFormatoRespuesta } = require('../config/conexion')


const descarga = {

    insertardatos: async (data) => {
        try {
            console.log('hola')

        } catch (error) {
            console.log(error)
        }
    },

    

    // catMetodoPago: async () => {
    // 	try {
    // 		let resultado	= await sqlConn.request()
    // 		.query(`
    // 			SELECT *,
    // 				ID_CMP AS value,
    // 				ID_CMP AS clave,
    // 				NOMBRE_CMP AS label
    // 			FROM CAT_METODO_PAGO_T
    // 			WHERE ACTIVO_CMP = 1
    // 		`)
    //         return sqlFormatoRespuesta(resultado)
    // 	} catch (err) {
    // 		throw err
    // 	}
    // },
    // ctgTipos: async (tipo = 1) => {
    //     try {
    //         let resultado = await sqlConn.request()
    // 		.input('TIPO', sql.Int, tipo)
    //         .query(`					
    // 			SELECT
    // 				NOMBRE_TP AS label,
    // 				VALOR_TP AS clave
    // 			FROM TIPOS_T
    // 			WHERE GRUPO_TP = @TIPO
    //         `)
    //         return sqlFormatoRespuesta(resultado)
    //     } catch (error) {
    //         throw error
    //     }
    // },

}

module.exports = {
    descarga
}