'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProjectSchema = Schema({
    name: String,
    descripcion: String,
    category: String,
    year: Number,
    langs: String,
    image: String
});

mongoose.set('useFindAndModify', false);


module.exports = mongoose.model('Project', ProjectSchema);

//projects --> guarda los doc en esa coleccion