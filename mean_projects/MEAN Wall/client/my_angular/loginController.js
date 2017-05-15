app.controller('LoginController', ['$scope', '$location', 'WallFactory', function($scope, $location, WallFactory){
	$scope.register = function(user){
		WallFactory.register(user);
	}
	$scope.login = function(user){
		WallFactory.login(user);
	}
}])