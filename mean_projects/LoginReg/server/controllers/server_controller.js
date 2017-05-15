var mongoose = require('mongoose');
var User = mongoose.model('User');

var bcrypt = require('bcryptjs');


module.exports = {
	register: function(req, res){
		var salt = bcrypt.genSaltSync(10);
		if(req.body.password == req.body.password_confirmation){
			var hash = bcrypt.hashSync(req.body.password, salt);
			var user = new User({name: req.body.name, email:req.body.email, password: hash});
			user.save(function(err, data){
				if(err){
					res.status(400).send(err);
				}
				else{
					req.session.user = data;
					res.sendStatus(200);
				}
			})
		}
	},
	login: function(req, res){
		User.findOne({email: req.body.email}, function(err, user){
			if(err){
				res.status(400).send(err);
			}
			else{
				if(bcrypt.compareSync(req.body.password, user.password)){
					req.session.user = user;
					res.sendStatus(200);
				}
			}
		})
	},
	logout: function(req, res){
		req.session.destroy();
		res.redirect('/');
	},
	loggedUser: function(req, res){
		res.json(req.session.user);
	},
	all: function(req, res){
		User.find({}, function(err, data){
			res.json(data);
		})
	}

}