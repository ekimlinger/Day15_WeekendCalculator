var express = require("express");
var app = express();
var path = require("path");
var index = require('./routes/index.js')
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/",index);

app.set("port",(process.env.PORT || 3000));
app.get("/calculate/:type", function(req,res){
  //not exactly sure what this will do
  console.log("Into app.js")
});
app.get("/*", function(req,res){
  var file = req.params[0] || "/views/index.html";
  res.sendFile(path.join(__dirname,"./public/", file));
});

app.listen(app.get("port"),function(){
  console.log("Listening on port: ", app.get("port"));
});
