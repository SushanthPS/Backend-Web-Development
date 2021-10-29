const express = require("express");
const router = express.Router();
const Product = require("../models/post.model");
const authenticate = require("../middlewares/authenticate");

router.get("", authenticate, async (req, res) => {
    const products = await Product.find().lean().exec();

    return res.send(products);
});

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
