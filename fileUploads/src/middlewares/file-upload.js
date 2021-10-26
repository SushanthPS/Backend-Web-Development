const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "../uploads"));
    },

    filename: function (req, file, callback) {
        const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        callback(null, uniquePrefix + "-" + file.originalname);
    },
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
        //accepts file only if its png/jpeg
        callback(null, true);
    } else callback(null, false);
};

module.exports = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // <5mB
    },
    fileFilter: fileFilter,
});
