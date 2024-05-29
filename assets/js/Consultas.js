function consultaVehiculos() {
    console.log('click vehiculo')

    var settings = {
        async: true,
        crossDomain: true,
        url: "https://api.simpliroute.com/v1/routes/vehicles/",
        method: "GET",
        headers: {
            "content-type": "application/json",
            authorization: "Token 2231cc69f2a133e83336f14a81a7da123575ed39",
        },
    };
    fetch(settings.url, {
        method: `${settings.method}`,
        headers: settings.headers,
    }).then((response) => response.json())
        .then((data) => {
            console.log('vehiculos', data)
            let vehiculos = data
        })
        .catch((error) => {
            console.error("Error al hacer fetch de recibir:", error);
        });
}

function consultaConductor() {
    console.log('click conductor')

    var settings = {
        async: true,
        crossDomain: true,
        url: "https://api.simpliroute.com/v1/accounts/drivers/",
        method: "GET",
        headers: {
            "content-type": "application/json",
            authorization: "Token 2231cc69f2a133e83336f14a81a7da123575ed39",
        },
    };
    fetch(settings.url, {
        method: `${settings.method}`,
        headers: settings.headers,
    }).then((response) => response.json())
        .then((data) => {
            console.log('conductores', data[0])
        })
        .catch((error) => {
            console.error("Error al hacer fetch de recibir:", error);
        });

}

async function cargarSucursales() {

    let id = document.getElementById('vehicle').value

    fetch("/rt-cargar-sucursales", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
    }).then((response) => response.json())
        .then((data) => {
            document.getElementById('formulario').innerHTML = data.html
        })
        .catch((error) => {
            console.error("Error al cargar la información:", error);
        });

}

function crearPaquetes(num) {

    let numero = parseInt(num)
    document.getElementById('paquetes').innerHTML = ''

    for (let i = 1; i <= numero; i++) {
        const paquete = ` 

        <div class="paquete"> 

            <div class="form-group"> 

                <label><b>Paquete ${i}</b></label> 

            </div> 

            <div class="form-group"> 

                <label>Dirección:</label> 

                <input type="text" id="address_${i}" name="address_${i}"> 

            </div> 

            <div class="form-double-group">
            
            <div class="form-group"> 

            <label>Latitud:</label> 

            <input type="text" id="latitude_${i}" name="latitude_${i}" disabled> 

        </div> 

        <div class="form-group"> 

            <label>Longitud:</label> 

            <input type="text" id="longitude_${i}" name="longitude_${i}" disabled> 

        </div> 

            </div>

            <div class="form-group"> 

                <label>Contacto:</label> 

                <input type="text" id="contact_name_${i}" name="contact_name_${i}"> 

            </div> 

            <div class="form-group"> 

                <label>Correo de contacto:</label> 

                <input type="text" id="contact_email_${i}" name="contact_email_${i}"> 

            </div> 

        </div> 

    `;

        document.getElementById('paquetes').insertAdjacentHTML('beforeend', paquete);

    }
}

function validar(input) {
    input.value = input.value.replace(/e/gi, '');
    input.value = input.value.replace(/-/g, '');
}

function consultaGeolocalizacion(direccion){
    let parametro = direccion
    parametro.replace(' ', '%')
    parametro.replace(',', '%,')
    
    fetch('https://api.mapbox.com/search/geocode/v6/forward?q=Mil%Novecientos%Veintidós%102%,%Zona%Centro%,%92030%,%Pueblo%Viejo%Veracruz&limit=1&access_token=pk.eyJ1IjoiaGVjdG9ybGVvbmVscHJvIiwiYSI6ImNsd3IxcHd2cDA4ODgyaW9wM2I4Mmx1dDgifQ.-8mhjDXTyflCG8EuzcjhoA', {
        method: "GET",
        headers: {"content-type": "application/json"},
    }).then((response) => (response.json()))
    .then((data) => {
        console.log(data)
    })
    .catch((error) => {
        console.error("Error al hacer fetch de geolocalizacion:", error);
    });
}

