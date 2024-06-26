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

                <label>ID de referencia: *</label> 

                <input type="text" id="ref_${i}" name="ref_${i}"> 

            </div> 

            <div class="form-group"> 

                <label>Dirección: *</label> 

                <input type="text" id="address_${i}" name="address_${i}" onchange="consultaGeolocalizacion(this.value, this.id)"> 

            </div> 

            <div class="form-group" id="mapa_${i}"> 

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

        <div class="form-double-group">
            
            <div class="form-group"> 

                <label>Nombre de Contacto: *</label> 

                <input type="text" id="contact_name_${i}" name="contact_name_${i}"> 

            </div>

            <div class="form-group"> 

                <label>Teléfono de Contacto: *</label> 

                <input type="text" id="contact_phone_${i}" name="contact_phone_${i}"> 

            </div>

        </div>

        <div class="form-double-group">
                
            <div class="form-group"> 

                <label>Correo de contacto: *</label> 

                <input type="text" id="contact_email_${i}" name="contact_email_${i}"> 

            </div> 

            <div class="form-group"> 

                <label>Cubicaje del paquete: *</label> 

                <input type="text" id="load_${i}" name="load_${i}"> 

            </div> 

        </div> 

            <div class="form-group"> 

                <label>Notas: *</label> 

                <textarea type="text" id="notes_${i}" name="notes_${i}"> </textarea> 

            </div> 

        </div>

    `
    document.getElementById('paquetes').insertAdjacentHTML('beforeend', paquete);
        var map = L.map(`map_${i}`).setView([22.216743, -97.85672], 13).on('click', onMapClick);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
    ;

    }
}

function validar(input) {
    input.value = input.value.replace(/e/gi, '');
    input.value = input.value.replace(/-/g, '');
}

async function consultaGeolocalizacion(direccion, id){
    let parametro = direccion
    parametro.replace(' ', '%')
    parametro.replace(',', '%,')
    let paquete = id.split('_')[1]

    const data = await fetch(`/geolocalizacion`, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({parametro})
        }).then((response) => (response.json()))
        .catch((error) => {
            console.error("Error al hacer fetch de geolocalizacion:", error);
        });

    let latitude = data.geo.features[0].properties.coordinates.latitude
    let longitude = data.geo.features[0].properties.coordinates.longitude
    document.getElementById(`latitude_${paquete}`).value = latitude
    document.getElementById(`longitude_${paquete}`).value = longitude
    document.getElementById(`mapa_${paquete}`).innerHTML = `<div class="map" id="map_${paquete}"></div>`
    const map = L.map(`map_${paquete}`).setView([latitude, longitude], 13).on('click', onMapClick);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
    var marker = L.marker([latitude, longitude]).addTo(map);
}

async function consultaGeolocalizacionInversa(latlng, paquete){
    const data = await fetch(`/geolocalizacion_inversa`, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({latlng})
        }).then((response) => (response.json()))
        .catch((error) => {
            console.error("Error al hacer fetch de geolocalizacion:", error);
        });
        console.log(data)
    let address = data.geo.features[0].properties.full_address
    document.getElementById(`address_${paquete}`).value = address
}

async function onMapClick(e) {
    console.log(e)
    let latlon = e.latlng; 
    let paquete = e.target._container.id.split('_')[1]
    
    document.getElementById(`latitude_${paquete}`).value = latlon.lat
    document.getElementById(`longitude_${paquete}`).value = latlon.lng
    document.getElementById(`mapa_${paquete}`).innerHTML = `<div class="map" id="map_${paquete}"></div>`
    var map = L.map(`map_${paquete}`).setView([latlon.lat, latlon.lng], e.target._zoom).on('click', onMapClick);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
    var marker = L.marker([latlon.lat, latlon.lng]).addTo(map);
    await consultaGeolocalizacionInversa(latlon, paquete)
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
        let idref = document.getElementById(`ref_${i + 1}`).value;
        let address = document.getElementById(`address_${i + 1}`).value;
        let lat = document.getElementById(`latitude_${i + 1}`).value;
        let lon = document.getElementById(`longitude_${i + 1}`).value;
        let contact_name = document.getElementById(`contact_name_${i + 1}`).value;
        let contact_phone = document.getElementById(`contact_phone_${i + 1}`).value;
        let contact_email = document.getElementById(`contact_email_${i + 1}`).value;
        let load = document.getElementById(`notes_${i + 1}`).value;
        let notes = document.getElementById(`notes_${i + 1}`).value;

        nodos.push({
            ident: idref,
            address: address,
            lat: lat,
            lon: lon,
            contact_name: contact_name,
            contact_phone: contact_phone,
            contact_email: contact_email,
            load: load,
            notes: notes,
        });
    }

    console.log(nodos)

    fetch('/envio-plan-prueba', {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({nodos: nodos}),
    }).then((response) => response.json())
    .then((data) => {
        console.log('123', data)
        console.log('123', settingsPlan)
        if(data.pla.status == 'completed'){
            Swal.fire({
                icon: "success",
                title: "Tu ruta ha sido creada correctamente.",
                showConfirmButton: false,
                timer: 1250
            })
        }else{
            Swal.fire({
                icon: "error",
                title: "Ocurrió un error al crear tu ruta.",
                text: data.pla.invalid_visits[0],
                showConfirmButton: false,
                timer: 1250
            })
        }
    })
    .catch((error) => {
        console.error("Error al hacer fetch de envío1:", error);
    });

}