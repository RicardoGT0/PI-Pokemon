const { User } = require("../database")

module.exports = async (ID) => {
    const resp = await User.destroy({
        where: {
            ID
        }
    });

    if (resp)
        return { Message: 'Borrado Exitoso' }
    else
        throw new Error('Error al Eliminar Usuario, intente de nuevo')
}