const axios = require("axios");
const { Pokemon, Tipo } = require("../../database");
const EquivalentTypes = require("../utils/EquivalentTypes");
const extractPokFromConsult = require("../utils/extractPokFromConsult");

const URL = 'https://pokeapi.co/api/v2/pokemon/'

module.exports = async (id) => {
    id = Number(id)
    if (id > 1008) {
        id -= 1008
        const pok = await Pokemon.findByPk(id, {include:Tipo})
        if (pok === null) {
            throw new Error('No Existe el Pokemon con ese ID!');
        } else {
            return extractPokFromConsult(pok)
        }
    }
    if (id > 0 && id <= 1008) {
        const { data } = await axios(URL + id)
        
        const tipos = data.types.map(t => EquivalentTypes(t.type.name))
        const pok = {
            "ID": data.id,
            "Nombre": data.name,
            "Imagen": data.sprites.other["official-artwork"].front_default,
            "Vida": data.stats[0].base_stat,
            "Ataque": data.stats[1].base_stat,
            "Defensa": data.stats[2].base_stat,
            "Velocidad": data.stats[5].base_stat,
            "Ataque_Especial": data.stats[3].base_stat,
            "Defensa_Especial": data.stats[4].base_stat,
            "Altura": data.height,
            "Peso": data.weight,
            "Tipo": tipos
        }
        return pok
    }
    throw new Error('ID invalido')
}
