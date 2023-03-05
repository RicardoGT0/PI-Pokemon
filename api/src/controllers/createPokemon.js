const { Pokemon } = require("../database")
const readPokemonByID = require("./readPokemonByID")

module.exports = async (pokemon) => {
    const pokCreado = await Pokemon.create(pokemon)
    await pokCreado.addTipos(pokemon.Tipo)
    const id = pokCreado.dataValues.ID + 1008
    const pok = await readPokemonByID(id)
    return pok
}

