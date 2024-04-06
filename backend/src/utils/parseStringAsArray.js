
// Separando a string techs por virgula, ja que é um array, ja o tech.trim é para remover os espaçamentos, com o map se pode executar ali o que precisar
module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map(tech => tech.trim());
}