app.controller('NewController', ['$scope', '$routeParams', 'FriendsFactory', function($scope, $routeParams, FriendsFactory){
  $scope.addFriend = function(friend){
    FriendsFactory.newFriend(friend);
  }
  
}])