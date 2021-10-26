const express = require("express");
const router = express.Router();
const upload = require("../middlewares/file-upload");

const User = require("../models/user.model");
const fs = require("fs");

router.get("/", async (req, res) => {
    try {
        const users = await User.find().lean().exec();
        return res.send(users);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.post("/", upload.single("image"), async (req, res) => {
    try {
        const user = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            profile_pic: req.file.path,
        });
        return res.status(201).send(user);
    } catch (err) {
        fs.unlinkSync(req.file.path);
        return res.status(500).send(err.message);
    }
});

router.patch("/:id", upload.single("image"), async (req, res) => {
    const item = { profile_pic: req.file.path };
    try {
        const y = await User.findById(req.params.id);
        fs.unlinkSync(y.profile_pic); //deleting old pic

        const x = await User.findByIdAndUpdate(req.params.id, item, {
            new: true,
        });

        return res.status(200).send(y);
    } catch (err) {
        fs.unlinkSync(req.file.path);
        return res.status(500).send(err.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const x = await User.findById(req.params.id).lean();
        fs.unlinkSync(x.profile_pic);

        await User.findByIdAndDelete(req.params.id).lean();
        return res.status(200).send("Deleted");
    } catch (err) {
        return res.status(400).send(err.message);
    }
});

module.exports = router;
