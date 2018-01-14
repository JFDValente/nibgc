
app.directive("message", function(){	
	return {
		restrict: "EA",
		replace: true,
		scope: {
			header: "@",
			text: "@",
			color: "@"
		},
		template: `
			<div class="ui {{ color || 'olive' }} message ng-if="!clientes.length">				
				<div class="header" ng-if="header">
					{{ header }}
				</div>
				<p ng-class="{ 'header': !header }">{{ text }}</p>
			</div>
		`
	}
})