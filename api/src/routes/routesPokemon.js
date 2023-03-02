const { Router } = require('express');
const createPokemon = require('../controllers/createPokemon');
const readAllTypes = require('../controllers/readAllTypes');
const readPokemonByID = require('../controllers/readPokemonByID');
const readPokemonByName = require('../controllers/readPokemonByName');

const routes = Router();

routes.get('/', (req, res) => {
    const { name } = req.query
    try {
        let respuesta
        if (name)
            respuesta = readPokemonByName(name)
        else
            respuesta = readAllPokemon()
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(400).json({ Error: error })
    }
});

routes.get('/:id', (req, res) => {
    const { id } = req.params
    try {
        const respuesta = readPokemonByID(id)
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(400).json({ Error: error })
    }
});

routes.post('/', (req, res) => {
    const data = req.body
    try {
        const respuesta = createPokemon(data)
        res.status(201).json(respuesta)
    } catch (error) {
        res.status(400).json({ Error: error })
    }
});

routes.get('/types', (req, res) => {
    try {
        const respuesta = readAllTypes()
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(400).json({ Error: error })
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
