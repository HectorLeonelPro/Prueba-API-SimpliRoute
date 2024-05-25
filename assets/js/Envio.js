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
        data: '{\n  "title": "Kwik e mart",\n  "address": "742 Evergreen Terrace, Springfield, USA",\n  "latitude": 44.052698,\n  "longitude": -123.020718,\n  "contact_name": "Apu Nahasapeemapetilon",\n  "contact_phone": "+123413123212",\n  "contact_email": "apu@example.com",\n  "reference": "invoice_id",\n  "notes": "Leave at front door",\n  "planned_date": "2025-05-25"\n}',
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
