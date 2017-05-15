// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Require path (to use file path shortcuts)
var path = require('path');
//require mongoose
var mongoose = require('mongoose');
// To connect to mongodb database using mongoose
// db name in mongodb follows localhost here
mongoose.connect('mongodb://localhost/owl_db');
// To avoid breaking in future due to deprecation
mongoose.Promise = global.Promise;

var OwlSchema = new mongoose.Schema({
	name: {type:String, required:true, minlength: 2},
	information: {type:String, required:true, maxlength: 250}
});

mongoose.model('Owl', OwlSchema); // Schema in our Models
// other example mongoose.model('Post', PostSchema);
var Owl = mongoose.model('Owl'); // To retrieve this Schema from our Models
// var Post = mongoose.model('Post');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// app.use(express.static(__dirname + './static'))
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request
app.get('/', function(req, res){
    Owl.find({}, function(errors, data){
        if(errors){
            console.log(errors);
        }
        console.log("Index data is: ", data);
        res.render('index', {owls: data});
    })
});
app.get('/owls/new', function(req, res){
        res.render('new');
});
app.post('/owls', function(req, res){
    console.log("Body is ", req.body);
    var owl = new Owl(req.body);
    owl.save(function(errors, data){
        if(errors){
            console.log(errors);
        }
        console.log("Data is ", data);
        res.redirect('/');
    })
});

app.get('/owls/:id', function(req, res){
    Owl.findOne({_id:req.params.id}, function(errors, owl){
        if(errors){
            console.log(errors);
        }
        console.log("Owl to display is: ", owl);
        res.render('owls', {owl: owl});
    })
});


app.get('/owls/edit/:id', function(req, res){
    Owl.findOne({_id:req.params.id}, function(errors, owl){
        if(errors){
            console.log(errors);
        }
        console.log("Owl to edit is: ", owl);
        res.render('edit', {owl: owl});
    })
});
app.post('/owls/:id', function(req, res){
    console.log("Edited body is ", req.body);
    console.log("Params", req.params);
    Owl.update({_id:req.params.id}, {$set: {name: req.body.name, information: req.body.information}}, function(errors, data){
        if(errors){
            console.log(errors);
        }
        console.log("Edited data to database is ", data);
        res.redirect('/');
    })
});
app.get('/owls/destroy/:id', function(req, res){
    console.log("Deleted body is ", req.body);
    Owl.remove({_id:req.params.id}, function(errors){
        if(errors){
            console.log(errors);
        }
        console.log("Deleted!!!!")
        res.redirect('/');
    })
});
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("Listening on port 8000");
});
