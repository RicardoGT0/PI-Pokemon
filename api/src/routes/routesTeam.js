const { Router } = require("express");
const addOfTeam = require("../controllers/team/addOfTeam");
const deleteOfTeam = require("../controllers/team/deleteOfTeam");
const readTeam = require("../controllers/team/readTeam");

const routes = new Router();

routes.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const respuesta = await readTeam(id)
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(400).json({ Error: error.message })
    }
});

routes.post('/:id', async (req, res) => {
    const { id } = req.params //user ID
    const { poke, member } = req.body //pokemon ID, memberID
    try {
        const respuesta = await addOfTeam(id, poke, member)
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(400).json({ Error: error.message })
    }
});

routes.delete('/:id', async (req, res) => {
    const { id } = req.params //user ID
    const { member } = req.query //member ID
    try {
        const respuesta = await deleteOfTeam(id, member)
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(400).json({ Error: error.message })
    }
});

module.exports = routes;
