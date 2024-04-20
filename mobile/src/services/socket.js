import socketio from 'socket.io-client';


const socket = socketio('http://192.168.2.102:3333', {
    autoConnect: false,
});
// Essa função vai ficar ouvindo o evento new dev pra poder mostrar o novo dev cadastrado na tela
function subscribeToNewDevs(subscribeFunction){ 
    socket.on('new-dev',subscribeFunction);
}

function connect(latitude, longitude, techs){
    // Enviando para o backend os dados passados na conexão, no load ao usuario clicar no botão
    socket.io.opts.query = {
        latitude, 
        longitude,
        techs,
    };

    socket.connect();
   
}

function disconnect(){
    if(socket.connected){
        socket.disconnect();
    }
}

export {
    connect, 
    disconnect,
    subscribeToNewDevs,
};