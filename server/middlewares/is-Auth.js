const jwt = require('jsonwebtoken');
const throwError = require("../utility/utility")

module.exports = (req, res, next) => {
    const authorization = req.get('Authorization');
    if (!authorization) {
        throwError("No Authorization Header Available", 401)
    }

    const token = authorization.split(' ')[1];
    let decodedToken;
    try {
        console.log(token)
        decodedToken = jwt.decode(token, "superSecretKeyisHighlySecret")
    } catch (err) {
        throwError("unable to process your token", 500)
    }
    if (!decodedToken) {
        throwError("Not Authenticated", 401)
    }
    req.userId = decodedToken.userId;
    next();
}