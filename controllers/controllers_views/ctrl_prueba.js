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
    pruebas: async (req, res) => {
        try {
            res.render('pruebas')
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
                    authorization: `Token ${process.env.SIMPLIROUTE_KEY}`,
                },

            });
            const response_conductores = await fetch("https://api.simpliroute.com/v1/accounts/drivers/", {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    authorization: `Token ${process.env.SIMPLIROUTE_KEY}`,
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
    },
    consultas_prueba: async (req, res) => {
        try {
            const response_vehiculos = await fetch("https://api.simpliroute.com/v1/routes/vehicles/", {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    authorization: `Token ${process.env.SIMPLIROUTE_KEY}`,
                },

            });
            const response_conductores = await fetch("https://api.simpliroute.com/v1/accounts/drivers/", {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    authorization: `Token ${process.env.SIMPLIROUTE_KEY}`,
                },

            });
            const vehiculos= await response_vehiculos.json();
            const conductores = await response_conductores.json();

        // console.log(6485468, vehiculos)
            res.render('consultas_prueba_optimizacion', { VEHICULOS: vehiculos, CONDUCTORES:conductores  });

        } catch (error) {
            console.log(error)
            res.redirect('../pagina-no-encontrada')
        }
    },
    consultas_plan_nacional: async (req, res) => {
        try {
            const response_vehiculos = await fetch("https://api.simpliroute.com/v1/routes/vehicles/", {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    authorization: `Token ${process.env.SIMPLIROUTE_KEY}`,
                },

            });
            const response_conductores = await fetch("https://api.simpliroute.com/v1/accounts/drivers/", {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    authorization: `Token ${process.env.SIMPLIROUTE_KEY}`,
                },

            });
            const vehiculos= await response_vehiculos.json();
            const conductores = await response_conductores.json();

        // console.log(6485468, vehiculos)
            res.render('consultas_plan_nacional', { VEHICULOS: vehiculos, CONDUCTORES:conductores  });

        } catch (error) {
            console.log(error)
            res.redirect('../pagina-no-encontrada')
        }
    },

    consultas_google: async (req, res) => {
        try {
            const response_vehiculos = await fetch("https://api.simpliroute.com/v1/routes/vehicles/", {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    authorization: `Token ${process.env.SIMPLIROUTE_KEY}`,
                },

            });
            const response_conductores = await fetch("https://api.simpliroute.com/v1/accounts/drivers/", {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    authorization: `Token ${process.env.SIMPLIROUTE_KEY}`,
                },

            });
            const vehiculos= await response_vehiculos.json();
            const conductores = await response_conductores.json();

        // console.log(6485468, vehiculos)
            res.render('consultas_googlemaps', { VEHICULOS: vehiculos, CONDUCTORES:conductores  });

        } catch (error) {
            console.log(error)
            res.redirect('../pagina-no-encontrada')
        }
    },

}

module.exports = { prueba };
