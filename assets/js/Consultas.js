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
