const { validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const throwError = require("../utility/utility")

exports.signUp = (req, res, next) => {
    console.log("got one request")
    const errors = validationResult(req)
    if (!errors.isEmpty()) {

        throwError("error with provided input", 422, errors.array())
    }
    const userEmail = req.body.email
    const userPassword = req.body.password
    const userName = req.body.name
    console.log(req.body.email)
    bcrypt.hash(userPassword, 12).then(hashpassword => {
        let objUser = new User({
            email: userEmail,
            password: hashpassword,
            name: userName
        })
        return objUser.save()
    }).then(result => {
        res.status(201).json({ message: 'User Created', userId: result._id })
    }).catch(error => {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    })
}

exports.login = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throwError("Error with input Data", 422, errors.array())
    }
    const userEmail = req.body.email;
    const userPassword = req.body.password
    let loadedUser;
    User.findOne({ email: userEmail }).then(user => {
        if (!user) {
            throwError("user with the given Email ID could not be found", 401)
        }
        loadedUser = user
        return bcrypt.compare(userPassword, user.password)
    }).then(isEqual => {
        if (!isEqual) {
            throwError("incorect password provided", 401)
        }
        const token = jwt.sign({ email: loadedUser.email, userId: loadedUser._id }, "superSecretKeyisHighlySecret", { expiresIn: "1h" })
        res.status(200).json({ token: token, userId: loadedUser._id.toString() })
    }).catch(error => {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error)
    })
}
