const express=require('express');
const hbs=require('hbs');

const path=require('path');
const app=express();
const port=process.env.PORT || 3000
// const init = require('./config/sesion_seq');


app.set('view engine','hbs');
app.set('views',path.join(__dirname,'./views'));
hbs.registerPartials(path.join(__dirname, `./views/partials`));


// Configurar body-parser para manejar datos de formularios
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname,'/')));
// app.use('/empresa-logo',express.static(path.join(__dirname,'./Logo-Empresas')));

// app.use(init())

app.use(require('./routes/rt_index'))

// app.use('*', (req, res) => {  
//     res.redirect('./views/error_404/index-v1');
// });

app.listen(port,()=>{
    console.log(`Link del servidor http://localhost:${port}`)
})

require('./helpers/index')

