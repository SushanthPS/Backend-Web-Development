const express = require("express");
const User = require("../models/user.model");
const sendEmail = require("../utils/send-mails");

const router = express.Router();

router.post("/admin", async (req, res) => {
    try {
        const user = await User.create(req.body); //middleware will be used here to convert req body to json object

        await sendEmail({
            to: user.email,
            subject: `${user.first_name} ${user.last_name} has registered with us`,
            text: `Please welcome ${user.first_name} ${user.last_name}`,
        });

        return res.status(201).send(user);
    } catch (err) {
        return res.status(400).json({ status: "failed", message: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const user = await User.create(req.body); //middleware will be used here to convert req body to json object

        await sendEmail({
            to: user.email,
            subject: `Welcome to ABC system ${user.first_name} ${user.last_name}`,
            text: `Hi ${user.first_name}, Please confirm your email address`,
        });

        return res.status(201).send(user);
    } catch (err) {
        return res.status(400).json({ status: "failed", message: err.message });
    }
});

router.get("/", async (req, res) => {
    try {
        //we add + to convert string to number
        const page = +req.query.page || 1;
        const size = +req.query.size || 10;

        const offset = (page - 1) * size;

        const users = await User.find().skip(offset).limit(size).lean().exec();
        const totalPages = Math.ceil(
            (await User.find().countDocuments()) / size
        );

        return res.status(200).json({ users, totalPages });
    } catch (err) {
        return res.status(400).json({ status: "failed", message: err.message });
    }
});

module.exports = router;
