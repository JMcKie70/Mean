app.controller('LoginController', ['$scope', '$location', 'TableFactory', function($scope, $location, TableFactory){
	// $scope.addUser = function(){
	// 	console.log($scope.newUser);
	// 	$scope.newUser = user;
	// }
	$scope.login = function(user){
			TableFactory.login(user);
	}
}])