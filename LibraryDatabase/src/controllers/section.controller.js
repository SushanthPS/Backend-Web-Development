const express = require('express');
const router = express.Router();

const Section = require("../models/section.model");


router.post("/", async (req, res) => {
    try {
        const x = await Section.create(req.body);
        return res.send(x);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})

router.get("/", async (req, res) => {
    try {
        const x = await Section.find().lean().exec();
        return res.send(x);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})


router.get("/:id", async (req, res) => {
    try {
        const x = await Section.find(req.params.id).lean().exec();
        return res.send(x);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})


module.exports = router;