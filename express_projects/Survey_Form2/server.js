var express = require("express");
	// require express
var path = require("path");
	// aids working with file and directory paths
var app = express();
	// create the express app
app.use(express.static(path.join(__dirname, "./static")));
	// static content
app.set('views', path.join(__dirname, './views'));
	// setting up ejs and our views folder
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
 res.render("index");
});	// root route to render the index.ejs view

var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});
// this is a new line we're adding AFTER our server listener
// take special note how we're passing the server
// variable. unless we have the server variable, this line will not work!!
var io = require('socket.io').listen(server);
// Whenever a connection event happens (the connection event is built in) run the following code
io.sockets.on('connection', function (socket){
	socket.on("posting_form", function (data){
		data.randNum = Math.floor(Math.random() * (1000)) + 1;
		 socket.emit('random_number', {name: data.name, location: data.location, language: data.language, comment: data.comment, number: data.randNum});
    })
});




