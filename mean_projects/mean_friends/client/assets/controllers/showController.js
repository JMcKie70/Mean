app.controller('ShowController', ['$scope', '$routeParams', 'FriendsFactory', function($scope, $routeParams, FriendsFactory){
	function show(id){
		FriendsFactory.show(id, function(data){
    		$scope.user = data;
    		$scope.user.birthday = new Date($scope.user.birthday).toLocaleDateString();
    		$scope.user.createdAt = new Date($scope.user.createdAt).toLocaleString();
   		})
	}
	show($routeParams.id);
}])