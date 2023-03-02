const { DataTypes } = require('sequelize');

module.exports = (database) => {
    database.define('User', {
        ID: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        UserName: {
          type: DataTypes.STRING,
          unique: true,
        },
        Password:{
            type: DataTypes.STRING
        }
    })
}
