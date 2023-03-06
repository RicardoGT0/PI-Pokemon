const { User } = require("../database")

module.exports = async (UserName, Password) => {
    const resp = await User.findOne({
        where: { UserName }
    })

    if (resp !== null)
        throw new Error(`El Usuario ${UserName} ya existe`)
    else {
        const newUser = await User.create({ UserName, Password })
        return { ID: newUser.dataValues.ID }
    }
}