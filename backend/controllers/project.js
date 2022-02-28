'use strict'

var Project = require('../models/project');
var fs = require('fs');
var path = require('path');

var controller = {
    home: function(req, res) {
        return res.status(200).send({
            message: 'Soy la Home'
        })
    },

    test: function(req, res) {
        return res.status(200).send({
            message: 'Soy el mettodo test'
        });
    },

    saveProject: function(req, res) {
        let project = new Project();

        let params = req.body;

        project.name = params.name;
        project.description = params.descripcion;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;
        if (projectNoExist(project)) {
            project.save((err, projectStored) => {
                if (err) return res.status(500).send({ message: 'error al guardar el documento', project: project });


                return res.status(200).send({
                    message: 'Archivo Guardado!!!!!',
                    project: projectStored
                })
            })
        } else {
            res.status(404).send({ message: 'No se a podido guardar el projecto' });
        }
    },

    getProject: function(req, res) {
        var projectId = req.params.id;

        Project.findById(projectId, (err, project) => {
            if (err) return res.status(500).send({ message: 'Error al obtener los datos' });

            if (!project || project == null) return res.status(404).send({ message: 'El projecto no existe' });

            return res.status(200).send({
                project
            })
        });
    },

    getProjectsInYear(req, res) {
        var yearProjects = req.params.year;

        Project.find({ year: yearProjects }).exec((err, projects) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });

            if (!projects) return res.status(404).send({ message: 'No se encontraron projects' });

            return res.status(200).send({ projects });
        })

    },
    getProjects: function(req, res) {
        Project.find().exec((err, projects) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });

            if (!projects) return res.status(404).send({ message: 'No se encontraron projects' });

            return res.status(200).send({ projects });

        })
    },
    updateProjet: function(req, res) {
        let projectId = req.params.id;
        let update = req.body;

        Project.findByIdAndUpdate(projectId, update, { new: true }, (err, projectUpdated) => {
            if (err) return res.status(500).send({ message: 'Error al actualizar' });

            if (!projectUpdated) return res.status(404).send({ message: 'No existe el proyecto para actualizarlo' });

            return res.status(200).send({
                project: projectUpdated
            });
        });
    },

    deleteProject: function(req, res) {
        let projectId = req.params.id;

        Project.findByIdAndRemove(projectId, (err, projectRemoved) => {
            if (err) return res.status(500).send({ message: 'Error al borrar el projecto' });

            if (!projectRemoved) return res.status(404).send({ message: 'No existe el proyecto para actualizarlo' });

            return res.status(200).send({
                message: `El projecto ${projectRemoved.name} a sido borrado`
            });
        });
    },

    uploadImage: function(req, res) {
        let projectId = req.params.id;
        let fileName = 'Imagen no subida...';

        if (req.files) {
            let filePath = req.files.image.path;
            let fileName = getFileName(filePath);

            if (esFormatoValido(fileName)) {
                Project.findByIdAndUpdate(projectId, { image: fileName }, { new: true }, (err, projectUpdated) => {
                    if (err) return res.status(500).send({
                        message: 'La imagen no se ha subido'
                    })
                    if (!projectUpdated) return res.status(404).send({
                        message: 'el projecto no existe'
                    })
                    return res.status(200).send({
                        files: projectUpdated
                    });
                })
            } else {
                fs.unlink(filePath, (err) => {

                    return res.status(404).send({ message: 'formato incopatible' });
                })
            }


        } else {
            return res.status(404).send({ message: 'no se encuentra la imagen' })
        }
    },

    getImageFile: function(req, res) {
        let file = req.params.image;
        let path_file = './uploads/' + file;

        fs.stat(path_file, (err) => {
            if (!err) {

                return res.sendFile(path.resolve(path_file));
            } else {

                return res.status(200).send({ message: 'no se encuentra la imagen' })
            }

        });
    }
};

let getFileName = (filePath) => {
    let fileSplit = filePath.split('\\');
    return fileSplit[1];
}
let esFormatoValido = (fileName) => {
    let formato = fileName.split('\.');
    return formato[1] == 'png' || formato[1] == 'jpg' || formato[1] == 'jpeg' || formato[1] == 'gif';
}


let projectNoExist = (project) => {
    return true;
}
module.exports = controller;