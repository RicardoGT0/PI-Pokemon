const readPokemonByID = require("./readPokemonByID")
const { pokeNames } = require("./utils/pokeNames")

module.exports = async (page = 1) => {
    const listaPokes = []
    for (let id = 1; id <= 12; id++) {
        if (id + ((page - 1) * 12) < pokeNames.length) {
            const pok = await readPokemonByID(id + ((page - 1) * 12))
            listaPokes.push(pok)
        }
    }
    return listaPokes
}