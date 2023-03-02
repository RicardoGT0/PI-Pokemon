
module.exports = (database) => {
    const { Pokemon, Tipo, User } = database.models

    Pokemon.belongsToMany(Tipo, { through: 'Tipo_Pokemon' });
    Tipo.belongsToMany(Pokemon, { through: 'Tipo_Pokemon' });    
    User.belongsToMany(Pokemon, { through: 'Team_User_Pokemon' });
    Pokemon.belongsToMany(User, { through: 'Team_User_Pokemon' });
}