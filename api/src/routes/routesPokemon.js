const { Router } = require('express');
const createPokemon = require('../controllers/createPokemon');
const getListPokeNames = require('../controllers/getListPokeNames');
const readAllPokemon = require('../controllers/readAllPokemon');
const readPokemonByID = require('../controllers/readPokemonByID');
const readPokemonByName = require('../controllers/readPokemonByName');
const routesTypes = require('./routesTypes')

const routes = Router();

routes.use('/types', routesTypes)

routes.get('/list', (req, res) => {
    try {
        const respuesta = getListPokeNames()
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(400).json({ Error: error.message })
    }
})

routes.get('/', async (req, res) => {
    const { name, page } = req.query
    try {
        let respuesta
        if (name)
            respuesta = await readPokemonByName(name)
        else
            respuesta = await readAllPokemon(page)
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(400).json({ Error: error.message })
    }
});

routes.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const respuesta = await readPokemonByID(id)
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(400).json({ Error: error.message })
    }
});

routes.post('/', async (req, res) => {
    const data = req.body
    try {
        const respuesta = await createPokemon(data)
        res.status(201).json(respuesta)
    } catch (error) {
        res.status(400).json({ Error: error.message })
    }
});






/* routes.delete('/:id', (req, res) => {
    const { id } = req.params
    try {
        const respuesta = deletePokemon(id)
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(200).json({ Error: error })
    }
});

routes.put('/', (req, res) => {
    const data = req.body
    try {
        const respuesta = updatePokemon(data)
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(200).json({ Error: error })
    }
}); */

module.exports = routes;
