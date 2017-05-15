app.controller('WallController', ['$scope', '$location', 'WallFactory', function($scope, $location, WallFactory){
	function currentUser(){
		WallFactory.currentUser(function(data){
			$scope.user = data;
		});
	}
	function getPosts(){
		WallFactory.getPosts(function(data){
			$scope.posts = data;
		})
	}
	getPosts();
	currentUser();
	$scope.addPost = function(post){
		WallFactory.addPost(post, getPosts);
		$scope.newPost = {};
	}
	$scope.addComment = function(comment, post_id){
		WallFactory.addComment(comment, post_id, getPosts);
	}
}])