const Axios = require("axios")

const pokeNames = []

const getAllPokeNames = async (Pokemon, URL = 'https://pokeapi.co/api/v2/pokemon') => {
    //recoleccion de Nombre API
    const { data } = await Axios(URL)
    data.results.forEach(element => {
        if (pokeNames.length < 1008)
            pokeNames.push(element.name)
    });
    if (data.next != null && pokeNames.length < 1008) {
        getAllPokeNames(Pokemon, data.next)
    }
    // recoleccion de nombres DB
    if (pokeNames.length >= 1008) {
        const pokes = await Pokemon.findAll({
            attributes: ['Nombre']
        });
        pokes.forEach(element => {
            pokeNames.push(element.Nombre)
        });
        console.log('Pokemons Registrados: ', pokeNames.length);
    }
}

module.exports = { pokeNames, getAllPokeNames }