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
    consultas: async (req, res) => {
        try {
            const response_vehiculos = await fetch("https://api.simpliroute.com/v1/routes/vehicles/", {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    authorization: "Token 5feae79e649ed6759936980caad4224566b30d39",
                },

            });
            const response_conductores = await fetch("https://api.simpliroute.com/v1/accounts/drivers/", {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    authorization: "Token 5feae79e649ed6759936980caad4224566b30d39",
                },

            });
            const vehiculos= await response_vehiculos.json();
            const conductores = await response_conductores.json();

        // console.log(6485468, vehiculos)
            res.render('consultas', { VEHICULOS: vehiculos, CONDUCTORES:conductores  });

        } catch (error) {
            console.log(error)
            res.redirect('../pagina-no-encontrada')
        }
    }








}





module.exports = { prueba };
