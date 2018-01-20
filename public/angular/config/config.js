const app = angular.module("nibgc", [
	'ngRoute'
])

const socket = io()

swal.setDefaults({
	allowOutsideClick: false
})

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

	.when("/grupos", {
		templateUrl: 'angular/view/grupos/list.html',
		controller: 'grupos'
	})
	.when("/grupos/cadastro", {
		templateUrl: 'angular/view/grupos/form.html',
		controller: 'gruposForm'
	})
	.when("/grupos/cadastro/:id", {
		templateUrl: 'angular/view/grupos/form.html',
		controller: 'gruposForm'
	})

	.when("/ministerios", {
		templateUrl: 'angular/view/ministerios/list.html',
		controller: 'ministerios'
	})
	.when("/ministerios/cadastro", {
		templateUrl: 'angular/view/ministerios/form.html',
		controller: 'ministeriosForm'
	})
	.when("/ministerios/cadastro/:id", {
		templateUrl: 'angular/view/ministerios/form.html',
		controller: 'ministeriosForm'
	})
	.when("/ministerios/:id/feira", {
		templateUrl: 'angular/view/ministerios/feira.html',
		controller: 'ministeriosFeira'
	})
	.when("/ministerios/:id/gerencia", {
		templateUrl: 'angular/view/ministerios/gerencia.html',
		controller: 'ministeriosGerencia'
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
