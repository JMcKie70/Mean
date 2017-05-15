// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Require path (to use file path shortcuts)
var path = require('path');

// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './client/static')));
// app.use(express.static(__dirname + './static'))
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './client/views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');

require('./server/config/mongoose.js');

require('./server/config/routes.js')(app);
//connecting to our moved routes in routes.js
//and passing in app as an argument to invoke it

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("Listening on port 8000");
});
