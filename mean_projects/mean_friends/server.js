console.log("Entering server.js!!!");

var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();

app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(8000, function(){
  console.log("Exiting server.js on port 8000!!!");
});