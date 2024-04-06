// Importamos de novo, pois precisamos informar o formato que um dev ter na nossa base de dados
const mongoose = require('mongoose');
const PointOnMapSchema = require('./utils/PointOnMapSchema');

// Schema é a estruturação de uma entidade no banco de dados
const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String], // Vetor de Strings, ja que pode ser mais de 1 tec
    location:{
        type: PointOnMapSchema,
        index: '2dsphere' // Sempre que mexe com geolocalização tem que usar um index
    }
});

module.exports = mongoose.model('Dev', DevSchema); // Dev é como vai aparecer no banco 