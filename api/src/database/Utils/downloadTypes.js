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
        downInfo.forEach(async tipo => {
            const Nombre = tipo.name           
            const t= await Tipo.create({Nombre})
        });
    } catch (error) {
        return error
    }

}

module.exports = llenarTipos