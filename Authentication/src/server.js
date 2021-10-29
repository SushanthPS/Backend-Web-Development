const express = require("express");
const connect = require("./configs/db");

const { login, register, router } = require("./controllers/user.controller");
const postController = require("./controllers/post.controller");

const app = express();
app.use(express.json());

app.post("/register", register);
app.post("/login", login);
app.use("/posts", postController);

app.use("/users", router);

app.listen(5432, async () => {
    await connect();
    console.log("Listening on port 5432");
});
