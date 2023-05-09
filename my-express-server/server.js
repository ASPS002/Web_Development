const express = require('express')
const app = express();
const port = 3000

app.get("/", (req, res) => {
  res.send("<h1>Hi I am Ujjwal Srivastava</h1>")
})

app.get("/contact", (req, res) => {
  res.send("Contact me at :srivastavaujjwal002@gmail.com")
})

app.get("/about", (req, res) => {
  res.send("Hi I am ujjwal.I am 20 years old from sultanpur(U.P).I am pursuing Electronic Engineering from IIT BHU.I love playing outdoor games and some indoor too.")
})

app.get("/Hobbies", (req, res) => {
  res.send("<ul><li>coffee</li><li>code</li><li>playing games</li><li>music</li></ul>")
})

app.listen(port, function(){
  console.log(`Example app listening on port ${port}`)
})

