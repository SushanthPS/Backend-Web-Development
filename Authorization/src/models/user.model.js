const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

//this is a hook
//dont use ES6 function definition when using "this"
userSchema.pre("save", function (next) {
    //save happens when creating and updating user, hence don't hash during update
    if (!this.isModified("password")) return next();

    const hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next();
});

//this is a method/function
userSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("user", userSchema);
