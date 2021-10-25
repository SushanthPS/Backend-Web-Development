const express = require('express');
const router = express.Router();

const Checked = require("../models/checked.model");


router.post("/", async (req, res) => {
    try {
        const x = await Checked.create(req.body);
        return res.send(x);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})

router.get("/", async (req, res) => {
    try {
        const x = await Checked.find().lean().exec();
        return res.send(x);
    } catch (err) {
        res.status(400).send(err.message);
    }
})


router.get("/:id", async (req, res) => {
    try {
        const x = await Checked.findById(req.params.id).lean().exec();
        return res.send(x);
    } catch (err) {
        return res.status(400).send(err.mesage);
    }

})

router.patch("/:id", async (req, res) => {
    try {
        const x = await Checked.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        return res.send(x);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})


module.exports = router;