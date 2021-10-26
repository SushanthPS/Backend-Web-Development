const express = require("express");
const upload = require("../middlewares/file-upload");
const router = express.Router();
const Product = require("../models/product.model");
const fs = require("fs");

//we can have multiple post request for single file too

router.post("/single", upload.single("productImages"), async (req, res) => {
    try {
        const product = await Product.create({
            title: req.body.title,
            price: req.body.price,
            image_urls: req.file.path,
        });
        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

router.post("/multiple", upload.any("productImages"), async (req, res) => {
    const filePaths = req.files.map((file) => file.path);
    try {
        const product = await Product.create({
            title: req.body.title,
            price: req.body.price,
            image_urls: filePaths,
        });
        return res.status(201).send(product);
    } catch (error) {
        filePaths.map((path) => fs.unlinkSync(path)); //to delete the files
        return res.status(500).send(error.message);
    }
});

module.exports = router;
