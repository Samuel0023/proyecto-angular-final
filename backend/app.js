'use strict'

var express = require('express');
var app = express();

// archivos de rutas
var proyect_routes = require('./routes/project');

//middlewares

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//CORS y configuraciond de cabeceras
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas
// nota: ahora las tiene el controller
app.use('/', proyect_routes);

// app.get('/', (req, res) => {
//     res.status(200).send(
//         '<h1>Pagina de Inicio</h1>'
//     )
// })
// app.get('/test', (req, res) => {

//     res.status(200).send({
//         message: 'Hola mundo desde mi api de Nodejs'
//     })
// });


// app.post('/test/:id', (req, res) => {

//     console.log(req.body.nombre);
//     console.log(req.params.id);
//     res.status(200).send({
//         message: 'Hola mundo desde mi api de Nodejs'
//     })
// });
// exportar

module.exports = app;