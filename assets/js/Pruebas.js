
// function consultaVehiculos(e) {
//     e.preventDefault();
//     let id = document.getElementById('vehicle_id').value


//     var settings = {
//         async: true,
//         crossDomain: true,
//         url: `https://api.simpliroute.com/v1/routes/vehicles/${id}`,
//         method: "GET",
//         headers: {
//             "content-type": "application/json",
//             authorization: `Token 7d52c18aaeb322b0c1a3bf9bcb481ae9ee029495`,
//         },
//     };
//     fetch(settings.url, {
//         method: `${settings.method}`,
//         headers: settings.headers,
//     }).then((response) => response.json())
//         .then((data) => {
//             console.log('vehiculo', data)
//             let vehiculos = data
//         })
//         .catch((error) => {
//             console.error("Error al hacer fetch de recibir:", error);
//         });
// }

// function consultaConductor(e) {
//     e.preventDefault();
//     let id = document.getElementById('driver_id').value

//     var settings = {
//         async: true,
//         crossDomain: true,
//         url: `https://api.simpliroute.com/v1/accounts/drivers/${id}`,
//         method: "GET",
//         headers: {
//             "content-type": "application/json",
//             authorization: `Token 7d52c18aaeb322b0c1a3bf9bcb481ae9ee029495`,
//         },
//     };
//     fetch(settings.url, {
//         method: `${settings.method}`,
//         headers: settings.headers,
//     }).then((response) => response.json())
//         .then((data) => {
//             console.log('conductor', data)
//         })
//         .catch((error) => {
//             console.error("Error al hacer fetch de recibir:", error);
//         });

// }

// function vehiculosRuta(e) {
//     e.preventDefault();
//     let id = document.getElementById('planned_date').value

//     var settings = {
//         async: true,
//         crossDomain: true,
//         url: `https://api.simpliroute.com/v1/plans/${id}/vehicles/`,
//         method: "GET",
//         headers: {
//             "content-type": "application/json",
//             authorization: `Token 7d52c18aaeb322b0c1a3bf9bcb481ae9ee029495`,
//         },
//     };
//     fetch(settings.url, {
//         method: `${settings.method}`,
//         headers: settings.headers,
//     }).then((response) => response.json())
//         .then((data) => {
//             console.log('visitas de ruta', data)
//         })
//         .catch((error) => {
//             console.error("Error al hacer fetch de recibir:", error);
//         });

// }

// function visitasRuta(e) {
//     e.preventDefault();
//     let id = document.getElementById('route_id').value


//     var settings = {
//         async: true,
//         crossDomain: true,
//         url: `https://api.simpliroute.com/v1/plans/routes/${id}/visits/`,
//         method: "GET",
//         headers: {
//             "content-type": "application/json",
//             authorization: `Token 7d52c18aaeb322b0c1a3bf9bcb481ae9ee029495`,
//         },
//     };
//     fetch(settings.url, {
//         method: `${settings.method}`,
//         headers: settings.headers,
//     }).then((response) => response.json())
//         .then((data) => {
//             console.log('ruta', data)
//         })
//         .catch((error) => {
//             console.error("Error al hacer fetch de recibir:", error);
//         });

// }

// function visitaInfo(e) {
//     e.preventDefault();
//     let id = document.getElementById('visit_id').value

//     var settings = {
//         async: true,
//         crossDomain: true,
//         url: `https://api.simpliroute.com/v1/routes/visits/`,
//         method: "GET",
//         headers: {
//             "content-type": "application/json",
//             authorization: `Token 7d52c18aaeb322b0c1a3bf9bcb481ae9ee029495`,
//         },

//     };
//     fetch(settings.url, {
//         method: `${settings.method}`,
//         headers: settings.headers,
//     }).then((response) => response.json())
//         .then((data) => {
//              //console.log('visitas', data)
//             const resultado = data.find(visita => visita.reference === id);
//             console.log(resultado);
//         })
//         .catch((error) => {
//             console.error("Error al hacer fetch de recibir:", error);
//         });
// }

// function optimizacionInfo(e) {
//     e.preventDefault();
//     let id = document.getElementById('ident').value

//     var settings = {
//         async: true,
//         crossDomain: true,
//         url: `https://optimizator.simpliroute.com/v1/optimization/metadata/distance`,
//         method: "GET",
//         headers: {
//             "content-type": "application/json",
//             authorization: `Token 7d52c18aaeb322b0c1a3bf9bcb481ae9ee029495`,
//         },
//     };
//     fetch(settings.url, {
//         method: `${settings.method}`,
//         headers: settings.headers,
//         mode:'no-cors'
//     }).then((response) => response.json())
//         .then((data) => {
//             console.log('ruta', data)
//         })
//         .catch((error) => {
//             console.error("Error al hacer fetch de recibir:", error);
//         });
// }

// function ruta(e){
//     e.preventDefault();
//     let id = document.getElementById('ident').value

//    fetch('/busca_ruta', {
//         method: "POST",
//         headers: {"content-type": "application/json"},
//         body: JSON.stringify({id})
//         }).then((response) => (response.json()))
//         .catch((error) => {
//             console.error("Error al hacer fetch de buscar ruta:", error);
//         });
// }





function consultaVehiculos(e) {
    e.preventDefault();
    let id = document.getElementById('vehicle_id').value

   fetch('/busca_vehiculo', {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({id})
        }).then((response) => (response.json()))
        .catch((error) => {
            console.error("Error al hacer fetch de buscar ruta:", error);
        });
}

function consultaConductor(e) {
    e.preventDefault();
    let id = document.getElementById('driver_id').value

   fetch('/busca_conductor', {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({id})
        }).then((response) => (response.json()))
        .catch((error) => {
            console.error("Error al hacer fetch de buscar ruta:", error);
        });

}

function vehiculosRuta(e) {
    e.preventDefault();
    let id = document.getElementById('planned_date').value

   fetch('/busca_vehiculo_ruta', {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({id})
        }).then((response) => (response.json()))
        .catch((error) => {
            console.error("Error al hacer fetch de buscar ruta:", error);
        });

}

function visitasRuta(e) {
    e.preventDefault();
    let id = document.getElementById('route_id').value

   fetch('/busca_visitas_ruta', {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({id})
        }).then((response) => (response.json()))
        .catch((error) => {
            console.error("Error al hacer fetch de buscar ruta:", error);
        });
}

function visitaInfo(e) {
    e.preventDefault();
    let id = document.getElementById('visit_id').value

   fetch('/busca_visitas_info', {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({id})
        }).then((response) => (response.json()))
        .catch((error) => {
            console.error("Error al hacer fetch de buscar ruta:", error);
        });
}

function optimizacionInfo(e) {
    e.preventDefault();
    let id = document.getElementById('ident').value

   fetch('/busca_optimizacion_distancia', {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({id})
        }).then((response) => (response.json()))
        .catch((error) => {
            console.error("Error al hacer fetch de buscar ruta:", error);
        });
}

function consultaRuta(e){
    e.preventDefault();
    let id = document.getElementById('route_id').value

   fetch('/busca_ruta', {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({id})
        }).then((response) => (response.json()))
        .catch((error) => {
            console.error("Error al hacer fetch de buscar ruta:", error);
        });
}