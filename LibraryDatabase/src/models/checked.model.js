const mongoose = require("mongoose");

const checkedSchema = mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "books",
        required: true
    },
    checked: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    versionKey: false
})


const Checked = mongoose.model("checkedOut", checkedSchema);

module.exports = Checked;