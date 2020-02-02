const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authorization = req.get('Authorization');
    if (!authorization) {
        const error = new Error("No Authorization Header Available");
        error.statusCode(401);
        throw error;
    }

    const token = authorization.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.decode(token, "superSecretKeyisHighlySecret")
    } catch (err) {
        const error = new Error("unable to process your token");
        error.statusCode(500);
        throw error;
    }
    if (!decodedToken) {
        const error = new Error("Not Authenticated");
        error.statusCode = 401;
        throw error
    }
    req.userId = decodedToken.userId;
    next();
}