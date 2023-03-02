const { Router } = require("express");

const routes = new Router();

routes.get('/:id', (req, res) => {
    const { id } = req.params
    try {
        const respuesta = readFavs(id)
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(400).json({ Error: error })
    }
});

routes.post('/:id', (req, res) => {
    const { id } = req.params //user ID
    const { poke } = req.query //pokemon ID
    try {
        const respuesta = createFavs(id, poke)
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(400).json({ Error: error })
    }
});

routes.delete('/:id', (req, res) => {
    const { id } = req.params //user ID
    const { poke } = req.query //pokemon ID
    try {
        const respuesta = deleteFavs(id, poke)
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(400).json({ Error: error })
    }
});

module.exports = routes;
