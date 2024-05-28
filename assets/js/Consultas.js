function consultaVehiculos() {
    console.log('click vehiculo')

    var settings = {
        async: true,
        crossDomain: true,
        url: "https://api.simpliroute.com/v1/routes/vehicles/",
        method: "GET",
        headers: {
            "content-type": "application/json",
            authorization: "Token 5feae79e649ed6759936980caad4224566b30d39",
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
            authorization: "Token 5feae79e649ed6759936980caad4224566b30d39",
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
