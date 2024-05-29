

function consultaVehiculos() {
    console.log('click vehiculo')

    var settings = {
        async: true,
        crossDomain: true,
        url: "https://api.simpliroute.com/v1/routes/vehicles/",
        method: "GET",
        headers: {
            "content-type": "application/json",
            authorization: `Token ${process.env.SIMPLIROUTE_KEY}`,
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
            authorization: `Token ${process.env.SIMPLIROUTE_KEY}`,
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

                <label>Dirección: *</label> 

                <input type="text" id="address_${i}" name="address_${i}" onchange="consultaGeolocalizacion(this.value, this.id)"> 

            </div> 

            <div class="form-group"> 

                <div class="map" id="map_${i}"></div>

            </div> 

            <div class="form-double-group">
            
            <div class="form-group"> 

            <label>Latitud: *</label> 

            <input type="text" id="latitude_${i}" name="latitude_${i}" disabled> 

        </div> 

        <div class="form-group"> 

            <label>Longitud: *</label> 

            <input type="text" id="longitude_${i}" name="longitude_${i}" disabled> 

        </div> 

            </div>

            <div class="form-group"> 

                <label>Contacto: *</label> 

                <input type="text" id="contact_name_${i}" name="contact_name_${i}"> 

            </div> 

            <div class="form-group"> 

                <label>Correo de contacto: *</label> 

                <input type="text" id="contact_email_${i}" name="contact_email_${i}"> 

            </div> 

        </div>

    `
    document.getElementById('paquetes').insertAdjacentHTML('beforeend', paquete);
        var map = L.map(`map_${i}`).setView([22.216743, -97.85672], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    ;

    }
}

function validar(input) {
    input.value = input.value.replace(/e/gi, '');
    input.value = input.value.replace(/-/g, '');
}

function consultaGeolocalizacion(direccion, id){
    let parametro = direccion
    parametro.replace(' ', '%')
    parametro.replace(',', '%,')
    let paquete = id.split('_')[1]

    fetch(`/geolocalizacion`, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({parametro})
    }).then((response) => (response.json()))
    .then((data) => {
        let latitude = data.geo.features[0].properties.coordinates.latitude
        let longitude = data.geo.features[0].properties.coordinates.longitude
        document.getElementById(`latitude_${paquete}`).value = latitude
        document.getElementById(`longitude_${paquete}`).value = longitude
        document.getElementById(`map_${paquete}`).
        var marker = L.marker([latitude, longitude]).addTo(L.map(`map_${paquete}`));
        // L.map(`map_${paquete}`).setView([latitude, longitude], 13);
        
    })
    .catch((error) => {
        console.error("Error al hacer fetch de geolocalizacion:", error);
    });
}

function crearRuta(e){
    e.preventDefault()

        let nodos = [];
        let numPaquetes = (document.getElementById('paquetes').children).length;

        let  ident_vehicle= document.getElementById('vehicle').value
        let  ident_start= document.getElementById('location_start_address').value
        let  lat_start= document.getElementById('location_start_latitude').value
        let  lon_start= document.getElementById('location_start_longitude').value
        let  ident_end= document.getElementById('location_end_address').value
        let  lat_end= document.getElementById('location_end_latitude').value
        let  lon_end= document.getElementById('location_end_longitude').value
        let  driver = document.getElementById('driver').value
        let start_date = document.getElementById('start_date').value
        let end_date = document.getElementById('end_date').value
        
        for (let i = 0; i < numPaquetes; i++) {
            let address = document.getElementById(`address_${i + 1}`).value;
            let lat = document.getElementById(`latitude_${i + 1}`).value;
            let lon = document.getElementById(`longitude_${i + 1}`).value;
            let contact_name = document.getElementById(`contact_name_${i + 1}`).value;
            let contact_email= document.getElementById(`contact_email_${i + 1}`).value;

            nodos.push({
                ident: address,
                address: address,
                lat: lat,
                lon: lon,
                load: 77,
                window_start: "09:00",
                window_end: "17:00",
                window_start_2: "19:00",
                window_end_2: "22:00",
                duration: 10
            });
        }

        console.log(99999,nodos)

           var settingsRoute = {
            async: true,
            crossDomain: true,
            url: "https://optimizator.simpliroute.com/vrp/optimize/sync/",
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: "Token 2231cc69f2a133e83336f14a81a7da123575ed39",
            },
            processData: false,
            data: `{
                "name": "5466564",
                "vehicles": [
                    {
                        "ident": "${ident_vehicle}",
                        "location_start": {
                            "ident": "${ident_start}",
                            "lat": ${lat_start},
                            "lon": ${lon_start}
                        },
                        "location_end": {
                            "ident": "${ident_end}",
                            "lat": ${lat_end},
                            "lon": ${lon_end}
                        },
                        "capacity": 3500,
                        "capacity_2": 3500,
                        "capacity_3": 3500,
                        "shift_start": "9:00",
                        "shift_end": "22:00",
                        "skills": []
                    }
                ],
                "nodes": ${nodos},
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
                authorization: "Token 2231cc69f2a133e83336f14a81a7da123575ed39",
            },
            processData: false,                              
            data:`{
                name: "",
                routes: [
                  {
                    driver: "${driver}",
                    vehicle: "${ident_vehicle}",
                    planned_date: "${start_date}",
                    estimated_time_start: "08:00:00",
                    estimated_time_end: "08:38:00",
                    request_status: "created",
                    location_start_address: "${ident_start}",
                    location_start_latitude: ${lat_start}, 
                    location_start_longitude: ${lon_start},
                    location_end_address: "${ident_end}",
                    location_end_latitude: ${lat_end},
                    location_end_longitude:${lon_end} ,
                    visits: [
                        
                    ], 
                    balance: true, 
                    fmv:2.0,
                    use_euclidean_distance:true, 
                    intensive_intra:true 
                  }
                ]
              }`
        };
    
        fetch('/envio-plan', {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({optimizar: settingsRoute, plan: settingsPlan}),
        }).then((response) => response.json())
        .then((data) => {
            console.log('123', data)
            if(data.pla.status == 'completed'){
                alert('Tu ruta ha sido creada correctamente.')
            }else{
                alert('Tu ruta no se creo.')
    
            }
        })
        .catch((error) => {
            console.error("Error al hacer fetch de envío1:", error);
        });

}