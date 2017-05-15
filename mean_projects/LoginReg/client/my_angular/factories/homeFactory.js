app.factory('HomeFactory', ['$location', '$http', function($location, $http){
	var factory = {};
	factory.register = function(user){
		$http({
			url: '/register', 
			method: 'POST', 
			data: user
		}).then(function(res){
			$location.url('/home')
			console.log(res);
		}, function(res){
			console.log(res);
		})
	};
	factory.login = function(user){
		$http({
			url: '/login', 
			method: 'POST', 
			data: user
		}).then(function(res){
			console.log(res);
			$location.url('/home')
		}, function(res){
			console.log(res);
		})
	};
	factory.getUser = function(callback){
		$http({
			url: '/user', 
			method: 'GET'
		}).then(function(res){
			callback(res.data);
		}, function(res){
			console.log(res);
		})
	}
	return factory;
}])