
app.directive("back", function($location){

	return {
		restrict: "EA",
		replace: true,
		transclude: true,
		scope: {
			url: "@",
			class: "@"
		},
		controller: ['$scope', function($scope) {
			$scope.goTo = () => {
				if($scope.url) {
					$location.path($scope.url)
				}
				else {
					window.history.back()
				}
			}
		}],
		template: `
		<button ng-click="goTo()"	
			class="ui left labeled icon button {{ class }}" type="button">
			<i class="icon left arrow"></i>
			<ng-transclude></ng-transclude>
		</button>
		`
	}
})
