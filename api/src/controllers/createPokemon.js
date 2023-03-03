const { Pokemon } = require("../database")

module.exports = async (pokemon) => {
    const pokCreado = await Pokemon.create(pokemon)
    pokCreado.addTipos(pokemon.Tipo)
    console.log(pokCreado.dataValues)
    return pokCreado.dataValues
}

