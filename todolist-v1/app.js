
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // express requires this to render static files

app.set('view engine', 'ejs');

var items = ["buy food", "cook food", "clean utensil", "sleep"];
var workItems = [];
app.get("/", function (req, res) {


    var options = {

        day: "numeric",
        weekday: "long",
        month: "long",
        year: "numeric"

    }
    var today = new Date();
    var day = today.toLocaleDateString("en-US", options);//passing options formats the date in a format specified in the options object;
    res.render("list", { listTitle: day, newItems: items });


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
