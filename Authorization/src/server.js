const express = require("express");
const connect = require("./configs/db");
const { login, register, router } = require("./controllers/user.controller");
const postController = require("./controllers/post.controller");
const passport = require("./configs/passport");

const app = express();
app.use(express.json());
app.use(passport.initialize());

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.get("/auth/google/failure", function (req, res) {
    return res.send("Something went wrong");
});

app.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: [
            // "https://www.googleapis.com/auth/plus.login",
            // "https://www.googleapis.com/auth/userinfo.email",
            "email",
            "profile",
        ],
    })
);

app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/auth/google/failure",
    }),
    (req, res) => {
        res.send(req.user);
    }
);

app.post("/register", register);
app.post("/login", login);
app.use("/posts", postController);
app.use("/users", router);

app.listen(2345, async () => {
    await connect();
    console.log("Listening on port 2345");
});
