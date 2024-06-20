const { descarga } = require('../../db/db')

// const iniciarDescargaInformacion = () => {
//     let ejecutarProceso = () => {
//         guardardatos((response3) => {
//             setTimeout(() => {
//                 ejecutarProceso()
//             }, 5000)
//         })
//     }
//     try {
//         ejecutarProceso()
//     } catch (error) {
//         ejecutarProceso()
//     }
// }

// setTimeout(() => {
//     iniciarDescargaInformacion()
// }, 1000)

const iniciarDescargaInformacion = () => {
    let ejecutarProceso = async () => {
        try {
            await guardardatos();
        } catch (error) {
            console.error("Error en ejecutarProceso:", error);
        } finally {
            setTimeout(() => {
                ejecutarProceso();
            }, 2000);
        }
    }

    ejecutarProceso();
}

setTimeout(() => {
    iniciarDescargaInformacion();
}, 1000);


async function guardardatos() {
    console.log('INICIO');
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

    try {
        const response = await fetch(settings.url, {
            method: `${settings.method}`,
            headers: settings.headers,
        });
        const data = await response.json();
        

        for (const visita of data) {
            console.log('ENTRO')
            let visitaId = visita.id || 'NO EXISTE';
            let trackingId = visita.tracking_id || 'NO EXISTE';
            let routeId = visita.route || 'NO EXISTE';
            let reference = visita.reference || 'NO EXISTE';

            // await descarga.insertardatos({visitaId,trackingId,routeId,reference})
            let datos = (await descarga.insertardatos({visitaId,trackingId,routeId,reference})).datos[0].RESULT
            console.log(datos)
        }

    } catch (error) {
        console.error("Error al hacer fetch de recibir:", error);
    }
}

