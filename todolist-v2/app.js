//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const _ = require('lodash');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];

mongoose.connect("mongodb+srv://ujjwal:Test123@cluster0.k4le7pi.mongodb.net/todolistDB")//it will connect to local host having port 27017 and then search for sample_airbnb db and if it will not find one it will create one

const itemsSchema = new mongoose.Schema({

  name: String

});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Buy Food"
});
const item2 = new Item({
  name: "Cook Food"
});
const item3 = new Item({
  name: "Eat Food"
});

const defaultItems = [item1, item2, item3];

const listSchema = new mongoose.Schema({

  name: String,
  items: [itemsSchema]//array of itemsSchema

});

const List = mongoose.model("List", listSchema);


app.get("/", function (req, res) {


  Item.find({}).then((items) => {
    if (items.length == 0) {
      Item.insertMany(defaultItems).then((result) => {
        console.log("Successfully saved default items to mongoose database")
        // console.log(result); // array of inserted documents

      }).catch((error) => {
        console.log(error);
      });
      res.redirect("/");
    }
    else {
      res.render("list", { listTitle: "Today", newListItems: items });
    }
  }).catch((error) => {
    console.log(error);
  });


});

app.post("/", function (req, res) {


  const itemName = req.body.newItem;

  const listName = req.body.list;

  const item4 = new Item({
    name: itemName
  });
  if (listName == "Today") {
    item4.save();
    res.redirect("/");
  } else {

    List.findOne({ name: listName }).then((foundList) => {
      foundList.items.push(item4);
      foundList.save();
      res.redirect("/" + listName);
    }).catch((error) => {
      console.log(error);
    });

  }
});

app.post("/delete", function (req, res) {

  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;
  if (listName == "Today") {
    Item.findByIdAndRemove(checkedItemId).then((result) => {
      console.log("successfully removed item from the database");
      res.redirect("/");
    }).catch((error) => {
      console.log(error);
    });
  }else{
    List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkedItemId}}}).then((result)=>{
      console.log("Successfully deleted");
      res.redirect("/"+listName);
    }).catch((error)=>{
      console.log(error);
    })

  }
});





app.get("/:customListName", function (req, res) {
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({ name: customListName }).then((foundList) => {

    if (!foundList) {
      const list = new List({
        name: customListName,
        items: []
      });
      list.save();
      res.redirect("/" + customListName);
    } else {

      res.render("list", { listTitle: foundList.name, newListItems: foundList.items });
    }
  }).catch((error) => {
    console.log(error);
  });

});


app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
