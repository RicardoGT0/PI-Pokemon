const { Pokemon } = require("../database")

module.exports = async (pokemon) => {
    const pokCreado = await Pokemon.create(pokemon)
    pokCreado.addTipos(pokemon.Tipo)
    resultado = {
        ...pokCreado.dataValues,
        ID: pokCreado.dataValues.ID + 1008
    }
    console.log(resultado)
    return resultado
}

