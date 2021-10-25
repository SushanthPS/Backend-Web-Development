const mongoose = require('mongoose');


const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    versionKey: false
})

const Tag = mongoose.model("tags", tagSchema);

module.exports = Tag;