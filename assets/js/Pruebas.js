
function consultaVehiculos(e) {
    e.preventDefault();
    let id = document.getElementById('vehicle_id').value
   

    var settings = {
        async: true,
        crossDomain: true,
        url: `https://api.simpliroute.com/v1/routes/vehicles/${id}`,
        method: "GET",
        headers: {
            "content-type": "application/json",
            authorization: `Token 7d52c18aaeb322b0c1a3bf9bcb481ae9ee029495`,
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

function consultaConductor(e) {
    e.preventDefault();
    let id = document.getElementById('driver_id').value

    var settings = {
        async: true,
        crossDomain: true,
        url: `https://api.simpliroute.com/v1/accounts/drivers/${id}`,
        method: "GET",
        headers: {
            "content-type": "application/json",
            authorization: `Token 7d52c18aaeb322b0c1a3bf9bcb481ae9ee029495`,
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



function vehiculosRuta(e) {
    e.preventDefault();
    let id = document.getElementById('route_id').value

    var settings = {
        async: true,
        crossDomain: true,
        url: `https://api.simpliroute.com/v1/accounts/drivers/${id}`,
        method: "GET",
        headers: {
            "content-type": "application/json",
            authorization: `Token 7d52c18aaeb322b0c1a3bf9bcb481ae9ee029495`,
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

function visitasRuta(e) {
    e.preventDefault();
    let id = document.getElementById('route_id').value

    var settings = {
        async: true,
        crossDomain: true,
        url: `https://api.simpliroute.com/v1/accounts/drivers/${id}`,
        method: "GET",
        headers: {
            "content-type": "application/json",
            authorization: `Token 7d52c18aaeb322b0c1a3bf9bcb481ae9ee029495`,
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
