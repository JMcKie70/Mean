app.factory('WallFactory', ['$location', '$http', function($location, $http){
	var factory = {};
	factory.register = function(user){
		$http({
			url: '/register', //server route
			method: 'POST',
			data: user
		}).then(function(res){ //if good
			// console.log(res);
			$location.url('/wall') //angular route
		}, function(res){
			console.log(res); //if bad
		})
	};
	factory.currentUser = function(callback){
		$http({
			url: '/current', 
			method: 'GET'
		}).then(function(res){
			callback(res.data);
		}, function(res){
			$location.url('/')
			// console.log(res);
		})

	};
	factory.login = function(user){
		$http({
			url:'/login', //server route
			method: 'POST',
			data: user
		}).then(function(res){ //if good
			$location.url('/wall') //angular route
		}, function(res){
			console.log(res); //if bad
		})
	};
	factory.addPost = function(post, callback){
		console.log('printing data in the factory ', post)
		$http({
			url:'/post', 
			method: 'POST', 
			data: post
		}).then(function(res){
			// console.log(res);
			callback();
		}, function(res){
			console.log(res);
		})
	};
	factory.getPosts = function(callback){
		$http({
			url: '/posts', 
			method: 'GET'
		}).then(function(res){
			console.log(res);
			callback(res.data);
		}, function(res){
			console.log(res);
		})
	};
	factory.addComment = function(comment, post_id, callback){
		$http({
			url: '/comment/' + post_id,
			method: 'POST', 
			data: comment
		}).then(function(res){
			callback();
			console.log(res);
		}, function(res){
			console.log(res);
		})
	}
	return factory;
}])