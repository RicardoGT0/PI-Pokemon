module.exports=(pok) => {
    //genera una copia del objeto Pokemon.dataValues 
    //y lo complementa con el array de Tipos.Nombre
    const tipos = pok.Tipos.map(t=>t.Nombre)

    resultado = {
        ...pok.dataValues,
        ID: pok.dataValues.ID + 1008,
        Tipos: tipos
    }

    return resultado
}