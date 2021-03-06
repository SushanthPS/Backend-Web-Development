const jwt = require("jsonwebtoken");
require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const { validationResult } = require("express-validator");

const newToken = (user) => {
    return jwt.sign({ user: user }, process.env.JWT_SECRET_KEY);
};

router.get("", async (req, res) => {
    const users = await User.find().lean().exec();

    return res.send(users);
});

const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //first check if user already exists
        let user = await User.findOne({ email: req.body.email }).lean().exec();

        //if user exists, then throw error
        if (user)
            return res
                .send(400)
                .json({ status: "error", message: "User already exists" });

        //otherwise create a user and hash the password (hashing happens in user model)
        user = await User.create(req.body);

        //create a token
        const token = newToken(user);

        //return the token and user information to frontend
        return res.status(201).json({ user, token });
    } catch (err) {
        return res.status(400).send(err.message);
    }
};

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //check if user with email exists
        let user = await User.findOne({ email: req.body.email }).exec(); //dont use lean as we need mongo object, lean converts into json object

        //if not user, then throw error
        if (!user)
            return res
                .send(400)
                .json({ status: "error", message: "User does not exist" });

        //if user, then match the password
        const match = user.checkPassword(req.body.password);

        //if not match, then throw an error
        if (!match)
            return res
                .send(400)
                .json({ status: "error", message: "Wrong Password" });

        //if match, then create the token
        const token = newToken(user);

        //return the token to the frontend
        return res.status(201).json({ user, token });
    } catch (err) {}
};

module.exports = { register, login, router };
