var mongoose = require('mongoose');
var User = mongoose.model('User');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
module.exports = {
	register: function(req, res){    //functions, db queries...
		var user = new User(req.body);
		user.save(function(err,data){
			if(err){
				res.status(400).send("User did not save.")
			}
			else{
				req.session.user = data;
				// console.log("Server controller line 13. Printing off session ", req.session.user);
				res.sendStatus(200);
			}
		})
	},
	login: function(req, res){
		User.findOne({email: req.body.email}, function(err, data){
			if(data == null){
				res.status(400).send("User not found.")
			}
			else{
				req.session.user = data;
				res.sendStatus(200);
			}
		})
	},
	current: function(req, res){
		if(req.session.user){
			res.json(req.session.user);
		}else{
			res.status(401).send("No user in session.");
		}
	},
	logout: function(req, res){
		req.session.destroy();
		res.redirect('/')
	},
	getPosts: function(req, res){
		Post.find({}).populate('user').populate({path: 'comments', populate: {path: 'user'}}).exec(function(err, data){
			if(err){
				res.status(400).send("Problem getting all the posts.")
			}
			else{
				res.json(data);
			}
		})
	},
	createPost: function(req, res){
		var post = new Post(req.body);
		post.user = req.session.user._id;
		post.save(function(err, data){
			if(err){
				res.status(400).send("Problem saving post");
			}
			else{
				res.sendStatus(200);
			}
		})
	},
	createComment: function(req, res){
		Post.findOne({_id: req.params.post_id}, function(err, post){
			if(err){
				res.status(400).send(err);
			}
			else{
				var comment = new Comment(req.body);
				comment.user = req.session.user._id;
				comment._post = post._id;
				comment.save(function(err, new_comment){
					if(err){
						res.status(400).send(err);
					}
					else{
						post.comments.push(new_comment);
						post.save(function(err, update_post){
							if(err){
								res.status(400).send(err);
							}
							else{
								res.sendStatus(200);
							}
						})
					}
				})
			}
		})
	}
}
