const { Router } = require('express') // Pegando apenas o modulo Router do Express, so vai precisar disso aqui

const DevController = require('./controllers/DevController')
const SearcheController = require('./controllers/SearcheController')

const routes = Router()

// Sempre se tem a requisição e a resposta
// Quando eu acesso uma Rota eu estou fazendo uma requisição e ela tem uma resposta
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store); // store é o nome da função em devController

routes.get('/search', SearcheController.index)

module.exports = routes; // Exportando as rotas para que a aplicação conheça as rotas definidas aqui