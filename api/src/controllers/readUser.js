const { User } = require("../database")

module.exports = async (UserName, Password) => {
    const resp = await User.findOne({
        where: { UserName, Password }
    })
    if (resp === null)
        throw new Error('Nombre de Usuario y/o Contraseña Incorrectos')
    else {
        return { ID: resp.dataValues.ID }
    }
}