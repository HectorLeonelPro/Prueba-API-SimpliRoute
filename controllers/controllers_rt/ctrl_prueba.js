const prueba = {
    rt_plan: async (req, res) => {
        let optimizar = req.body.optimizar
        let plan = req.body.plan
        let nodos = req.body.nodos

        const response_optimizar = await fetch(optimizar.url, {
            method: optimizar.method,
            headers: optimizar.headers,
            body: JSON.stringify(optimizar.data),
        });
        
        const opt = await response_optimizar.json();

        console.log(1, opt.vehicles[0].tours[0])

        plan.data.name = opt.id
        const arr = JSON.parse(JSON.stringify(opt.vehicles[0].tours[0].nodes));
        console.log(nodos)
        var resp = await arr.map((item, i) => {
            console.log(item)
            item.reference = item.reference
            item.address = item.ident
            // item.ident = item.ident + '-' + i
            // item.address = typeof item.ident == 'string' ? item.ident : nodos.find(x => x.ident == item.ident).address;
            item.title = "Orden " + item.order
            item.planned_date = plan.data.routes[0].planned_date
            item.request_status = "created"
            item.contact_name = "hector"
            item.contact_email = ""
            item.notes = ""
            item.order = item.order
            delete item.ident;
            delete item.load;
            delete item.load_2;
            delete item.load_3;
            delete item.arrival;
            delete item.departure;
            delete item.priority;
            return item;
        });

        resp.splice(0,1)
        plan.data.routes[0].visits = resp

        const response_plan = await fetch(plan.url, {
            method: plan.method,
            headers: plan.headers,
            body: JSON.stringify(plan.data),
        });
        const pla = await response_plan.json();
        console.log(2, pla)

        res.json({opt, pla})

        // res.render('consultas', { VEHICULOS: vehiculos, CONDUCTORES:conductores  });
    },

    rt_consulta_sucursales: async (req,res) => {
        try {
            const response = await fetch(`https://api.simpliroute.com/v1/routes/vehicles/${req.body.id}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    authorization: `Token ${process.env.SIMPLIROUTE_KEY}`,
                },
            });
            const informacion= await response.json();

        res.render('partials/formulario', { INFORMACION : informacion}, (error, html) => {
            res.json({ INFORMACION : informacion, html })
        })
           
        } catch (error) {
            console.log(error)
            res.redirect('../pagina-no-encontrada')
        }
    },
    rt_geolocalizacion: async (req, res) => {
        let parametro = req.body.parametro

        try {
            const response = await fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=${parametro}&limit=1&access_token=${process.env.MAPBOX_KEY}`, {
                method: "GET",
                headers: {"content-type": "application/json",},
            });
            const informacion = await response.json();
            res.json({ geo: informacion })
        } catch (error) {
            console.log(error)
            res.redirect('../pagina-no-encontrada')
        }
    },
    rt_geolocalizacion_inversa: async (req, res) => {
        let lat = req.body.latlng.lat
        let lon = req.body.latlng.lng
        
        try {
            const response = await fetch(`https://api.mapbox.com/search/geocode/v6/reverse?&longitude=${lon}&latitude=${lat}&limit=1&access_token=${process.env.MAPBOX_KEY}`, {
                method: "GET",
                headers: {"content-type": "application/json",},
            });
            const informacion = await response.json();
            res.json({ geo: informacion })
        } catch (error) {
            console.log(error)
            res.redirect('../pagina-no-encontrada')
        }
    },
    
}

module.exports = { prueba };
