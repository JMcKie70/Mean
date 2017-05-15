var mongoose = require('mongoose');
//require mongoose
var OwlSchema = new mongoose.Schema({
	name: {type:String, required:true, minlength: 2},
	information: {type:String, required:true, maxlength: 250}
});

mongoose.model('Owl', OwlSchema); // Schema in our Models
// other example mongoose.model('Post', PostSchema);
var Owl = mongoose.model('Owl'); // To retrieve this Schema from our Models
// var Post = mongoose.model('Post');
