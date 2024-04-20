const socketio = require ('socket.io');

const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance')

// É preciso armazer todas as conexões que a aplicação teve, Normalmente isso é feito com o BD
// Mas como aqui é apenas um teste, sera salvo na memoria do node, numa variavel
let io;
const connections = [];

exports.setupWebsocket = (server) => {
    io = socketio(server);

    //Todas vez que eu receber uma conexão eu recebo um objeto socket
    io.on('connection', socket => {
        const {latitude, longitude, techs} = socket.handshake.query;

        console.log(socket.handshake.query);

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs),
        });
    });
};

exports.findConnections = (coordinates, techs) => {
    return connections.filter(connection => {
        return calculateDistance(coordinates, connection.coordinates) < 10
        && connection.techs.some(item => techs.includes(item)) // checando se a tech passada tem no array
    })
}

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => { // Vou percorrer cada um dos destinatarios com o forEach
        io.to(connection.id).emit(message, data); // pra quem eu quero enviar a mensagem e os dados dela
    }) 
}