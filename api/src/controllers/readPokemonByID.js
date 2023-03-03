const axios = require("axios");
const { Pokemon } = require("../database")

const URL = 'https://pokeapi.co/api/v2/pokemon/'

module.exports = async (id) => {
    id = Number(id)
    if (id > 1008) {
        id -= 1008
        const pok = await Pokemon.findByPk(id)
        if (pok === null) {
            throw new Error('No Existe el Pokemon con ese ID!');
        } else {
            return pok.dataValues
        }
    }
    if (id > 0 && id <= 1008) {
        const { data } = await axios(URL + id)
        
        tipos = data.types.map(type => type.name)
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
        console.log('DATA: ',pok);
        return pok
    }
    throw new Error('ID invalido')
}
