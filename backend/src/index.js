const express = require('express') // Importando o express
const mongoose = require('mongoose') // Importando a biblioteca pra uso do Banco de Dados
const routes = require('./routes') // Pegando as rotas exportadas em routes


const app = express(); // Criando a aplicação

mongoose.connect('mongodb+srv://wes32:wes32@cluster0.dqkvioe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
// E algo que vai ser valido pra todas as rotas da aplicação, aqui no caso utilizar JSON
app.use(express.json()) // se fosse .get no lugar de use, seria algo que so seria valido para o get, por exemplo.
app.use(routes); // Todas as rotas cadastradas agora podem ser usadas

app.listen(3333); // Dizendo a porta que a aplicação vai rodar no servidor localhost