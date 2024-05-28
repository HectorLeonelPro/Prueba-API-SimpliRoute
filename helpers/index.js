const hbs = require('hbs')

hbs.registerHelper('esIgual', (val1, val2) => {
    return val1 === val2 ? true : false;
})

hbs.registerHelper("pagina",(link)=>{
    if(link.length>1){
        return link.substr(0,1)
    }else{
       return link
    }
    
})

hbs.registerHelper("numeroIgual", (n1, n2) =>{
    return n1==n2?true:false;
})

hbs.registerHelper("anterior",(link)=>{
    if(link.length>1){
        const actual=link.substr(0,1)
        if(actual==1){
            return false
        }else{
            anterior=parseInt(actual)-1;
            return anterior+link.substr(1,link.length)
        }
    }else{
        return false
    }
})

function createButton(param = {}) { //Función para crear botones dependiendo el nombre de la oclumna que se tenga-
    // Se recibira el nombre de la columna y el nombre de las columnas que queremos que tengan boton
    if(param.aceptados.includes(param.nombre))return true
    else return false
}

hbs.registerHelper('columnas',(tabla, orden)=>{
    let columnas=[]
    let html='';
    switch(tabla){
        case 'vacantes':
            columnas.push({nombre:'ID', id:'idVac'},{nombre:'Vacante', id: 'nombreVac'},
                          {nombre:'Empresa', id: 'empresaVac'},{nombre:'Sucursal', id: 'sucursalVac'},
                          {nombre:'Area laboral', id: 'areaVac'},{nombre: 'Jornada', id: 'jornadaVac'},
                          {nombre: 'Salario', id: 'salarioVac'},{nombre:'Fecha de publicación', id: 'fechaVac'},
                          {nombre:'Estatus', id: 'estatusVac'},{nombre:'Opciones', id: 'Vac'})
        break;
        case 'empresas':
            columnas.push({nombre:'ID', id:'idEmp'},{nombre:'Empresa', id:'nombreEmp'},
                          {nombre:'Dirección', id:'direccionEmp'},{nombre:'Fecha de creación', id:'fechaEmp'},
                          {nombre:'Estatus', id:'estatusEmp'},{nombre:'Opciones', id:'accionesEmp'})
        break;
    }
    columnas.forEach((elemento)=>{
        html+=`<th scope="col" class=""
            onclick="if (!window.__cfRLUnblockHandlers) return false; ordenamiento('${elemento.nombre}')">
            <div class="d-flex gap-10">
                <div class="d-flex align-items-center">${elemento.nombre}</div>
                 <small>${orden.split('-')}</small>  

                <div class="orden-info">
                ${createButton({nombre: elemento.nombre, aceptados: ['ID', 'Salario', 'Vacante', 'Empresa', 'Fecha de creación', 'Fecha de publicación']})
                ? `<button class="toggle-info btn text-white" onclick="ordenFiltro({id: '${elemento.id}',nombre: '${elemento.nombre}'})"><i id='${elemento.id}'
            
                ${ orden.includes(elemento.nombre == 'Fecha de publicación' ? 'publicacion':
                    elemento.nombre == 'Fecha de creación'? 'creacion': elemento.nombre )?`class= 'bx bx-sort-down'`:
                      `class= 'bx bx-sort-up'` }
                ></i></button>`: ''}         
                </div>
            </div>
        </th>` 
    })

    return html;
})

hbs.registerHelper("inc", function(value, options)
{
    return value + 1;
});

hbs.registerHelper('or',(valor1,valor2)=>{
    if(valor1 == true || valor2 == true){
        return true
    }else{
        return false
    }
})

hbs.registerHelper('eq',(valor1,valor2)=>{
    if(valor1==valor2){
        return true
    }else{
        return false
    }
})

hbs.registerHelper('eqN',(valor1,valor2)=>{
    if(valor1!=valor2){
        return true
    }else{
        return false
    }
})

hbs.registerHelper('AND', (valor1, valor2) =>{
    return (valor1.length != 0 && valor2.length != 0) ? true : false
})

hbs.registerHelper('lon',(valor1,valor2)=>{
    const indice=(valor1+1)==valor2?true:false;
    return indice;
})

hbs.registerHelper('inc',(valor1)=>{
    return valor1+1
})

hbs.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});