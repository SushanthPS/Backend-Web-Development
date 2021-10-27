const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
    {
        first_name: { type: String, required: true },
        email: { type: String, required: true },
    },
    {
        versionKey: false,
    }
);

module.exports = mongoose.model("author", authorSchema);
