const { DataTypes } = require('sequelize');

module.exports = (database) => {

  database.define('Pokemon', {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    Nombre: {
      type: DataTypes.TEXT,
    },
    Imagen: {
      type: DataTypes.TEXT,
    },
    Vida: {
      type: DataTypes.INTEGER,
    },
    Ataque: {
      type: DataTypes.INTEGER,
    },
    Defensa: {
      type: DataTypes.INTEGER,
    },
    Velocidad: {
      type: DataTypes.INTEGER,
    },
    Ataque_Especial: {
      type: DataTypes.INTEGER,
    },
    Defensa_Especial: {
      type: DataTypes.INTEGER,
    },
    Altura: {
      type: DataTypes.INTEGER,
    },
    Peso: {
      type: DataTypes.INTEGER,
    },
  },
    {
      timestamps: false
    });
};
