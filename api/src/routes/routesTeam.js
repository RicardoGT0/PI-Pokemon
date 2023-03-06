const { Router } = require("express");
const addOfTeam = require("../controllers/team/addOfTeam");
const deleteOfTeam = require("../controllers/team/deleteOfTeam");
const readTeam = require("../controllers/team/readTeam");

const routes = new Router();

routes.get('/:id', (req, res) => {
    const { id } = req.params
    try {
        const respuesta = readTeam(id)
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(400).json({ Error: error.message })
    }
});

routes.post('/:id', (req, res) => {
    const { id } = req.params //user ID
    const { poke } = req.query //pokemon ID
    try {
        const respuesta = addOfTeam(id, poke)
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(400).json({ Error: error.message })
    }
});

routes.delete('/:id', (req, res) => {
    const { id } = req.params //user ID
    const { poke } = req.query //pokemon ID
    try {
        const respuesta = deleteOfTeam(id, poke)
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(400).json({ Error: error.message })
    }
});

module.exports = routes;
