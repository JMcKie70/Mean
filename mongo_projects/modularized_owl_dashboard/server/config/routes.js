var my_controller = require('./../controllers/owls.js');
//controller.js???
module.exports = function(app) {
	// Routes in here
	app.get('/', my_controller.root);
	app.get('/owls/new', my_controller.new);
	app.post('/owls', my_controller.owls);
	app.get('/owls/:id', my_controller.display);
	app.get('/owls/edit/:id', my_controller.edit);
	app.post('/owls/:id', my_controller.update);
	app.get('/owls/destroy/:id', my_controller.destroy);
}
