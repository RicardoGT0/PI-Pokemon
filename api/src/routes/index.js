const { Router } = require('express')
const routesUser = require('./routesUser')
const routesPokemon = require('./routesPokemon')
const routesTeam = require('./routesTeam')
const routes = new Router();
routes.use('/user', routesUser)
routes.use('/pokemons', routesPokemon)
routes.use('/team', routesTeam)

module.exports = routes;
