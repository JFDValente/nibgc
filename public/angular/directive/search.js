app.directive("search", function(){
	return {
		restrict: "EA",
		controllerAs: "this",
		scope: {
			placeholder: "@",
			btnText: "@",
			find: "&onsearch",			
		},
		controller: function($scope, $element) {
			$scope.go = function(term) {					
				let input = $element.find("input")
				$scope.find({ value: input.val() })
			}
		},
		link: function(scope, elem, attr){

			let input = elem.find("input")

			input.keyup(function(){
				let val = input.val()
				let replaced = val
								.replace("á","a")
								.replace("é","a")
								.replace("í","a")
								.replace("ó","a")								

				input.val(replaced)			
			})
		},
		template: `
			<form class="ui action input" ng-submit="go()">
			  <input 
			  	type="search" 
			  	placeholder="{{ placeholder }}"			  	
			  	autofocus>
			  <button class="ui button">{{ btnText || 'Pesquisar' }}</button>
			</form>
		`
	}
})