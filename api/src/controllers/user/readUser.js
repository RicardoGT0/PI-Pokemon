const { User } = require("../../database")

module.exports = async (UserName, Password) => {
    const [resp,created] = await User.findOrCreate({
        where: { UserName, Password }
    })
   
    if (resp === null)
        throw new Error('Nombre de Usuario y/o Contraseña Incorrectos')
    else {        
        return { id: resp.dataValues.ID, created:created }
    }
}