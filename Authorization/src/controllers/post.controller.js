const express = require("express");
const router = express.Router();
const Product = require("../models/post.model");
const authenticate = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");

router.get(
    "",
    authenticate,
    authorize(["admin", "seller"]),
    async (req, res) => {
        const products = await Product.find().lean().exec();
        return res.send(products);
    }
);

router.patch(
    "/:id",
    authenticate,
    authorize(["admin", "seller"]),
    async (req, res) => {
        try {
            const x = await Product.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });
            return res.send(x);
        } catch (err) {
            return res.send(err.message);
        }
    }
);

router.delete(
    "/:id",
    authenticate,
    authorize(["admin", "seller"]),
    async (req, res) => {
        try {
            await Product.findByIdAndDelete(req.params.id);
            return res.send("Product deleted");
        } catch (err) {
            return res.send(err.message);
        }
    }
);

router.post("/", async (req, res) => {
    try {
        const product = await Product.create({
            title: req.body.title,
            body: req.body.body,
            userId: req.body.userId,
        });
        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

module.exports = router;
