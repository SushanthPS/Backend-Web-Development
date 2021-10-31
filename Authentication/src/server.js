const express = require("express");
const connect = require("./configs/db");
const { login, register } = require("./controllers/user.controller");
const postController = require("./controllers/post.controller");
const { body } = require("express-validator");

const app = express();
app.use(express.json());

app.post(
    "/register",
    body("email").isEmail(),
    body("name").notEmpty(),
    body("password").isLength({ min: 6 }),
    register
);
app.post(
    "/login",
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    login
);
app.use("/posts", postController);

app.listen(5432, async () => {
    await connect();
    console.log("Listening on port 5432");
});
