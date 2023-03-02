const { DataTypes } = require('sequelize');

module.exports = (database) => {

  database.define('Tipo', {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    Nombre: {
      type: DataTypes.INTEGER,
    },
  },
    {
      timestamps: false
    });
}
