app.directive("loader", function(){
	return {
		restrict: "EA",
		scope: {
			model: "="
		},
		template: `
			<div class="ui inline loader" ng-class="{ 'active': model }"></div>
		`
	}
})