const { Team } = require('../../database')

module.exports = async (UserID, PokemonID, memberID) => {
    let resp = await Team.update(
        { PokemonID },
        { where: { UserID, memberID } }
    )
    if (!resp) {
        resp = await Team.create({ UserID, PokemonID, memberID })
    }

    return { message: `Equipo Actualizado` }

}