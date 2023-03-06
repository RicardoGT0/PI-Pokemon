const { User } = require("../../database")

module.exports = async (ID, Password) => {

    const [resp] = await User.update({ Password }, {
        where: {
            ID
        }
    });
    if (resp)
        return { Message: 'Cambio de Contraseña Exitoso' }
    else
        throw new Error('Error al Cambiar la Contraseña, intente de nuevo')
}