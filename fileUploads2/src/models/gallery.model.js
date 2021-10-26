const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
    {
        pictures: [{ type: String, required: true }],
        user_id: { type: String, required: true },
    },
    {
        versionKey: false,
    }
);

module.exports = mongoose.model("gallery", gallerySchema);
