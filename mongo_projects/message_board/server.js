var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');

var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/message_db')
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var MessageSchema = new mongoose.Schema({
 name: {type: String, required:true, minlength: 4},
 message: {type: String, required:true},
 comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
})

var CommentSchema = new mongoose.Schema({
 name: {type: String, required:true, minlength: 4},
 _message: {type: Schema.Types.ObjectId, ref: 'Message'},
 comment: {type: String, required:true },

})

mongoose.model('Message', MessageSchema);
var Message = mongoose.model('Message')

mongoose.model('Comment', CommentSchema);
var Comment = mongoose.model('Comment')

// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
	


app.get("/", function(req, res){
	Message.find({}, false, true).populate('comments').exec(function(err, messages){
	      res.render('index.ejs', {users: messages});

	});
});


app.post("/users", function(req, res){
	var newMessage = new Message({name: req.body.name, message: req.body.message});
	newMessage.save(function(err){
		if(err){
			console.log(err);
			res.render('index.ejs', {errors: newMessage.errors});
		} else {
			console.log("success");
			res.redirect('/');
		}
	})
})

// app.post('/message/:id', function (req, res){
//   console.log(req.params.id)
//   Message.findOne({_id: req.params.id}, function(errors, message){
//     var comment = new Comment(req.body);
//     comment._message = message._id;
//     message.comments.push(comment);
//     console.log(comment);
//     comment.save(function(errors){
//       message.save(function(errors){
//         if(errors) { console.log('Error'); }
//         else { res.redirect('/'); }
//         });
//       });
//    });
//  });

app.post("/add_comment/:id", function(req, res){
	var message_id = req.params.id;
	Message.findOne({_id: message_id}, function(err, message){
		var newComment = new Comment({name: req.body.name, comment: req.body.comment});
		console.log(newComment)
		console.log('this is the message param',message)
		newComment._message = message._id;
		
		newComment.save(function(err,new_Comment){
			if(err){
				console.log(err);
				// res.render('index', {errors: err});
			} else {
				Message.update({_id: message._id}, {$push: {"comments": new_Comment}}, function(err){
				});
				console.log("comment added");
				res.redirect("/");
			}
		});
	});
});



app.listen(6789);	