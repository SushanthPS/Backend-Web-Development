const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

const { body, validationResult } = require("express-validator");

router.post(
    "/",
    body("first_name").notEmpty().withMessage("First Name cannot be empty"),
    body("last_name").notEmpty().withMessage("Last Name cannot be empty"),
    body("email").notEmpty().isEmail().withMessage("Email not valid"),
    body("pincode")
        .notEmpty()
        .isLength({ max: 6, min: 6 })
        .withMessage("Valid pincode of length 6 required"),
    body("age")
        .notEmpty()
        .custom((value) => {
            if (value < 1 || value > 100)
                throw new Error("Age should be between 1 and 100");
            return true;
        }),
    body("gender")
        .notEmpty()
        .custom((value) => {
            if (value === "Male" || value === "Female" || value === "Others")
                return true;
            else throw new Error("Gender should be Male, Female or Others");
        }),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // console.log(body("title")); //to get all the validation functions available
        const user = await User.create(req.body);
        res.status(201).send(user);
    }
);

module.exports = router;
