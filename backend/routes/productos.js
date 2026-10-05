const express = require("express");
const productos = require("../data/productos");

const router = express.Router();

router.get("/", (req, res, next) => {
    try {
        res.json(productos);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", (req, res, next) => {
    try {
        const producto = productos.find((item) => item.id === req.params.id);

        if (!producto) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        return res.status(200).json(producto);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
