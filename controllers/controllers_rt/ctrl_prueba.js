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
        plan.data.name = opt.id

        const arr = JSON.parse(JSON.stringify(opt.vehicles[0].tours[0].nodes));
        console.log(1, nodos)
        console.log(3, arr)
        var resp = await arr.map((item, i) => {
            if (i == 0) {
                console.log('partida')
                item.title = "Partida"
                item.address = item.ident
                item.planned_date = plan.data.routes[0].planned_date
                return item;
            }
            else if (i == arr.length - 1) {
                console.log('regreso')
                item.title = "Regreso"
                item.address = item.ident
                item.planned_date = plan.data.routes[0].planned_date
                return item;
            } else {
                console.log(i)
                console.log('visitas')
                item.reference = nodos.find(x => x.ident == item.ident).ident;
                item.address = nodos.find(x => x.ident == item.ident).address;
                item.title = "Orden " + item.order + '-' + item.ident
                item.planned_date = plan.data.routes[0].planned_date
                item.request_status = "created"
                item.contact_name = nodos.find(x => x.ident == item.ident).contact_name;
                item.contact_phone = nodos.find(x => x.ident == item.ident).contact_phone;
                item.contact_email = nodos.find(x => x.ident == item.ident).contact_email;
                item.notes = nodos.find(x => x.ident == item.ident).notes;
                item.order = item.order
                delete item.ident;
                delete item.load;
                delete item.load_2;
                delete item.load_3;
                delete item.arrival;
                delete item.departure;
                delete item.priority;
                return item;
            }
        });
        console.log(4, resp)
        resp.splice(0, 1)
        console.log(5, resp)
        plan.data.routes[0].visits = resp
        console.log(6, plan.data)

        const response_plan = await fetch(plan.url, {
            method: plan.method,
            headers: plan.headers,
            body: JSON.stringify(plan.data),
        });
        const pla = await response_plan.json();

        res.json({ opt, pla })

        // res.render('consultas', { VEHICULOS: vehiculos, CONDUCTORES:conductores  });
    },
    rt_plan_prueba: async (req, res) => {
        let nodos = req.body.nodos

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
        const vehiculos = await response_vehiculos.json();
        const conductores = await response_conductores.json();

        let vehicles = []

        const vehicles2 = JSON.parse(JSON.stringify(vehiculos));
        var respVeh = await vehicles2.map((item, i) => {
            vehicles.push({
                ident: item.id,
                location_start: {
                    ident: item.location_start_address,
                    lat: item.location_start_latitude,
                    lon: item.location_start_longitude
                },
                location_end: {
                    ident: item.location_end_address,
                    lat: item.location_end_latitude,
                    lon: item.location_end_longitude
                },
                capacity: item.capacity,
                capacity_2: item.capacity_2,
                capacity_3: item.capacity_3,
                shift_start: "9:00",
                shift_end: "22:00",
                skills: item.skills,
            })
            return item;
        });

        var settingsRoute = {
            async: true,
            crossDomain: true,
            url: "https://optimizator.simpliroute.com/vrp/optimize/sync/",
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `Token ${process.env.SIMPLIROUTE_KEY}`,
            },
            processData: false,
            data: {
                name: "546651236sdfs234df4",
                vehicles: vehicles,
                nodes: nodos,
                balance: true,
                join: true,
                open_ended: false,
                single_tour: true,
                fmv: 1.0
            }
        };

        // var settingsPlan = {
        //     async: true,
        //     crossDomain: true,
        //     url: "https://api.simpliroute.com/v1/plans/create-plan/",
        //     method: "POST",
        //     headers: {
        //         "content-type": "application/json",
        //         authorization: "Token 1a996e86d0145cb987b28b8dddfacaecc6a2629c",
        //     },
        //     processData: false,                              
        //     data:{
        //         name: "",
        //         routes: [
        //             {
        //             driver: driver,
        //             vehicle: ident_vehicle,
        //             planned_date: start_date,
        //             estimated_time_start: "08:00:00",
        //             estimated_time_end: "19:40:00",
        //             request_status: "created",
        //             location_start_address: ident_start,
        //             location_start_latitude: lat_start, 
        //             location_start_longitude: lon_start,
        //             location_end_address: ident_end,
        //             location_end_latitude: lat_end,
        //             location_end_longitude:lon_end ,
        //             visits: [

        //             ], 
        //             balance: true, 
        //             fmv:2.0,
        //             use_euclidean_distance:true, 
        //             intensive_intra:true 
        //             }
        //         ]
        //         }
        // };



        // let optimizar = req.body.optimizar
        // let plan = req.body.plan

        const response_optimizar = await fetch(settingsRoute.url, {
            method: settingsRoute.method,
            headers: settingsRoute.headers,
            body: JSON.stringify(settingsRoute.data),
        });
        const opt = await response_optimizar.json();
        console.log(555, opt)
        plan.data.name = opt.id

        const arr = JSON.parse(JSON.stringify(opt.vehicles[0].tours[0].nodes));
        console.log(1, nodos)
        console.log(3, arr)
        var resp = await arr.map((item, i) => {
            if (i == 0) {
                console.log('partida')
                item.title = "Partida"
                item.address = item.ident
                item.planned_date = plan.data.routes[0].planned_date
                return item;
            }
            else if (i == arr.length - 1) {
                console.log('regreso')
                item.title = "Regreso"
                item.address = item.ident
                item.planned_date = plan.data.routes[0].planned_date
                return item;
            } else {
                console.log(i)
                console.log('visitas')
                item.reference = nodos.find(x => x.ident == item.ident).ident;
                item.address = nodos.find(x => x.ident == item.ident).address;
                item.title = "Orden " + item.order + '-' + item.ident
                item.planned_date = plan.data.routes[0].planned_date
                item.request_status = "created"
                item.contact_name = nodos.find(x => x.ident == item.ident).contact_name;
                item.contact_phone = nodos.find(x => x.ident == item.ident).contact_phone;
                item.contact_email = nodos.find(x => x.ident == item.ident).contact_email;
                item.notes = nodos.find(x => x.ident == item.ident).notes;
                item.order = item.order
                delete item.ident;
                delete item.load;
                delete item.load_2;
                delete item.load_3;
                delete item.arrival;
                delete item.departure;
                delete item.priority;
                return item;
            }
        });
        console.log(4, resp)
        resp.splice(0, 1)
        console.log(5, resp)
        plan.data.routes[0].visits = resp
        console.log(6, plan.data)

        const response_plan = await fetch(plan.url, {
            method: plan.method,
            headers: plan.headers,
            body: JSON.stringify(plan.data),
        });
        const pla = await response_plan.json();

        res.json({ opt, pla })

        // res.render('consultas', { VEHICULOS: vehiculos, CONDUCTORES:conductores  });
    },
    rt_consulta_sucursales: async (req, res) => {
        try {
            const response = await fetch(`https://api.simpliroute.com/v1/routes/vehicles/${req.body.id}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    authorization: `Token ${process.env.SIMPLIROUTE_KEY}`,
                },
            });
            const informacion = await response.json();

            res.render('partials/formulario', { INFORMACION: informacion }, (error, html) => {
                res.json({ INFORMACION: informacion, html })
            })

        } catch (error) {
            console.log(error)
            res.redirect('../pagina-no-encontrada')
        }
    },
    rt_consulta_vehiculo_conductor: async (req, res) => {
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
        const vehiculos = await response_vehiculos.json();
        const conductores = await response_conductores.json();

        res.json({ vehiculos: vehiculos, conductores: conductores })
    },
    rt_geolocalizacion: async (req, res) => {
        let parametro = req.body.parametro

        try {
            const response = await fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=${parametro}&limit=1&access_token=${process.env.MAPBOX_KEY}`, {
                method: "GET",
                headers: { "content-type": "application/json", },
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
                headers: { "content-type": "application/json", },
            });
            const informacion = await response.json();
            res.json({ geo: informacion })
        } catch (error) {
            console.log(error)
            res.redirect('../pagina-no-encontrada')
        }
    },
    rt_plan_nacional: async (req, res) => {
        let nodos = req.body.nodos
        let salidaa = 'Entrega_Nacional_' + req.body.salida.split(' ')[1]

        console.log(salidaa)

        const response_vehiculos = await fetch("https://api.simpliroute.com/v1/routes/vehicles/", {
            method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: `Token 1a996e86d0145cb987b28b8dddfacaecc6a2629c`,
            },

        });
        const response_conductores = await fetch("https://api.simpliroute.com/v1/accounts/drivers/", {
            method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: `Token 1a996e86d0145cb987b28b8dddfacaecc6a2629c`,
            },

        });
        const vehiculos = await response_vehiculos.json();
        const conductores = await response_conductores.json();

        let vehicles = []

        const vehicles2 = JSON.parse(JSON.stringify(vehiculos));
        var respVeh = await vehicles2.map((item, i) => {
            if (item.name.includes(salidaa)) {
                vehicles.push({
                    ident: item.id,
                    location_start: {
                        ident: item.location_start_address,
                        lat: item.location_start_latitude,
                        lon: item.location_start_longitude
                    },
                    location_end: {
                        ident: item.location_end_address,
                        lat: item.location_end_latitude,
                        lon: item.location_end_longitude
                    },
                    capacity: item.capacity,
                    capacity_2: item.capacity_2,
                    capacity_3: item.capacity_3,
                    shift_start: "9:00",
                    shift_end: "22:00",
                    skills: item.skills,
                })
            }
            return item;
        });
        console.log(vehicles)
        console.log(nodos)
        var settingsRoute = {
            async: true,
            crossDomain: true,
            url: "https://optimizator.simpliroute.com/vrp/optimize/sync/",
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `Token 1a996e86d0145cb987b28b8dddfacaecc6a2629c`,
            },
            processData: false,
            data: {
                name: "546651236sdfs234df4",
                vehicles: vehicles,
                nodes: nodos,
                balance: true,
                open_ended: true,
                single_tour: true,
                fmv: 1.0
            }
        };

        const response_optimizar = await fetch(settingsRoute.url, {
            method: settingsRoute.method,
            headers: settingsRoute.headers,
            body: JSON.stringify(settingsRoute.data),
        });
        const opt = await response_optimizar.json();
        console.log(555, opt.vehicles[0].tours[0].nodes)

        opt.vehicles[0].tours[0].nodes.splice(0, 1)
        opt.vehicles[0].tours[0].nodes.splice((opt.vehicles[0].tours[0].nodes.length) - 1, 1)


        console.log(555, opt.vehicles[0].tours[0].nodes)



        let nombre = 'Ruta_Nacional_' + req.body.salida.split(' ')[1] + '_'
        opt.vehicles[0].tours[0].nodes.map(item => nombre = nombre + item.ident.split(' ')[1] + '_')
        const date = new Date();
        nombre = nombre + date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '_');

        var settingsPlan = {
            async: true,
            crossDomain: true,
            url: "https://api.simpliroute.com/v1/plans/create-plan/",
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: "Token 1a996e86d0145cb987b28b8dddfacaecc6a2629c",
            },
            processData: false,
            data: {
                name: nombre,
                routes: [
                    {
                        driver: driver,
                        vehicle: vehicles[0].ident,
                        planned_date: start_date,
                        estimated_time_start: "08:00:00",
                        estimated_time_end: "19:40:00",
                        request_status: "created",
                        location_start_address: ident_start,
                        location_start_latitude: lat_start,
                        location_start_longitude: lon_start,
                        location_end_address: ident_end,
                        location_end_latitude: lat_end,
                        location_end_longitude: lon_end,
                        visits: [

                        ],
                        balance: true,
                        fmv: 2.0,
                        use_euclidean_distance: true,
                        intensive_intra: true
                    }
                ]
            }
        };



        plan.data.name = opt.id

        const arr = JSON.parse(JSON.stringify(opt.vehicles[0].tours[0].nodes));
        console.log(1, nodos)
        console.log(3, arr)
        var resp = await arr.map((item, i) => {
            if (i == 0) {
                console.log('partida')
                item.title = "Partida"
                item.address = item.ident
                item.planned_date = plan.data.routes[0].planned_date
                return item;
            }
            else if (i == arr.length - 1) {
                console.log('regreso')
                item.title = "Regreso"
                item.address = item.ident
                item.planned_date = plan.data.routes[0].planned_date
                return item;
            } else {
                console.log(i)
                console.log('visitas')
                item.reference = nodos.find(x => x.ident == item.ident).ident;
                item.address = nodos.find(x => x.ident == item.ident).address;
                item.title = "Orden " + item.order + '-' + item.ident
                item.planned_date = plan.data.routes[0].planned_date
                item.request_status = "created"
                item.contact_name = nodos.find(x => x.ident == item.ident).contact_name;
                item.contact_phone = nodos.find(x => x.ident == item.ident).contact_phone;
                item.contact_email = nodos.find(x => x.ident == item.ident).contact_email;
                item.notes = nodos.find(x => x.ident == item.ident).notes;
                item.order = item.order
                delete item.ident;
                delete item.load;
                delete item.load_2;
                delete item.load_3;
                delete item.arrival;
                delete item.departure;
                delete item.priority;
                return item;
            }
        });
        console.log(4, resp)
        resp.splice(0, 1)
        console.log(5, resp)
        plan.data.routes[0].visits = resp
        console.log(6, plan.data)

        const response_plan = await fetch(plan.url, {
            method: plan.method,
            headers: plan.headers,
            body: JSON.stringify(plan.data),
        });
        const pla = await response_plan.json();

        res.json({ opt, pla })
    },

    rt_consulta_ruta: async (req, res) => {
        let id = req.body.id
        console.log(9999999999, id)
        var settings = {
            async: true,
            crossDomain: true,
            url: `http://api.simpliroute.com/v1/routes/routes/${id}/`,
            method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: `Token 1a996e86d0145cb987b28b8dddfacaecc6a2629c`,
                "cookie": "csrftoken=wPpv3zupt3OZSPjEgzvby2tR276abyxZQa8vE82T04dMrnlx3nWEol7Rc9swogD3"
            },
        };
        fetch(settings.url, {
            method: `${settings.method}`,
            headers: settings.headers,

        }).then((response) => response.json())
            .then((data) => {
                console.log('visitas', data)
            })
            .catch((error) => {
                console.error("Error al hacer fetch de recibir:", error);
            });
    },
    rt_consulta_vehiculo: async (req, res) => {
        let id = req.body.id
        var settings = {
            async: true,
            crossDomain: true,
            url: `https://api.simpliroute.com/v1/routes/vehicles/${id}`,
            method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: `Token 1a996e86d0145cb987b28b8dddfacaecc6a2629c`,
            },
        };
        fetch(settings.url, {
            method: `${settings.method}`,
            headers: settings.headers,

        }).then((response) => response.json())
            .then((data) => {
                console.log('vehiculo', data)
            })
            .catch((error) => {
                console.error("Error al hacer fetch de recibir:", error);
            });
    },
    rt_consulta_conductor: async (req, res) => {
        let id = req.body.id
        var settings = {
            async: true,
            crossDomain: true,
            url: `https://api.simpliroute.com/v1/accounts/drivers/${id}`,
            method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: `Token 1a996e86d0145cb987b28b8dddfacaecc6a2629c`,
            },
        };
        fetch(settings.url, {
            method: `${settings.method}`,
            headers: settings.headers,

        }).then((response) => response.json())
            .then((data) => {
                console.log('conductor', data)
            })
            .catch((error) => {
                console.error("Error al hacer fetch de recibir:", error);
            });
    },
    rt_consulta_vehiculos_ruta: async (req, res) => {
        let id = req.body.id
        var settings = {
            async: true,
            crossDomain: true,
            url: `https://api.simpliroute.com/v1/plans/${id}/vehicles/`,
            method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: `Token 1a996e86d0145cb987b28b8dddfacaecc6a2629c`,
            },
        };
        fetch(settings.url, {
            method: `${settings.method}`,
            headers: settings.headers,

        }).then((response) => response.json())
            .then((data) => {
                console.log('vehiculos_ruta', data)
            })
            .catch((error) => {
                console.error("Error al hacer fetch de recibir:", error);
            });
    },
    rt_visitas_ruta: async (req, res) => {
        let id = req.body.id
        var settings = {
            async: true,
            crossDomain: true,
            url: `https://api.simpliroute.com/v1/plans/routes/${id}/visits`,
            method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: `Token 1a996e86d0145cb987b28b8dddfacaecc6a2629c`,
            },
        };
        fetch(settings.url, {
            method: `${settings.method}`,
            headers: settings.headers,

        }).then((response) => response.json())
            .then((data) => {
                console.log('visitas', data)
            })
            .catch((error) => {
                console.error("Error al hacer fetch de recibir:", error);
            });
    },
    // rt_visitas_info: async (req, res) => {
    //     let id = req.body.id
    //     var settings = {
    //         async: true,
    //         crossDomain: true,
    //         url: `https://api.simpliroute.com/v1/routes/visits/`,
    //         method: "GET",
    //         headers: {
    //             "content-type": "application/json",
    //             authorization: `Token 1a996e86d0145cb987b28b8dddfacaecc6a2629c`,
    //         },
    //     };
    //     fetch(settings.url, {
    //         method: `${settings.method}`,
    //         headers: settings.headers,

    //     }).then((response) => response.json())
    //     .then((data) => {
    //         const resultado = data.find(visita => visita.tracking_id);
    //         const visit_id = resultado.id;
    //         console.log('visitas',data);
    //         //console.log('visita especifica',resultado);
    //         //console.log('VISIT_ID:', visit_id)

    //          return res.json({visit_id})
    //     })
    //         .catch((error) => {
    //             console.error("Error al hacer fetch de recibir:", error);
    //         });
    // },
    rt_visitas_info: async (req, res) => {
        let id = req.body.id;
        var settings = {
            async: true,
            crossDomain: true,
            url: `https://api.simpliroute.com/v1/routes/visits/`,
            method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: `Token 1a996e86d0145cb987b28b8dddfacaecc6a2629c`,
            },
        };

        fetch(settings.url, {
            method: `${settings.method}`,
            headers: settings.headers,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('TODAS LAS VISITAS', data)
                console.log('-----------------------------------------------------')
                data.forEach(visita => {
                    let visitaId = visita.id || 'NO EXISTE';
                    let trackingId = visita.tracking_id || 'NO EXISTE';
                    let routeId = visita.route || 'NO EXISTE';
                    let reference = visita.reference || 'NO EXISTE';
                    console.log('ID: ', visita.id);
                    console.log('TRACKING ID: ', visita.tracking_id);
                    console.log( 'ID ROUTE: ', visita.route);
                    console.log( 'REFERENCE:', visita.reference);
                  

                });


            })
            .catch((error) => {
                console.error("Error al hacer fetch de recibir:", error);
            });
    },

    rt_optimizacion_distancia: async (req, res) => {
        let id = req.body.id
        var settings = {
            async: true,
            crossDomain: true,
            url: `https://optimizator.simpliroute.com/v1/optimization/metadata/distance`,
            method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: `Token 1a996e86d0145cb987b28b8dddfacaecc6a2629c`,
            },
        };
        fetch(settings.url, {
            method: `${settings.method}`,
            headers: settings.headers,

        }).then((response) => response.json())
            .then((data) => {
                console.log('distancia', data);
            })
            .catch((error) => {
                console.error("Error al hacer fetch de recibir:", error);
            });
    },


}

module.exports = { prueba };
