app.directive("search", function(){
	return {
		restrict: "EA",
		replace: true,
		transclude: true,
		controllerAs: "this",
		scope: {
			placeholder: "@",
			find: "&onsearch",
			class: "@"
		},
		controller: function($scope, $element) {
			$scope.go = function(term) {
				let input = $element.find("input")
				$scope.find({ value: input.val() })
			}
		},
		template: `
			<form
			ng-class="{{ class }}"
				class="ui action input" ng-submit="go()">
			  <input
			  	type="search"
			  	placeholder="{{ placeholder }}"
			  	autofocus>
			</form>
		`
	}
})
