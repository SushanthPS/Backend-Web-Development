const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json())

const connect = require("./configs/db");

//=======================================================================

const authorController = require("./controllers/author.controller")
const bookController = require("./controllers/book.controller")
const sectionController = require("./controllers/section.controller")
const checkedController = require("./controllers/checked.controller")


app.use("/authors", authorController);
app.use("/books", bookController);
app.use("/section", sectionController);
app.use("/checked", checkedController);


//=======================================================================

app.listen(2345, async () => {
    try {
        await connect()
        console.log("Listening to port 2345");
    } catch (err) {
        console.log(err.message);
    }
})