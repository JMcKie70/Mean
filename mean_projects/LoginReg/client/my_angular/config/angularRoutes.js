var app = angular.module('app', ['ngRoute', 'ngMessages'])

app.config(function($routeProvider, $httpProvider){
	$httpProvider.interceptors.push(
		function($q, $location){
			return {
				'responseError': function(rejection){
					if(rejection.status == 401){
						$location.url('/')
					}
					return $q.reject(rejection);
				}
			}
		})
	$routeProvider
		.when('/', {
			templateUrl: 'partials/login.html', 
			controller: 'LoginController'
		})
		.when('/home', {
			templateUrl: 'partials/home.html', 
			controller: 'HomeController'
		})
		.otherwise({
			redirectTo: '/'
		})
})