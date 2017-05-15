var express = require("express");
	// require express
var path = require("path");
	// aids working with file and directory paths
var session = require('express-session');
	// to use session
var app = express();
	// create the express app
app.use(session({secret: 'codingdojorocks'}));
	// string for encryption
var bodyParser = require('body-parser');
	// require body-parser
app.use(bodyParser.urlencoded({ extended: true }));
	// use when you need post data
app.use(express.static(path.join(__dirname, "./static")));
	// static content
app.set('views', path.join(__dirname, './views'));
	// setting up ejs and our views folder
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
 res.render("index");
});	// root route to render the index.ejs view

	// post route for adding a user
app.post('/result', function(req, res) {
	console.log("POST DATA", req.body);
	req.session.name = req.body.name;
	req.session.location = req.body.location;
	req.session.language = req.body.language;
	req.session.comment = req.body.comment;
 	// Then redirect to the root route
 res.redirect('/');
})

app.get('/result', function(req, res) {
	ejs_variables = {
		name: req.session.name,
		location: req.session.location,
		language: req.session.language,
		comment: req.session.comment
	}
 res.render("result", ejs_variables);
});

	// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});
