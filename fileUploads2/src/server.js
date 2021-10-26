const express = require("express");
const connect = require("./configs/db");

const app = express();
app.use(express.json());

const userController = require("./controllers/user.controller");
const galleryController = require("./controllers/gallery.controller");

app.use("/users", userController);
app.use("/gallery", galleryController);

app.listen(2345, async () => {
    await connect();
    console.log("Listening to port 2345");
});
