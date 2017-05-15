app.controller('TableController', ['$scope', '$location', 'TableFactory', function($scope, $location, TableFactory){
	function currentUser(){
		TableFactory.currentUser(function(data){
			$scope.user = data;
		});
	}
	function getQuestions(){
		TableFactory.getQuestions(function(data){
			$scope.questions = data;
		})
	}
	getQuestions();
	currentUser();
}])