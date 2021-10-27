const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "author",
            required: true,
        },
    },
    {
        versionKey: false,
    }
);

module.exports = mongoose.model("book", bookSchema);
