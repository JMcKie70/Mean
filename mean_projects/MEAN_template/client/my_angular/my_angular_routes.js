var app = angular.module('app', ['ngRoute', 'ngMessages']);

app.config(function($routeProvider){
	$routeProvider
		.when('/', { //angular route
			templateUrl: 'partials/login.html', //partial rendered
			controller: 'LoginController' //controller used
		})
		.when('/wall', {
			templateUrl: 'partials/wall.html', 
			controller: 'WallController'
		})
		.otherwise({
			redirectTo: '/'
		})
})