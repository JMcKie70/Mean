app.controller('LoginController', ['$scope', '$location', 'HomeFactory', function($scope, $location, HomeFactory){
	$scope.registerUser = function(user){
		HomeFactory.register(user);
	}

	$scope.login = function(user){
		HomeFactory.login(user);
	}
}])