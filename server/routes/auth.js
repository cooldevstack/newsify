const express = require('express');
const { body } = require("express-validator")
const User = require("../models/user")
const router = express.Router();
const authController = require("../controllers/auth")

router.put("/signup", [
    body("email").isEmail().withMessage("Email address is not valid")
        .custom((value, { req }) => {
            return User.findOne({ email: value }).then(user => {
                if (user) {
                    return Promise.reject("Email Address already Exist");
                }
            })
        }),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty()
], authController.signUp)

router.post("/login", authController.login)

module.exports = router