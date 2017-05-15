var app = angular.module('app', ['ngRoute']);
//  use the config method to set up routing:
app.config(function ($routeProvider) {
  $routeProvider
    .when('/users',{
        templateUrl: 'partials/customizeUsers.html',
        controller: 'CustomizeUsersController'
    })
    .when('/list',{
        templateUrl: 'partials/userList.html',
        controller: 'UserListsController'
    })
    .otherwise({
      redirectTo: '/users'
    });
});
app.factory('UserFactory', function(){
  var users = [
    {first_name:'Joe', last_name:'Smoe', favorite_language:'Java'},
    {first_name:'Bob', last_name:'Slob', favorite_language:'JavaScript'},
    {first_name:'Jill', last_name:'Pill', favorite_language:'Ruby'}
  ];
  var factory = {};
  factory.createUser = function(data){
    users.push(data);
  }
  factory.getUser = function(callback){
    callback(users);
  }
  factory.deleteUser = function(data){
    for(var i = 0; i < users.length; i++){
      // console.log("This is data: ",data);
      // console.log("This is users[i].first_name: ", users[i].first_name)
      if(users[i].first_name == data.first_name && users[i].last_name == data.last_name && users[i].favorite_language == data.favorite_language){
        
        users.splice(i,1);
      }
    }
  }
  return factory;
})
//  build the controllers
app.controller('CustomizeUsersController', ['$scope', 'UserFactory', function ($scope, UserFactory) {
  $scope.createUser = function(){
    UserFactory.createUser($scope.user);
    $scope.user = {};
  }
  $scope.getUser = function(){
    UserFactory.getUser(function(data){
      $scope.users = data;
    })
  }
  $scope.deleteUser = function(data){
    console.log(data);
    UserFactory.deleteUser(data);
  }
  $scope.getUser();//must invoke the getUser because not clicked and 
  //needs to be loaded every time.
}]);
app.controller('UserListsController', ['$scope', 'UserFactory', function ($scope, UserFactory) {
  $scope.getUser = function(){
    UserFactory.getUser(function(data){
      $scope.users = data;
    })
  }
}]);