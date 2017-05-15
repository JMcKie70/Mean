var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
	name: {type:String, required: true, minlength: 2}
}, {timestamps:true})

mongoose.model('User', UserSchema);

var QuestionSchema = new mongoose.Schema({
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	question: {type:String, required: true, minlength:10},
	description: {type:String},
	_answers: [{type:Schema.Types.ObjectId, ref: 'Answer'}]
}, {timestamps: true})

mongoose.model('Question', QuestionSchema);

var AnswerSchema = new mongoose.Schema({
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	answer: {type:String, required: true, minlength:5},
	details: {type:String},
	_question: {type:Schema.Types.ObjectId, ref: 'Question'}
}, {timestamps: true})

mongoose.model('Answer', AnswerSchema);

//Schemas