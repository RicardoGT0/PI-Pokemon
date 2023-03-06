const { Pokemon } = require("../../database")
const readPokemonByID = require("./readPokemonByID")
const { pokeNames } = require("../utils/pokeNames")

module.exports = async (pokemon) => {    
    pokemon.Nombre=pokemon.Nombre.toLowerCase()
    const pokCreado = await Pokemon.create(pokemon)
    await pokCreado.addTipos(pokemon.Tipo)
    const id = pokCreado.dataValues.ID + 1008
    const pok = await readPokemonByID(id)
    pokeNames.push(pok.Nombre)
    return pok
}

