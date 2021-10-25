const express = require('express');

const app = express();
app.use(express.json());

const connect = require("./configs/db");

//==================================================================================

const userController = require("./controllers/user.controller")
const commentController = require("./controllers/comment.controller")
const postController = require("./controllers/post.controller")
const tagController = require("./controllers/tag.controller")

app.use("/users", userController);
app.use("/comments", commentController);
app.use("/posts", postController);
app.use("/tags", tagController);

//================================================================================
//================================================================================


app.listen(2346, async () => {
    await connect()
    console.log("Listening on port 2345");
})