const express = require('express');
const router = express.Router()
const Comment = require("../models/comment.model")


router.post("/", async (req, res) => {
    try {
        const x = await Comment.create(req.body);
        return res.status(201).send(x);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})


router.get("/", async (req, res) => {
    try {
        const x = await Comment.find().lean().exec();
        return res.send(x);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})


router.get("/:id", async (req, res) => {
    try {
        const x = await Comment.findById(req.params.id).lean().exec();
        return res.status(200).send(x);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})


router.patch("/:id", async (req, res) => {
    try {
        const x = await Comment.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }).lean();
        return res.status(205).send(x);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})


router.delete("/:id", async (req, res) => {
    try {
        const x = await Comment.findByIdAndDelete(req.params.id).lean();
        return res.status(200).json({
            comment: x
        })
    } catch (err) {
        return res.status(400).send(err.message);
    }
})


module.exports = router;