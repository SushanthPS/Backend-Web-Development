const express = require('express');
const router = express.Router();
const Post = require("../models/post.model");


router.post("/", async (req, res) => {
    try {
        const x = await Post.create(req.body);
        return res.status(201).send(x);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})


router.get("/", async (req, res) => {
    try {
        //populate helps get us relational database info too
        const x = await Post.find().populate("userId").populate("tagIds").lean().exec();
        return res.send(x);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})


router.get("/:id", async (req, res) => {
    try {
        const x = await Post.findById(req.params.id).lean().exec();
        return res.status(200).send(x);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})


router.patch("/:id", async (req, res) => {
    try {
        const x = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }).lean();
        return res.status(205).send(x);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})


router.delete("/:id", async (req, res) => {
    try {
        const x = await Post.findByIdAndDelete(req.params.id).lean();
        return res.status(200).json({
            post: x
        })
    } catch (err) {
        return res.status(400).send(err.message);
    }
})

module.exports = router;