const { Router } = require('express');
const createUser = require('../controllers/user/createUser');
const deleteUser = require('../controllers/user/deleteUser');
const readUser = require('../controllers/user/readUser');
const updateUser = require('../controllers/user/updateUser');

const routes = Router();

routes.get('/', async (req, res) => {
    const { UserName, Password } = req.query
    try {
        const respuesta = await readUser(UserName, Password)
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(400).json({ Error: 'Nombre de Usuario y/o Contraseña Incorrectos' })
    }
});

routes.post('/', async (req, res) => {
    const { UserName, Password } = req.body
    try {
        const respuesta = await createUser(UserName, Password)
        res.status(201).json(respuesta)
    } catch (error) {
        res.status(400).json({ Error: error.message })
    }
});

routes.put('/:id', async (req, res) => {
    const { id } = req.params
    const { Password } = req.body
    try {
        const respuesta = await updateUser(id, Password)
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(400).json({ Error: error.message })
    }
});

routes.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const respuesta = await deleteUser(id)
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(400).json({ Error: error.message })
    }
});

module.exports = routes;
