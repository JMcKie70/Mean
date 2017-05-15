 console.log("Entering config/routes.js!!!")

var friends = require('../controllers/friends.js');

module.exports = function(app){
	app.get('/friends', friends.index);
	app.get('/friends/:id', friends.show);
	app.post('/friends', friends.create);
	app.put('/friends/:id', friends.update);
	app.delete('/friends/:id', friends.delete);
}
// this adds route listeners to friends for 5 of the 7 RESTful routes, excluding new and edit.
console.log("Exiting config/routes.js!!!")