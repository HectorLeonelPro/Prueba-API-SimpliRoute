


const datos = {

}

function send(){
    var settings = {
        async: true,
        crossDomain: true,
        url: "https://api.simpliroute.com/v1/accounts/me/",
        method: "GET",
        headers: {
            "content-type": "application/json",
            authorization: "5feae79e649ed6759936980caad4224566b30d39",
        },
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
    });

    fetch("/envio-datos-api", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
    }).then((response) => response.json())
    .catch((error) => {
        console.error("Error al hacer fetch de envío:", error);
    });

}
