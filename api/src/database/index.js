require('dotenv').config();
const { Sequelize } = require('sequelize');
const Pokemon = require('./models/Pokemon');
const Tipo = require('./models/Tipo');
const Relationships = require('./models/Relationships');
const User = require('./models/User');
const llenarTipos = require('./Utils/downloadTypes');
const { getAllPokeNames } = require('../controllers/utils/pokeNames');


const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const database = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pokemon_api`,
   {
      logging: false, // set to console.log to see the raw SQL queries
      native: false, // lets Sequelize know we can use pg-native for ~30% more speed
      force: false,
   }
);

Pokemon(database)
Tipo(database)
User(database)
Relationships(database)
/* llenarTipos(database)
   .then(message => console.log(message))
   .catch(error => console.log(error)) */
   
getAllPokeNames(database.models.Pokemon);
console.log('DataBase Model = ', database.models);

module.exports = {
   ...database.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
   database, // para importart la conexión { conn } = require('./db.js');
};

