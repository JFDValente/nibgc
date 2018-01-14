const app = angular.module("nibgc", [
	'ngRoute'
])

const socket = io()

app.config(function($routeProvider, $locationProvider){

	$routeProvider
	.when("/", {
		templateUrl: 'angular/view/dashboard.html',
		controller: 'dashboard'
	})
	.when("/membros", {
		templateUrl: 'angular/view/membros/list.html',
		controller: 'membros'
	})
	.when("/membros/cadastro", {
		templateUrl: 'angular/view/membros/form.html',
		controller: 'membrosForm'
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
