const mongoose = require('mongoose');


//1) first we need to connect express to mongodb
const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/web10", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
}


module.exports = connect;