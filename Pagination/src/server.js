const express = require("express");
const connect = require("./configs/db");
const userController = require("./controllers/user.controller");

const app = express();

app.use(express.json()); //middleware

app.use("/users", userController);

app.listen(2345, async () => {
    await connect();
    console.log("Listening on Port 2345");
});
