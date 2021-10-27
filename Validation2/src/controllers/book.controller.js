const express = require("express");
const router = express.Router();
const Book = require("../models/book.model");

const { body, validationResult } = require("express-validator");

router.post("/:userid", async (req, res) => {
    const book = await Book.create(req.body);
    res.status(201).send(book);
});

module.exports = router;
