// Required Invocations____
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// Mongoose Section____
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/messageBoard_db');
mongoose.Promise = global.Promise

// Associations Setup____
var Schema = mongoose.Schema;

// Model Setup_____________________________________________

// Messages___
var MessageSchema = new mongoose.Schema({
  author: {type: String, required: true, minlength: 4},
  text: {type: String, required: true, minlength: 1},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
  }, {timestamps: true}
);

// Comments___
var CommentSchema = new mongoose.Schema({
  _message: {type: Schema.Types.ObjectId, ref: 'Message'},
  author: {type: String, required: true, minlength: 4},
  text: {type: String, required: true, minlength: 1}},
  {timestamp: true}
);

mongoose.model('Message', MessageSchema);
mongoose.model('Comment', CommentSchema);

var Message = mongoose.model('Message');
var Comment = mongoose.model('Comment');

// Routes_______________________________________________________

app.get('/', function(req, res){
    Message.find({})
    .populate('comments').exec(function(errors, data) {
      if(errors){
        console.log(errors);
      }
      console.log(data)
      res.render('index', {messages: data});
    })

})

app.post('/submit_message', function(req, res){
  console.log("POST DATA", req.body);
  var message = new Message({author: req.body.author, text: req.body.text});
  console.log(message);
  message.save(function(errors, data) {
    // if there is an error console.log that something went wrong!
    if(errors) {
      console.log('something went wrong');
    } else { // else console.log that we did well and then redirect to the root route
      console.log('new message added!');
      res.redirect('/');
  }})
})

// Cetting all messages and comments_____________

// app.get('/message/:id', function (req, res){
//  Message.findOne({_id: req.params.id})
//  .populate('comments').exec(function(err, message) {
//       res.render('index', {message: message});
//   });
// });

// Creating Comment with the parent Message post id_____________
app.post('/message/:id', function (req, res){
  console.log(req.params.id)
  Message.findOne({_id: req.params.id}, function(errors, message){
    var comment = new Comment(req.body);
    comment._message = message._id;
    message.comments.push(comment);
    console.log(comment);
    comment.save(function(errors){
      message.save(function(errors){
        if(errors) { console.log('Error'); }
        else { res.redirect('/'); }
        });
      });
   });
 });

app.listen(8000, function(){
  console.log('listening on port 8000');
  console.log('Welcome to Message Board')
})
