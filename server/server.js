const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const uuidv4 = require("uuid/v4");

const authRoutes = require("./routes/auth");
const tagRoutes = require("./routes/tags")

const path = require("path");

const app = express();
const port = 5000;

// processing uploaded files from client
const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.filename + "_" + uuidv4())
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype == 'image/jpeg'
    ) {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
};

app.use(bodyParser.json());
app.use(
    multer({ fileFilter: fileFilter, storage: fileStorage }).single("image")
);
// static file response generation
app.use('/images', express.static(path.join(__dirname, 'static', "images")));

app.get('/', (req, res) => res.send('Hello World!'));

// Setting up th routes
app.use('/auth', authRoutes);
app.use('/Tag', tagRoutes)

// Setup for CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Method", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// generic error handler
app.use((error, req, res, next) => {
    console.log(`request failed with error---${error}`)
    const status = error.statusCode
    const message = error.message;
    const data = error.data
    res.status(status).json({ message: message, data: data });
});

//app initilization
mongoose.connect("mongodb+srv://Akash:akashmukul@cooldevscluster0-zdpgi.mongodb.net/test?retryWrites=true&w=majority")
    .then(result => {
        app.listen(port, () => {
            console.log(` Example app is listning at PORT ---${port}`)
        })
    }).catch(err => {
        console.log(`server failed with error ---${err}`)
    });