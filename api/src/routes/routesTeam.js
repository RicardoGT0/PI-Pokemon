const { Router } = require("express");
const addOfTeam = require("../controllers/team/addOfTeam");
const deleteOfTeam = require("../controllers/team/deleteOfTeam");
const readTeam = require("../controllers/team/readTeam");

const routes = new Router();

routes.get('/:UserID', async (req, res) => {
    const { UserID } = req.params
    try {
        const respuesta = await readTeam(UserID)
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(400).json({ Error: error.message })
    }
});

routes.post('/:UserID', async (req, res) => {
    const { UserID } = req.params //user ID
    const { PokemonID, memberID } = req.body //pokemon ID, memberID
    try {
        const respuesta = await addOfTeam(UserID, PokemonID, memberID)
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(400).json({ Error: error.message })
    }
});

routes.delete('/:UserID', async (req, res) => {
    const { UserID } = req.params //user ID
    const { memberID } = req.query //member ID
    try {
        const respuesta = await deleteOfTeam(UserID, memberID)
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(400).json({ Error: error.message })
    }
});

module.exports = routes;
