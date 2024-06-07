


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

                <label><b>Destino ${i}</b></label> 

            </div> 

            <div class="form-group">

                <label>Cedis: *</label>

                <select id="cedis_${i}" name="cedis_${i}" onchange="buscarCedis(this.value, this.id)">
                    <option selected hidden>Cedis</option>
                    <option value="1">Cedis Tampico</option>
                    <option value="2">Cedis Reynosa</option>
                    <option value="3">Cedis Monterrey</option>
                </select>

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

        </div>

    `
    document.getElementById('paquetes').insertAdjacentHTML('beforeend', paquete);
        var map = L.map(`map_${i}`).setView([22.216743, -97.85672], 13).on('click', onMapClick);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
    ;

    }
}

function buscarCedis(valor, id){
    let i = id.split('_')[1]
    
    const cedis_tam = {
        address: "Blvrd A. López Mateos 604, Nuevo Aeropuerto, 89337 Tampico, Tamps., México",
        lat: "22.288048",
        lon: "-97.870772",
    }
    const cedis_rey = {
        address: "Blvd.las Fuentes 802, Aztlán, 88740 Reynosa, Tamps., México",
        lat: "26.0704046",
        lon: "-98.3215182",
    }
    const cedis_mty = {
        address: "Av. Benito Juárez 101, Centro, 64000 Monterrey, Nuevo Leon, México",
        lat: "25.66703",
        lon: "-100.31084",
    }

    switch(valor){
        case '1':
            document.getElementById(`address_${i}`).value = cedis_tam.address
            document.getElementById(`latitude_${i}`).value = cedis_tam.lat
            document.getElementById(`longitude_${i}`).value = cedis_tam.lon
            consultaGeolocalizacion(cedis_tam.address, id)
            break;
        case '2':
            document.getElementById(`address_${i}`).value = cedis_rey.address
            document.getElementById(`latitude_${i}`).value = cedis_rey.lat
            document.getElementById(`longitude_${i}`).value = cedis_rey.lon
            consultaGeolocalizacion(cedis_rey.address, id)
            break;
        case '3':
            document.getElementById(`address_${i}`).value = cedis_mty.address
            document.getElementById(`latitude_${i}`).value = cedis_mty.lat
            document.getElementById(`longitude_${i}`).value = cedis_mty.lon
            consultaGeolocalizacion(cedis_mty.address, id)
            break;
    }
}

function validar(input) {
    input.value = input.value.replace(/e/gi, '');
    input.value = input.value.replace(/-/g, '');
}

async function consultaGeolocalizacion(direccion, id){
    let parametro = direccion
    parametro = parametro.replace(/ /g, '%')
    parametro = parametro.replace(/,/g, '%,')
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

async function crearRuta(e){
    e.preventDefault()

        let nodos = [];
        let numPaquetes = (document.getElementById('paquetes').children).length;
        let salida = document.getElementById(`salida`).options[document.getElementById(`salida`).selectedIndex].text

        for (let i = 0; i < numPaquetes; i++) {
            let idref = document.getElementById(`cedis_${i + 1}`).options[document.getElementById(`cedis_${i + 1}`).selectedIndex].text;
            let address = document.getElementById(`address_${i + 1}`).value;
            let lat = document.getElementById(`latitude_${i + 1}`).value;
            let lon = document.getElementById(`longitude_${i + 1}`).value;

            nodos.push({
                ident: idref,
                address: address,
                lat: lat,
                lon: lon,
            });
        }

        console.log(99999,nodos)
    
        fetch('/envio-plan-nacional', {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({salida: salida, nodos: nodos}),
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