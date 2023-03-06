const Axios = require("axios")

const pokeNames = []

const getAllPokeNames = async (Pokemon) => {
    //recoleccion de Nombre API
    const { data } = await Axios('https://pokeapi.co/api/v2/pokemon?offset=1&limit=1008')
    data.results.forEach(element => {
        if (pokeNames.length < 1008)
            pokeNames.push(element.name)
    });
    
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