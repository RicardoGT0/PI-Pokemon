const { DataTypes } = require('sequelize');

module.exports = (database) => {

    database.define('Team', {
        UserID: {
            type: DataTypes.INTEGER,
            allowNull: false,

        },
        PokemonID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: false
    });
};