const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const ejs = require('ejs');

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/mydb");

const schema = {
  tittle: String,
  description: String,
};

const Food = mongoose.model("article", schema);

app.listen(3000, function(){
    console.log("server up and running!");
});

app.get("/", function (request, response) {
  Food.find(function (err, articles) {
    if (err == null) {
      response.send(JSON.stringify(articles));
    } else {
      response.send(err);
    }
  });
});

app.post("/", function (request, response) {
  var new_value = Food({
    tittle: request.body.tittle,
    description: request.body.description,
  });

  new_value.save(function (err) {
    if (!err) {
        response.send("saved!");
    }else{
      response.send("something went wrong :(");
    }
  });

  
});