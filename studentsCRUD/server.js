const express = require('express');
const app = express();


let users = require('./users.json');
let port = 2345;
app.use(express.json());


app.get('/', (req, res) => {
    res.send("Welcome to Home Page");
})


app.get('/users', (req, res) => {
    res.send(users);
})


app.post('/users', (req, res) => {
    users.push(req.body)
    res.send(users);
})


app.patch('/user/:id', (req, res) => {
    let id = req.params.id;
    console.log(id);
    return res.send(`User with id ${id} has been updated`);
});


app.delete('/user/:id', (req, res) => {
    let id = req.params.id;
    users = users.filter((user) => user.id != id);
    return res.send(`${id} id has been deleted`);
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})