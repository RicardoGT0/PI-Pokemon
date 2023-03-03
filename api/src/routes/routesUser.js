const { Router } = require('express');
const createUser = require('../controllers/createUser');
const deleteUser = require('../controllers/deleteUser');
const readUser = require('../controllers/readUser');
const updateUser = require('../controllers/updateUser');

const routes = Router();

routes.get('/', (req, res) => {
    const { userName, password } = req.body
    try {
        const respuesta = readUser(userName, password)
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(400).json({ Error: error.message })
    }
});

routes.post('/', (req, res) => {
    const { userName, password } = req.body
    try {
        const respuesta = createUser(userName, password)
        res.status(201).json(respuesta)
    } catch (error) {
        res.status(400).json({ Error: error.message })
    }
});

routes.put('/:id', (req, res) => {
    const { id } = req.params
    const { password } = req.body
    try {
        const respuesta = updateUser(id, password)
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(400).json({ Error: error.message })
    }
});

routes.delete('/:id', (req, res) => {
    const { id } = req.params
    try {
        const respuesta = deleteUser(id)
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(400).json({ Error: error.message })
    }
});

module.exports = routes;
