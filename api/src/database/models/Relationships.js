
module.exports = (database) => {
    const { Pokemon, Tipo } = database.models

    Pokemon.belongsToMany(Tipo, { through: 'Tipo_Pokemon' });
    Tipo.belongsToMany(Pokemon, { through: 'Tipo_Pokemon' });    
}