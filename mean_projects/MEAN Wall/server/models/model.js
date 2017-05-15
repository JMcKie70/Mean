var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
	name: {type:String, required: true},
	email: {type:String, required: true, unique: true}
}, {timestamps:true})

mongoose.model('User', UserSchema);

var PostSchema = new mongoose.Schema({
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	post: {type:String, required: true},
	comments: [{type:Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true})

mongoose.model('Post', PostSchema);

var CommentSchema = new mongoose.Schema({
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	comment: {type:String, required: true},
	_post: {type:Schema.Types.ObjectId, ref: 'Post'}
}, {timestamps: true})

mongoose.model('Comment', CommentSchema);