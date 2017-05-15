var express = require('express');
var path = require('path');

var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users');
mongoose.Promise = global.Promise;

var UserSchema = new mongoose.Schema({
	name: String,
	address: {
		Street: String,
		City: String,
		State: String
	},
	ordered: [String],
	lifetime_value: Number
});
mongoose.model('User', UserSchema);
var User = mongoose.model('User');
app.use(bodyParser.urlencoded({extended:true}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
	User.find({}, function(err, users){
		if(err){
			console.log(err);
		} else {
			console.log(users);
			return res.json(users);
		}
	});
});

app.get('/match', function(req, res){
	User.aggregate(
		{$match: {'address.State': 'CA'}},
		{$count: 'californians'}
	, function(err, users){
		if(err){
			console.log(err);
		} else {
			console.log(users);
			return res.json(users);
		}
	});
});

app.get('/group', function(req, res){
	User.aggregate([
		{$group: {
			_id: '$address.City',
			total_value: {$sum: '$lifetime_value'}
		}}]
	, function(err, users){
		if(err){
			console.log(err);
		} else {
			console.log(users);
			return res.json(users);
		}
	})
});

app.get('/unwind', function(req, res){
	User.aggregate([
		{$unwind: '$ordered'}
	], function(err, ordered){
		if(err){
			console.log(err);
		} else {
			console.log(ordered);
			return res.json(ordered);
		}
	});
});

app.get('/out', function(req, res){
	User.aggregate([
		{$unwind: '$ordered'},
		{$addFields: {_id: {name: '$name', ordered: '$ordered'}}},
		{$project: {id: 1, address: 1}},
		{$out: "orders"}
	], function(err, coll){
		if(err){
			console.log(err);
		} else {
			mongoose.connection.db.collection('orders', function(err, collection){
				collection.find({}).toArray(function(err, orders){
					if(err){
						console.log(err);
					} else {
						for(var i = 0; i < orders.length; i++){
							quantity = Math.round(Math.random()*3)+1;
							orders[i].quantity = quantity;
							collection.save(orders[i]);
						}
						return res.json(orders);
					}
				});
			});
		}
	});
});

app.get('/lookup', function(req, res){
	mongoose.connection.db.collection('orders', function(err, collection){
		collection.aggregate([
				{$group: 
					{_id: '$_id.name', 
					ordQuant: {
						$push: {order: '$_id.ordered', quantity: '$quantity'}
					}}},
				{$lookup: {
					from: 'users',
					localField: '_id',
					foreignField: 'name',
					as: 'cust'
				}}
			]).toArray(function(err, orders){
			if(err){
				console.log(err);
			} else {
				console.log(orders);
				return res.json(orders);
			}
		});
	});
});

app.get('/out1', function(req, res){
	mongoose.connection.db.collection('orders', function(err, collection){
		collection.aggregate([
				{$group: 
					{_id: '$_id.name', 
					ordQuant: {
						$push: {order: '$_id.ordered', quantity: '$quantity'}
					}}},
				{$lookup: {
					from: 'users',
					localField: '_id',
					foreignField: 'name',
					as: 'cust'
				}},
				{$out: 'cmb'}
			]).toArray(function(err, orders){
			if(err){
				console.log(err);
			} else {
				mongoose.connection.db.collection('orders', function(err, collection){
					collection.find({}).toArray(function(err, orders){
						if(err){
							console.log(err);
						} else {
							console.log(orders);
							return res.json(orders);
						}
					});
				});
			}
		});
	});
});

app.get('/unwind1', function(req, res){
	mongoose.connection.db.collection('cmb', function(err, collection){
		collection.aggregate([
				{$unwind: '$ordQuant'}
			]).toArray(function(err, orders){
			if(err){
				console.log(err);
			} else {
				console.log(orders);
				return res.json(orders);
			}
		});
	});	
});

app.get('/group1', function(req, res){
	mongoose.connection.db.collection('cmb', function(err, collection){
		collection.aggregate([
				{$unwind: '$ordQuant'},
				{$group: {
					_id: '$ordQuant.order',
					average_quantity: {$avg: '$ordQuant.quantity'}
				}},
				{$sort: {average_quantity: -1, _id: 1}}
			]).toArray(function(err, orders){
			if(err){
				console.log(err);
			} else {
				console.log(orders);
				return res.json(orders);
			}
		});
	});	
});
app.listen(9000);