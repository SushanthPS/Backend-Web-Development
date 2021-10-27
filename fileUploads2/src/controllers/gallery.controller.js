const express = require("express");
const router = express.Router();
const upload = require("../middlewares/file-upload");

const Gallery = require("../models/gallery.model");
const fs = require("fs");

router.get("/", async (req, res) => {
    try {
        const gallery = await Gallery.find().lean().exec();
        return res.send(gallery);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.post("/", upload.any("images"), async (req, res) => {
    const filePaths = req.files.map((file) => file.path);
    try {
        const gallery = await Gallery.create({
            pictures: filePaths,
            user_id: req.body.user_id,
        });
        return res.status(201).send(gallery);
    } catch (err) {
        filePaths.map((path) => fs.unlinkSync(path)); //to delete the files
        return res.status(500).send(error.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { pictures } = await Gallery.findById(req.params.id).lean();
        pictures.map((path) => fs.unlinkSync(path));

        await Gallery.findByIdAndDelete(req.params.id).lean();
        return res.status(200).send("Deleted");
    } catch (err) {
        return res.status(400).send(err.message);
    }
});

module.exports = router;
