
function insertardatos(visitaId, trackingId, routeId, reference) {
    fetch('/inserta_datos', {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ visitaId , trackingId, routeId , reference   })
    }).then((response) => (response.json()))
    .catch((error) => {
        console.error("Error al hacer fetch de insertar datos:", error);
    });
    // console.log('ID: ', visitaId);
    // console.log('TRACKING ID: ', trackingId);
    // console.log('ID ROUTE: ', routeId);
    // console.log('REFERENCE:', reference);
    // console.log(111111111111111111);


}

module.exports = {
    insertardatos
}
