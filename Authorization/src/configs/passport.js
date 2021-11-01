const GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();
const User = require("../models/user.model");
const passport = require("passport");
const { v4: uuid } = require("uuid");
const { newToken } = require("../controllers/user.controller");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            passReqToCallback: true,
        },
        async function (request, accessToken, refreshToken, profile, done) {
            try {
                let user = await User.findOne({ email: profile?._json?.email })
                    .lean()
                    .exec();

                if (!user) {
                    user = await User.create({
                        email: profile?._json?.email,
                        password: uuid(),
                    });
                }

                const token = newToken(user);
                user.token = token;

                return done(null, user);
            } catch (err) {
                console.log("Error: ", err.message);
                return done(null, err);
            }
        }
    )
);

module.exports = passport;
