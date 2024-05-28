function send(){
    console.log('asd')

    // FETCH DE POST

   var settingsRoute = {
        async: true,
        crossDomain: true,
        url: "https://optimizator.simpliroute.com/vrp/optimize/sync/",
        method: "POST",
        headers: {
            "content-type": "application/json",
            authorization: "Token 5feae79e649ed6759936980caad4224566b30d39",
        },
        processData: false,
        data: `{
            "name": "Prueba",
            "vehicles": [
                {
                    "ident": "Vehicle 1",
                    "location_start": {
                        "ident": "Boulevard Adolfo López Mateos #604 Piso 1, Supermanzana Sector Sur, Nuevo Aeropuerto, 89337 Tampico, Tamps.",
                        "lat": 22.1716,
                        "lon": -97.5214
                    },
                    "location_end": {
                        "ident": "Boulevard Adolfo López Mateos #604 Piso 1, Supermanzana Sector Sur, Nuevo Aeropuerto, 89337 Tampico, Tamps.",
                        "lat": 22.1716,
                        "lon": -97.5214
                    },
                    "capacity": 3500,
                    "capacity_2": 3500,
                    "capacity_3": 3500,
                    "shift_start": "9:00",
                    "shift_end": "22:00",
                    "skills": []
                }
            ],
            "nodes": [
                {
                    "ident": "Calle Centenario y 1922, Zona Centro, 92030, Pueblo Viejo Veracruz",
                    "address": "Calle Centenario y 1922, Zona Centro, 92030, Pueblo Viejo Veracruz",
                    "lat": 22.2215,
                    "lon": -97.8585,
                    "load": 77,
                    "window_start": "09:00",
                    "window_end": "17:00",
                    "window_start_2": "19:00",
                    "window_end_2": "22:00",
                    "duration": 10
                },
                {
                    "ident": "Calle José de Escandón 308, Zona Centro, Tampico, Tamps.",
                    "address": "Calle José de Escandón 308, Zona Centro, Tampico, Tamps.",
                    "lat": 22.1819,
                    "lon": -97.8365,
                    "load": 2530,
                    "window_start": "9:00",
                    "window_end": "11:00",
                    "window_start_2": "19:00",
                    "window_end_2": "22:00",
                    "duration": 15
                }
            ],
            "balance": true,
            "all_vehicles": false,
            "join": true,
            "open_ended": false,
            "single_tour": true,
            "fmv": 1.0
        }`
    };
    var settingsPlan = {
        async: true,
        crossDomain: true,
        url: "https://api.simpliroute.com/v1/plans/create-plan/",
        method: "POST",
        headers: {
            "content-type": "application/json",
            authorization: "Token 5feae79e649ed6759936980caad4224566b30d39",
        },
        processData: false,                              
        data:{
            name: "camila prueba aaaaaa",
            routes: [
              {
                driver: "348263",
                vehicle: "478602",
                planned_date: "2024-05-28",
                estimated_time_start: "08:00:00",
                estimated_time_end: "08:38:00",
                request_status: "created",
                location_start_address: "Boulevard Adolfo López Mateos #604 Piso 1, Supermanzana Sector Sur, Nuevo Aeropuerto, 89337 Tampico, Tamps.",
                location_start_latitude: 22.17167,
                location_start_longitude: -97.52146,
                location_end_address: "Boulevard Adolfo López Mateos #604 Piso 1, Supermanzana Sector Sur, Nuevo Aeropuerto, 89337 Tampico, Tamps.",
                location_end_latitude: 22.17167,
                location_end_longitude: -97.52146,
                visits: [
                    
                ], 
                balance: true, 
                fmv:2.0,
                use_euclidean_distance:true, 
                intensive_intra:true 
              }
            ]
          }
    };
    
    fetch(settingsRoute.url, {
    method: `${settingsRoute.method}`,
    headers: settingsRoute.headers,
    body: settingsRoute.data,
    }).then((response) => response.json())
    .then((data) => {
        console.log('123', data)

        settingsPlan.data.name = data.id
        const arr = JSON.parse(JSON.stringify(data.vehicles[0].tours[0].nodes));
        var res = arr.map(item => {
            item.address = item.ident;
            item.title = "Orden " + item.order
            item.planned_date = settingsPlan.data.routes[0].planned_date
            item.request_status = "created"
            item.contact_name = ""
            item.contact_email = ""
            item.notes = ""
            item.reference = ""
            delete item.ident;
            delete item.load;
            delete item.load_2;
            delete item.load_3;
            delete item.arrival;
            delete item.departure;
            delete item.lat;
            delete item.lon;
            delete item.priority;
            return item;
        });
        settingsPlan.data.routes[0].visits[0] = res

        console.log(321, settingsPlan.data)
        
        

    })
    .catch((error) => {
        console.error("Error al hacer fetch de envío:", error);
    });

    fetch(settingsPlan.url, {
        method: `${settingsPlan.method}`,
        headers: settingsPlan.headers,
        body: JSON.stringify(settingsPlan.data),
    }).then((response1) => response1.json())
    .then((data1) => {
        console.log('123', data1)
        
    })
    .catch((error1) => {
        console.error("Error al hacer fetch de envío1:", error1);
    });



    // FETCH DE GET


    // var settingsRoute = {
    //     async: true,
    //     crossDomain: true,
    //     url: "https://api.simpliroute.com/v1/routes/visits/1231231/",
    //     method: "DELETE",
    //     headers: {
    //         "content-type": "application/json",
    //         authorization: "Token 5feae79e649ed6759936980caad4224566b30d39",
    //     },
    // };
    // fetch(settingsRoute.url, {
    // method: `${settingsRoute.method}`,
    // headers: settingsRoute.headers,
    // }).then((response) => response.json())
    // .then((data) => {
    //     console.log('123', data)
    // })
    // .catch((error) => {
    //     console.error("Error al hacer fetch de envío:", error);
    // });
}
