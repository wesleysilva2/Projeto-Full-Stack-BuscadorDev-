const Dev = require ('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

// Buscar todos os devs num raio de 10km 
// Filtrar por tecnologias
module.exports = {
    async index(request, response){
        const { latitude, longitude, techs} = request.query;

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs:{
                $in: techsArray, // Os devs que tem as tecnologias passadas, operador in
            },
            location: {
                $near:{
                    $geometry:{ // Pegando a posição 
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000, // Definindo 10km como proximidade do ponto definido
                },
            },
        });

        return response.json({ devs });
    }
}