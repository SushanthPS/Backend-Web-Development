const express = require('express');
const router = express.Router();

const Book = require('../models/book.model');
const Checked = require("../models/checked.model");
const Author = require("../models/author.model");
const Section = require('../models/section.model');


router.post("/", async (req, res) => {
    try {
        const x = await Book.create(req.body);
        return res.send(x);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})


router.get("/", async (req, res) => {
    try {
        const x = await Book.find().lean().exec();
        return res.send(x);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})


//FIND BOOKS THAT ARE CHECKED OUT
router.get("/checkedBooks", async (req, res) => {
    try {
        let x = await Checked.find({
            checked: true
        }).lean().exec()


        let ans = await Promise.all(x.map((el) => {
            return (Book.findById(el.bookId).lean().exec());

        }))

        res.send(ans);

    } catch (err) {
        res.status(400).send(err);
    }
})



//FIND ALL BOOKS WRITTEN BY AN AUTHOR
router.get("/:authorName", async (req, res) => {
    try {
        const authorid = await Author.findOne({
            "first_name": req.params.authorName
        }).lean().exec();

        const x = await Book.find({
            "authorId": authorid._id
        }).lean().exec();
        return res.send(x);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})


//FIND BOOKS IN A SECTION
router.get("/section/:sectionName", async (req, res) => {
    try {
        const sectionid = await Section.findOne({
            "name": req.params.sectionName
        }).lean().exec();

        const x = await Book.find({
            "sectionId": sectionid._id
        }).lean().exec();
        return res.send(x);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})


//FIND BOOKS IN A SECTION THAT ARE NOT CHECKED OUT
router.get("/section/:sectionName/notchecked", async (req, res) => {
    try {
        let x = await Checked.find({
            checked: false
        }, {
            "bookId": 1,
            "_id": 0
        }).lean().exec()

        //getting all element bookIds for above object
        let checkedArr = [];
        x.forEach(({
            bookId
        }) => {
            checkedArr.push(bookId);
        })


        const sectionid = await Section.findOne({
            "name": req.params.sectionName
        }).lean().exec();

        const y = await Book.find({
            "sectionId": sectionid._id
        }).lean().exec();

        let ans = [];
        await Promise.all(y.map((el) => {
            for (let i = 0; i < checkedArr.length; i++)
                if (String(checkedArr[i]) == String(el._id))
                    ans.push(el);
        }))


        res.send(ans);

    } catch (err) {
        return res.status(400).send(err.message);
    }
})

//FIND BOOKS OF 1 AUTHOR INSIDE A SECTION
router.get("/:authorName/:sectionName", async (req, res) => {
    try {
        const authorid = await Author.findOne({
            "first_name": req.params.authorName
        }).lean().exec();


        const sectionid = await Section.findOne({
            "name": req.params.sectionName
        }).lean().exec();

        const x = await Book.find({
            "authorId": authorid._id,
            "sectionId": sectionid._id
        }).lean().exec();



        return res.send(x);
    } catch (err) {
        return res.status(400).send(err.message);
    }

})



module.exports = router;