const prueba = {
    rt_plan: async (req, res) => {
        let optimizar = req.body.optimizar
        let plan = req.body.plan

        const response_optimizar = await fetch(optimizar.url, {
            method: optimizar.method,
            headers: optimizar.headers,
            body: JSON.stringify(optimizar.data),
        });
        
        const opt = await response_optimizar.json();

        plan.data.name = opt.id
        const arr = JSON.parse(JSON.stringify(opt.vehicles[0].tours[0].nodes));
        var resp = await arr.map(item => {
            item.address = item.ident;
            item.title = "Orden " + item.order
            item.planned_date = plan.data.routes[0].planned_date
            item.request_status = "created"
            item.contact_name = ""
            item.contact_email = ""
            item.notes = ""
            item.reference = ""
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

        res.json({pla})

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
    }
    
}

module.exports = { prueba };
