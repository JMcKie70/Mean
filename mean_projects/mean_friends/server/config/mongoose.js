console.log("Entering config/mongoose.js!!!");

var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mean_first');

var models_path = path.join(__dirname, './../models/');

fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf('.js') >= 0){
		require(models_path + '/' + file);
	}
});

console.log("Exiting config/mongoose.js!!!");