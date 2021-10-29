require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, user) {
            if (err) return reject(err);

            return resolve(user);
        });
    });
};

const authenticate = async (req, res, next) => {
    //check if  authorization header is present and if not throw an error
    const bearerToken = req?.headers?.authorization;

    if (!bearerToken)
        return res.status(401).json({
            status: "Error",
            message: "You did not send the authorization header",
        });

    //check if auth header has bearer token and if not throw and error
    if (!bearerToken.startsWith("Bearer "))
        return res.status(400).json({
            status: "Error",
            message: "You did not send the authorization header",
        });

    //extract the token from bearer token
    const token = bearerToken.split(" ")[1];

    //decrypt the token and try fetching the user
    try {
        const user = await verifyToken(token);

        //add the user to the request
        req.user = user.user;

        //return  next
        return next();
    } catch (error) {
        return res
            .status(401)
            .json({ status: "You are sending incorrect token" });
    }
};

module.exports = authenticate;
