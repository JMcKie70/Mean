app.controller('HomeController', ['$scope', '$routeParams','FriendsFactory', function($scope, $routeParams, FriendsFactory){
	function getUsers(){
		FriendsFactory.getFriends(function(data){
			console.log(data);
			$scope.friends = data;
		})
	}
	getUsers();
	$scope.deleteUser = function(id){
		FriendsFactory.deleteUser(id, getUsers)
	}
}])