function fecha(){
    var moment = require('moment');
    moment.locale('es-mx');
    var now = moment().format("YYYY/MM/DD HH:mm:ss");
    return now;
}

function año(){
    var moment=require('moment')
    moment.locale('es-mx');
    var now=moment().format('YYYY')
    return now;
}

function formatoFecha(cadena){
    if (!(cadena.length > 0)) {
        return null
    }
    const año=cadena.substr(6,4)
    const mes=cadena.substr(3,2)
    const dia=cadena.substr(0,2)
    const hora=cadena.substr(11,2)
    const minuto=cadena.substr(14,2)
    const segundo=cadena.substr(17,2)
    const fechaForm=`${año}-${mes}-${dia} ${hora}:${minuto}:${segundo}.000`
    return fechaForm ;
}

module.exports={fecha, año, formatoFecha}