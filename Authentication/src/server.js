const express = require("express");
const connect = require("./configs/db");

const { login, register } = require("./controllers/user.controller");
const productController = require("./controllers/product.controller");

const app = express();
app.use(express.json());

app.post("/register", register);
app.post("/login", login);
app.use("/products", productController);

app.listen(2345, async () => {
    await connect();
    console.log("Listening on port 2345");
});
