
const { Tipo } = require("../../database")

module.exports = async () => {
    const allTipos = await Tipo.findAll()
    const resultado = allTipos.map(tipo => {
        return tipo.dataValues
    })    
    return resultado
}