function crearRuta(){
    //    var settingsRoute = {
//         async: true,
//         crossDomain: true,
//         url: "https://optimizator.simpliroute.com/vrp/optimize/sync/",
//         method: "POST",
//         headers: {
//             "content-type": "application/json",
//             authorization: "Token 2231cc69f2a133e83336f14a81a7da123575ed39",
//         },
//         processData: false,
//         data: `{
//             "name": "Prueba",
//             "vehicles": [
//                 {
//                     "ident": "Vehicle 1",
//                     "location_start": {
//                         "ident": "Boulevard Adolfo López Mateos #604 Piso 1, Supermanzana Sector Sur, Nuevo Aeropuerto, 89337 Tampico, Tamps.",
//                         "lat": 22.1716,
//                         "lon": -97.5214
//                     },
//                     "location_end": {
//                         "ident": "Boulevard Adolfo López Mateos #604 Piso 1, Supermanzana Sector Sur, Nuevo Aeropuerto, 89337 Tampico, Tamps.",
//                         "lat": 22.1716,
//                         "lon": -97.5214
//                     },
//                     "capacity": 3500,
//                     "capacity_2": 3500,
//                     "capacity_3": 3500,
//                     "shift_start": "9:00",
//                     "shift_end": "22:00",
//                     "skills": []
//                 }
//             ],
//             "nodes": [
//                 {
//                     "ident": "Calle Centenario y 1922, Zona Centro, 92030, Pueblo Viejo Veracruz",
//                     "address": "Calle Centenario y 1922, Zona Centro, 92030, Pueblo Viejo Veracruz",
//                     "lat": 22.2215,
//                     "lon": -97.8585,
//                     "load": 77,
//                     "window_start": "09:00",
//                     "window_end": "17:00",
//                     "window_start_2": "19:00",
//                     "window_end_2": "22:00",
//                     "duration": 10
//                 },
//                 {
//                     "ident": "Calle José de Escandón 308, Zona Centro, Tampico, Tamps.",
//                     "address": "Calle José de Escandón 308, Zona Centro, Tampico, Tamps.",
//                     "lat": 22.1819,
//                     "lon": -97.8365,
//                     "load": 2530,
//                     "window_start": "9:00",
//                     "window_end": "11:00",
//                     "window_start_2": "19:00",
//                     "window_end_2": "22:00",
//                     "duration": 15
//                 }
//             ],
//             "balance": true,
//             "all_vehicles": false,
//             "join": true,
//             "open_ended": false,
//             "single_tour": true,
//             "fmv": 1.0
//         }`
//     };
//     var settingsPlan = {
//         async: true,
//         crossDomain: true,
//         url: "https://api.simpliroute.com/v1/plans/create-plan/",
//         method: "POST",
//         headers: {
//             "content-type": "application/json",
//             authorization: "Token 2231cc69f2a133e83336f14a81a7da123575ed39",
//         },
//         processData: false,                              
//         data:{
//             name: "",
//             routes: [
//               {
//                 driver: "348263",
//                 vehicle: "478602",
//                 planned_date: "2024-05-28",
//                 estimated_time_start: "08:00:00",
//                 estimated_time_end: "08:38:00",
//                 request_status: "created",
//                 location_start_address: "Boulevard Adolfo López Mateos #604 Piso 1, Supermanzana Sector Sur, Nuevo Aeropuerto, 89337 Tampico, Tamps.",
//                 location_start_latitude: 22.17167,
//                 location_start_longitude: -97.52146,
//                 location_end_address: "Boulevard Adolfo López Mateos #604 Piso 1, Supermanzana Sector Sur, Nuevo Aeropuerto, 89337 Tampico, Tamps.",
//                 location_end_latitude: 22.17167,
//                 location_end_longitude: -97.52146,
//                 visits: [
                    
//                 ], 
//                 balance: true, 
//                 fmv:2.0,
//                 use_euclidean_distance:true, 
//                 intensive_intra:true 
//               }
//             ]
//           }
//     };

    // fetch('/envio-plan', {
    //     method: "POST",
    //     headers: {"content-type": "application/json"},
    //     body: JSON.stringify({optimizar: settingsRoute, plan: settingsPlan}),
    // }).then((response) => response.json())
    // .then((data) => {
    //     console.log('123', data)
    //     if(data.pla.status == 'completed'){
    //         alert('Tu ruta ha sido creada correctamente.')
    //     }
    // })
    // .catch((error) => {
    //     console.error("Error al hacer fetch de envío1:", error);
    // });

    console.log('AQUI ES DONDE ENTRARIAN LOS DATOS DE LAS DIRECCIONES, ADEMÁS DE LOS PRIMEROS DATOS DEL FORMULARIO, LA DIRECCION Y LATITUD Y ESO.')
    console.log('EL SETTINGSROUTE ES EL QUE TE CREA LA RUTA OPTIMA, ESTE OCUPA UN IDENT, LAT Y LON OBLIGATORIAMENTE, EL IDENT VA A SER LA DIRECCION QUE ESCRIBAMOS.')
    console.log('EL SETTINGS PLAN ES EL QUE CREA EL PLAN PARA EL ENVIO, AQUI NO VAS A CAMBIAR MUCHO, LO UNICO QUE CAMBIARIAS SERIAN LOS CAMPOS DE LOCATION_START Y END PARA QUE SEAN LOS QUE TIENES AL PRINCIPIO EN LA PRIMER PARTE DEL FORMULARIO, TU PUEDES TQM.')

}