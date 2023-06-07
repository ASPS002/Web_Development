//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
// const encrypt = require("mongoose-encryption");

// const md5 = require("md5");
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
    secret:process.env.secret ,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = new mongoose.Schema({

    email: String,
    password: String

});

userSchema.plugin(passportLocalMongoose); // used to hash and salt our password and save users in mongodb database
// console.log(process.env.secret)

// userSchema.plugin(encrypt, { secret: process.env.secret, encryptedFields: ['password'] });// we are encrypting only password because we will need email to search for a user in our database laterOn when logging  


const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// This line assumes that you have a User model defined in your application. The createStrategy() 
// method is typically used when working with a username and password-based authentication strategy, such as local authentication.

// . Serialization is the process of converting a user object into a format that can be stored in the session.

// Deserialization is the process of converting the serialized user object stored in the session back into a user object that can be used in the application.

app.get("/", function (req, res) {

    res.render("home");
});
app.get("/login", function (req, res) {

    res.render("login");
});
app.get("/register", function (req, res) {

    res.render("register");
});

app.get("/secrets", function (req, res) {


    // console.log(req.session);    // Session {
    //     cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true },
    //     passport: { user: 'user5@passportLocalMongoose.com' }
    //   }


    // console.log(req.user);  //   {
    //     _id: new ObjectId("648049ab2121f599d3649b09"),
    //     username: 'user5@passportLocalMongoose.com',
    //     __v: 0
    //   }

    if (req.isAuthenticated()) {
        res.render("secrets");
    } else {
        res.redirect("/login");
    }
});

app.get("/logout", function (req, res) {
    req.logout(function (error) {
        if (error) {
            console.log(error);
            res.redirect("/secrets");
        } else {
            console.log("successully logged out");
            res.redirect("/");
        }
    });


});

app.post("/register", function (req, res) {

    //PASSPORT LOCAL MONGOOSE

    User.register({ username: req.body.username }, req.body.password, function (error, user) {
        if (error) {
            console.log(error);
            res.redirect("/register");
        }
        else {

            passport.authenticate("local")(req, res, function () {// if a user gets authenticated, it is automatically redirected to secrets page
                res.redirect("/secrets");
            });
            // This middleware handles the authentication process, sets up the user object in the session, and triggers the callback 
            // function when authentication is complete.
        }
    });



    //AUTO  GENERATE A SALT AND HASH

    // bcrypt.hash(req.body.password, saltRounds).then((hash) => {
    //     // Store hash in your password DB.
    //     const newUser = new User({
    //         email: req.body.username,
    //         password: hash
    //     });
    //     newUser.save().then((result) => {
    //         res.render("secrets");// only render when user gets logged in
    //     }).catch((error) => {
    //         console.log(error);
    //     })

    // }).catch((error) => {
    //     console.log(error);
    // });


    //MD5

    // const newUser = new User({
    //     email: req.body.username,
    //     password: md5(req.body.password)
    // });

    // newUser.save().then((result) => {
    //     res.render("secrets");// only render when user gets logged in
    // }).catch((error) => {
    //     console.log(error);
    // })

});


app.post("/login", function (req, res) {

    const email = req.body.username;
    const password = req.body.password;

    const user = new User({
        username: req.body.username,
        password: req.body.password
    });


    req.login(user, function (error) {
        if (error) {
            console.log(error);
        } else {
            passport.authenticate("local")(req, res, function () {

                res.redirect("/secrets");
            });
        }
    });


    // User.findOne({ email: email }).then((foundUser) => {
    //     if (foundUser) {
    //         bcrypt.compare(password, foundUser.password).then((result)=>{

    //          if(result===true){
    //             res.render("secrets");
    //          } else {
    //             console.log("Password is not matched");
    //          }

    //         }).catch((error)=>{
    //             console.log(error);
    //         });
    //     }
    //     else {
    //         console.log("No such user exists");
    //     }
    // }).catch((error) => {
    //     console.log(error);
    // });

    // User.findOne({ email: email }).then((foundUser) => {
    //     if (foundUser) {
    //         if (md5(password) == foundUser.password) {
    //             res.render("secrets");
    //         }
    //         else {
    //             console.log("Password not matched");
    //         }
    //     }
    //     else {
    //         console.log("No such user exists");
    //     }
    // }).catch((error) => {
    //     console.log(error);
    // })

});


app.listen(3000, function () {
    console.log("Server started on port 3000");
});
