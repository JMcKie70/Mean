var app = angular.module('app', ['ngRoute', 'ngMessages']);

app.config(function($routeProvider){
	$routeProvider
		.when('/', { //angular route
			templateUrl: 'partials/login.html', //partial rendered
			controller: 'LoginController' //controller used
		})
		.when('/questions_table', {
			templateUrl: 'partials/table.html', 
			controller: 'TableController'
		})
		// .when('/new_question', {
		// 	templateUrl: 'partials/new_question.html', 
		// 	controller: 'New_questionController'
		// })
		// .when('/question/:id', {
		// 	templateUrl: 'partials/question.html', 
		// 	controller: 'QuestionController' //put $routeParams in controllers
		// })
		// .when('/question/:id/new_answer', {
		// 	templateUrl: 'partials/new_answer.html', 
		// 	controller: 'New_answerController'
		// })
		.otherwise({
			redirectTo: '/'
		})
})