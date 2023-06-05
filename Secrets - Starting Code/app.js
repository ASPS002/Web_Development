//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// const encrypt = require("mongoose-encryption");

const md5 = require("md5");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = new mongoose.Schema({

    email: String,
    password: String

});
// console.log(process.env.secret)

// userSchema.plugin(encrypt, { secret: process.env.secret, encryptedFields: ['password'] });// we are encrypting only password because we will need email to search for a user in our database laterOn when logging  


const User = mongoose.model("User", userSchema);



app.get("/", function (req, res) {

    res.render("home");
});
app.get("/login", function (req, res) {

    res.render("login");
});
app.get("/register", function (req, res) {

    res.render("register");
});

app.post("/register", function (req, res) {

    const newUser = new User({
        email: req.body.username,
        password: md5(req.body.password)
    });

    newUser.save().then((result) => {
        res.render("secrets");// only render when user gets logged in
    }).catch((error) => {
        console.log(error);
    })
});


app.post("/login", function (req, res) {

    const email = req.body.username;
    const password = req.body.password;
    User.findOne({ email: email }).then((foundUser) => {
        if (foundUser) {
            if (md5(password) == foundUser.password) {
                res.render("secrets");
            }
            else {
                console.log("Password not matched");
            }
        }
        else {
            console.log("No such user exists");
        }
    }).catch((error) => {
        console.log(error);
    })

});


app.listen(3000, function () {
    console.log("Server started on port 3000");
});
