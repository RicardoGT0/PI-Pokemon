const { Team } = require('../../database')

module.exports = async (UserID, PokemonID, memberID) => {
    UserID = Number(UserID)
    PokemonID = Number(PokemonID)
    memberID = Number(memberID)
    console.log(UserID, PokemonID, memberID)

    const actualizado = await Team.update(
        { PokemonID },
        { where: { UserID, memberID } }
    )

    if (actualizado == 0) {
        const [pokemon, created] = await Team.findOrCreate({ where: { UserID, PokemonID, memberID } })
        return { message: `Equipo Actualizado: Miembro Agregado` }
    } else {
        return { message: `Equipo Actualizado: Miembro Reemplazado` }
    }
}