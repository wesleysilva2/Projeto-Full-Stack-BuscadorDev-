const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

// Controlers geralmente tem 5 funções, são elas:  Index, Show, Store, Update, Destroy

module.exports = {

    async index (request, response) {
        const devs = await Dev.find(); // Se eu quisesse por filtro seria aqui, por exemplo um nome especifico

        return response.json(devs);
    },
    
    async store (request, response) { // async pois pode haver aguardo em respostas
        const {github_username, techs, latitude, longitude} = request.body; // O corpo da requisição das informações

        let dev = await Dev.findOne({ github_username }) // checando se tem um dev ja cadastrado com esse username na base

        if(!dev){ // Se o dev não existir la eu cadastro
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`); // await pois deve esperar a resposta
        
            // console.log(apiResponse.data); Teste dos dados do git, acessado através do .data

            const {name = login, avatar_url, bio} = apiResponse.data;

            const techsArray = parseStringAsArray(techs)
            
            // Dados do PointOnMap... e location do Dev.js
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude] // Precisar ser nessa ordem
            }

            dev = await Dev.create({ // Não precisou de : nas outras pois esta com o mesmo nome la em Dev.js
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }

        return response.json(dev); 
    },

    async update(request, response){
       const {github_username} = request.query; // Captura o github user do desenvolvedor que sera usado como um ID pra identificar
       const {name, bio, techs, latitude, longitude, avatar_url} = request.body; // Dados a serem atualizados
       
       // Verifica se o desenvolvedor existe
       let dev = await Dev.findOne({ github_username })

       if(!dev){
          return response.status(404).json({error: 'Desenvolvedor não encontrado na base de dados'});
       }

       // Atualiza os dados do desenvolvedor
       if(techs){
        dev.techs = parseStringAsArray(techs);
       }

       if(latitude && longitude){
        dev.location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        };
       }

       if(name){
        dev.name = name;
       }

       if(bio){
        dev.bio = bio;
       }

       if(avatar_url){
        dev.avatar_url = avatar_url;
       }
       
       // Salva as alterações no banco de dados
       await dev.save();
       
       // Retorna o desenvolvedor atualizado
       return response.json(dev);
    },

    async destroy(request, response){
        const {github_username} = request.query;

        let dev = await Dev.findOne({ github_username });

        if(!dev){
            return response.status(404).json({error: 'Desenvolvedor não encontrado na base de dados'});
        }

        await dev.deleteOne();

    }
}