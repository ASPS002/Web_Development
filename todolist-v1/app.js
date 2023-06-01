
const express = require('express');
const bodyParser = require('body-parser');
const getDate = require('./date');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // express requires this to render static files

const date = require(__dirname+"/date.js");// whatever is exported from the date module gets associated with date object

console.log(date);
// { getDate: [Function: getDate], getDay: [Function: getDay] }

app.set('view engine', 'ejs');

var items = ["buy food", "cook food", "clean utensil", "sleep"];
var workItems = [];
app.get("/", function (req, res) {

    res.render("list", { listTitle: date.getDate(), newItems: items });

});

app.post("/", function (req, res) {

    var item = req.body.newItem;
    // console.log(req.body);
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    }
    else {

        items.push(item);
        res.redirect("/");
    }
    


});


app.get("/work", function (req, res) {

    res.render("list", { listTitle: "Work List", newItems: workItems });
});

app.get("/about",function(req,res){

    res.render("about");
});

// app.post("/work", function (req, res) {

//     workItems.push(req.body.newItem);
//     res.redirect("/work");

// });




app.listen(3000, function () {

    console.log("app is listening on port 3000");
});
