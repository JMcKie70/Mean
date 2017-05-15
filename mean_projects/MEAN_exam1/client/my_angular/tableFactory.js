app.factory('TableFactory', ['$location', '$http', function($location, $http){
	var factory = {};
	factory.login = function(user){
		$http({
			url:'/login', //server route
			method: 'POST',
			data: user
		}).then(function(res){ //if good
			$location.url('/questions_table') //angular route
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
			$location.url('/questions_table')
			// console.log(res);
		})
	};
	factory.getQuestions = function(callback){
		$http({
			url: '/questions', 
			method: 'GET'
		}).then(function(res){
			console.log(res);
			callback(res.data);
		}, function(res){
			console.log(res);
		})
	};
	// factory.addAnswer = function(post, callback){
	// 	console.log('printing data in the factory ', post)
	// 	$http({
	// 		url:'/post', 
	// 		method: 'POST', 
	// 		data: post
	// 	}).then(function(res){
	// 		// console.log(res);
	// 		callback();
	// 	}, function(res){
	// 		console.log(res);
	// 	})
	// };
	// factory.addComment = function(comment, post_id, callback){
	// 	$http({
	// 		url: '/comment/' + post_id,
	// 		method: 'POST', 
	// 		data: comment
	// 	}).then(function(res){
	// 		callback();
	// 		console.log(res);
	// 	}, function(res){
	// 		console.log(res);
	// 	})
	// }
	return factory;
}])