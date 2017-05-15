var serverController = require('./../controllers/server_controller.js')

module.exports = function(app){
	app.post('/register', serverController.register);
	app.post('/login', serverController.login);
	app.get('/logout', serverController.logout);
	app.get('/current', serverController.current);
	app.get('/posts', serverController.getPosts);
	app.post('/post', serverController.createPost);
	app.post('/comment/:post_id', serverController.createComment);
}
//server routes