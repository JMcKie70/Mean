app.controller('HomeController', ['$scope', '$location', 'HomeFactory', function($scope, $location, HomeFactory){
	function getUser(){
		HomeFactory.getUser(function(data){
			$scope.user = data;
		})
	}
	getUser();
}])