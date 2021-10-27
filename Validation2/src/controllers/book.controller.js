const express = require("express");
const router = express.Router();
const Book = require("../models/book.model");
const Author = require("../models/author.model");

const { body, validationResult } = require("express-validator");

router.post(
    "/",
    body("authorId")
        .custom(async (value) => {
            let val = await Author.findById(value).lean().exec();
            //function works without below 2 lines??? how?
            // if (val) return true
            // throw new Error();
        })
        .withMessage("Invalid AuthorID"),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const book = await Book.create(req.body);
        res.status(201).send(book);
    }
);

router.get("/", async (req, res) => {
    const books = await Book.find().lean().exec();
    res.status(200).send(books);
});

router.patch(
    "/:bookId/:authorId",
    body().custom(async (value, { req }) => {
        const book = await Book.findById(req.params.bookId).lean().exec();
        const authorid = req.params.authorId;
        if (book.authorId == authorid) return true;
        throw new Error("Invalid Author, Access Denied");
    }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let x = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
            new: true,
        });
        res.status(200).send(x);
    }
);

router.delete(
    "/:bookId/:authorId",
    body().custom(async (value, { req }) => {
        const book = await Book.findById(req.params.bookId).lean().exec();
        const authorid = req.params.authorId;
        if (book.authorId == authorid) return true;
        throw new Error("Invalid Author, Access Denied");
    }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let x = await Book.findByIdAndDelete(req.params.bookId);
        res.status(200).send(x);
    }
);

module.exports = router;
