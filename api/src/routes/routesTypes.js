const { Router } = require("express");
const readAllTypes = require('../controllers/readAllTypes');

const routes = new Router();

routes.get('/', async (req, res) => {
    try {
        const respuesta = await readAllTypes()
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(400).json({ Error: error.message })
    }
});

module.exports = routes;