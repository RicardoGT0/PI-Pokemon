const { Team } = require('../../database')

module.exports = async (UserID, memberID) => {
    const resp = await Team.destroy({ where: { UserID, memberID } })
    if (resp) 
        return { message: `Miembro del equipo borrado` }
    else 
        throw new Error('No se Encontro al Miembro a Eliminar')
}