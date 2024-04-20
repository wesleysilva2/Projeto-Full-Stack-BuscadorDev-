const express = require('express') // Importando o express
const mongoose = require('mongoose') // Importando a biblioteca pra uso do Banco de Dados
const cors = require('cors')
const http = require('http')

const routes = require('./routes') // Pegando as rotas exportadas em routes
const { setupWebsocket } = require('./websocket'); // Pegando função websocket

const app = express(); // Criando a aplicação
// Com isso eu tenho meu servidor http fora do express
// Assim eu posso trabalhar com ele individualmente agora
const server = http.Server(app); 

setupWebsocket(server); // Configurar servidor pra ouvir requisições webSocket

mongoose.connect('mongodb+srv://wes32:wes32@cluster0.dqkvioe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
// E algo que vai ser valido pra todas as rotas da aplicação, aqui no caso utilizar JSON
app.use(cors()); // Liberando o acesso externo pra todo tipo de apliocação, da pra definir aqui mesmo se quiser especifica
app.use(express.json()) // se fosse .get no lugar de use, seria algo que so seria valido para o get, por exemplo.
app.use(routes); // Todas as rotas cadastradas agora podem ser usadas

server.listen(3333); // Dizendo a porta que a aplicação vai rodar no servidor localhost