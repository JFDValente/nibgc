const app = angular.module("nibgc", [
	'ngRoute'
])

app.config(function($routeProvider, $locationProvider){

	$routeProvider
	.when("/", {
		templateUrl: 'angular/view/dashboard.html',
		controller: 'dashboard'
	})
	.when('/logout', {
		redirectTo: function() {
			window.location.href = '/logout'
		}
	})

	.otherwise({
		redirectTo: '/'
	})

	$locationProvider.html5Mode(true)
})
