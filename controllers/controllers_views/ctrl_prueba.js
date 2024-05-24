const prueba = {
    envio: async (req, res) => {
        try {
            res.render('envio')
        } catch (error) {
            console.log(error)
            res.redirect('../pagina-no-encontrada')
        }
    },
    resultados: async (req, res) => {
        try {
            res.render('resultados')
        } catch (error) {
            console.log(error)
            res.redirect('../pagina-no-encontrada')
        }
    },
    
    
}





module.exports = { prueba };
