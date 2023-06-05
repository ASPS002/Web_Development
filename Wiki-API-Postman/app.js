const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = new mongoose.Schema({
  title: String,
  content: String
})


const Article = mongoose.model("Article", articleSchema);


//REQUEST TARGETING ALL THE ARTICLES
// CHAINED ROUTE HANDLERS USING EXPRESS
app.route("/articles")
  .get(function (req, res) {

    Article.find({}).then((foundArticles) => {
      // console.log(foundArticles);
      res.send(foundArticles);
    }).catch((error) => {
      console.log(error);
    });
  })
  .post(function (req, res) {
    // console.log(req.body.title);
    // console.log(req.body.content);

    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });
    newArticle.save().then((result) => {
      res.send("successfully saved new article");
    }).catch((error) => {
      res.send(error);
    });

  })
  .delete(function (req, res) {

    Article.deleteOne({ _id: "647d702191f55261cc208209" }).then((result) => {
      res.send("Successfully deleted");
    }).catch((error) => {
      res.send(error);
    });

  });

//REQUEST TARGETING SPECIFIC ARTICLE
app.route("/articles/:articleTitle")
  .get(function (req, res) {

    Article.findOne({ title: req.params.articleTitle }).then((foundArticle) => {
      res.send(foundArticle);
    }).catch((error) => {
      res.send(error);
    });

  })
  .put(function (req, res) {

    Article.updateOne({ title: req.params.articleTitle },
      { title: req.body.title, content: req.body.content }).then((result) => {
        res.send("Succesfully updated article");
      }).catch((error) => {
        res.send(error);
      });
  })
  .delete(function(req,res){
    
    Article.deleteOne({title:req.params.articleTitle}).then((result)=>{
        res.send("Successfully deleted article");
    }).catch((error)=>{
        res.send(error);
    });
  });




app.listen(3000, function () {
  console.log("Server started on port 3000");
});