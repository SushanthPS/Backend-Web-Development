const express = require("express");
const connect = require("./configs/db");

const authorController = require("./controllers/author.controller");
const bookController = require("./controllers/book.controller");

const app = express();
app.use(express.json());

app.use("/authors", authorController);
app.use("/books", bookController);

app.listen(2345, async () => {
    await connect();
    console.log("Listening on port 2345");
});
