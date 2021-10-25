const express = require('express');
const router = express.Router();

const Author = require("../models/author.model");


router.post("/", async (req, res) => {
    try {
        const x = await Author.create(req.body);
        return res.send(x);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})

router.get("/", async (req, res) => {
    try {
        const x = await Author.find().lean().exec();
        return res.send(x);
    } catch (err) {
        res.status(400).send(err.message);
    }
})


router.get("/:id", async (req, res) => {
    try {
        const x = await Author.findById(req.params.id).lean().exec();
        return res.send(x);
    } catch (err) {
        return res.status(400).send(err.mesage);
    }

})


module.exports = router;