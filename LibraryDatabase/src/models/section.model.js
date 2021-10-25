const mongoose = require('mongoose');

const sectionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    versionKey: false
})


const Section = mongoose.model("section", sectionSchema);

module.exports = Section;