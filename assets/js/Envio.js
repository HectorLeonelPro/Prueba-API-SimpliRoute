function send(){
    console.log('asd')

    // FETCH DE POST

    var settings = {
        async: true,
        crossDomain: true,
        url: "https://api.simpliroute.com/v1/routes/visits/",
        method: "POST",
        headers: {
            "content-type": "application/json",
            authorization: "Token 5feae79e649ed6759936980caad4224566b30d39",
        },
        processData: false,
        data: '{\n  "title": "Kwik e mart",\n  "address": "Jose de Escandon 308, Zona Centro",\n  "contact_name": Javier Alejandro",\n  "contact_phone": "+528332187293",\n  "contact_email": "",\n  "reference": "invoice_id",\n  "notes": "Leave at front door",\n  "planned_date": "2025-05-25"\n}',
    };
    fetch(settings.url, {
    method: `${settings.method}`,
    headers: settings.headers,
    body: settings.data,
    }).then((response) => response.json())
    .then((data) => {
        console.log('123', data)
    })
    .catch((error) => {
        console.error("Error al hacer fetch de envío:", error);
    });


    // FETCH DE GET


    // var settings = {
    //     async: true,
    //     crossDomain: true,
    //     url: "https://api.simpliroute.com/v1/routes/visits/1231231/",
    //     method: "DELETE",
    //     headers: {
    //         "content-type": "application/json",
    //         authorization: "Token 5feae79e649ed6759936980caad4224566b30d39",
    //     },
    // };
    // fetch(settings.url, {
    // method: `${settings.method}`,
    // headers: settings.headers,
    // }).then((response) => response.json())
    // .then((data) => {
    //     console.log('123', data)
    // })
    // .catch((error) => {
    //     console.error("Error al hacer fetch de envío:", error);
    // });
}
