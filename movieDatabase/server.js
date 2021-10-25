const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());


const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
}


const userSchema = new mongoose.Schema({
    movie_name: String,
    movie_genre: String,
    production_year: Number,
    budget: Number
}, {
    versionKey: false
})


const User = mongoose.model("movies", userSchema);


//SEE ALL MOVIES
app.get("/users", async (req, res) => {
    const x = await User.find().lean().exec()
    return res.send(x);
})


//SEE A SINGLE MOVIE
app.get("/users/:id", async (req, res) => {
    const x = await User.findById(req.params.id).lean().exec();
    return res.send(x);
})


//POST A MOVIE TO DATABASE
app.post("/users", async (req, res) => {
    const x = await User.create(req.body);
    return res.send(x);
})


//UPDATE A MOVIE
app.patch("/users/:id", async (req, res) => {
    const x = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    return res.send(x);
})

//DELETE A MOVIE
app.delete("/users/:id", async (req, res) => {
    const x = await User.findByIdAndDelete(req.params.id);
    return res.send(x);
})


app.listen(2345, async () => {
    await connect()
    console.log("Listening on port 2345");
})