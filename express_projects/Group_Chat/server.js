var express = require("express");
	// require express
var path = require("path");

require('colors');
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
var messagesArr = [];
io.sockets.on('connection', function (socket){//this only needed once

	console.log("================".blue);
	console.log(messagesArr);
	console.log("================".blue);

	if (messagesArr.length != 0){
		socket.emit('old_messages', {oldmessagesArr: messagesArr});
	}

	socket.on("message_entry", function (data){

		console.log("======== message_entry ========".cyan);
		console.log(data);

		io.emit('new_message', {author: data.message_author, message: data.message_content});
    	
    	messagesArr.push(data);
    	console.log(messagesArr);
    	
	})
});



