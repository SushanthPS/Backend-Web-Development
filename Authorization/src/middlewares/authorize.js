const authorize = (permittedRoles) => (req, res, next) => {
    //first get user from request
    const user = req.user;

    //check if any roles use has with permitted roles
    const isPermittedArr = user.roles.filter((role) =>
        permittedRoles.includes(role)
    );

    //if not then throw an error
    if (isPermittedArr.length === 0)
        return res.status(403).send("You are not permitted to access this");

    //else return next
    return next();
};

module.exports = authorize;
