const axios = require("axios")
const URL = 'https://pokeapi.co/api/v2/type'


const downloadTypes = async () => {
    const { data } = await axios(URL)
    return data.results
}

const llenarTipos = async (database) => {
    const { Tipo } = database.models
    try {
        const downInfo = await downloadTypes()
        const nombres = downInfo.map(tipo => {
            return { Nombre: tipo.name }
        })
        const resultado = await Tipo.bulkCreate(nombres)
        return 'Llenado de tabla Tipo - completado (' + resultado.length + ')'
    } catch (error) {
        return error
    }

}

module.exports = llenarTipos