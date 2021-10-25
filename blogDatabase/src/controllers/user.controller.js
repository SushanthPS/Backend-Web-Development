const express = require('express');
const router = express.Router();
const User = require("../models/user.model");


//CRUD operations for User

router.post("/", async (req, res) => {
    const user = await User.create(req.body);
    //const newUsers = [...users, req.body];
    return res.send(user);
})

router.get("/", async (req, res) => {
    const users = await User.find().lean().exec()
    return res.send(users);
})

router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id).lean().exec();
    res.send(user);
})

router.patch("/:id", async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    res.send(user);
})

router.delete("/:id", async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send("User Deleted");
})


module.exports = router;