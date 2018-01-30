app.directive('dropdownRemote', ['$timeout', function($timeout) {
    return {
        restrict: 'EA',
        require: 'ngModel',
        replace: true,
        transclude: true,
        scope: {
            ngModel: "=",
			change: "&",
            url: "@",
            text: "@",
            value: "@"
        },
        template: function (el, atts) {
            return `
			<div class="ui search">
				<div class="ui left icon input">
					<input ng-model="ngModel"
						class="prompt" type="text" placeholder="Nome do líder">
					<i class="users icon"></i>
				</div>
				<div class="results"></div>
			</div>
            `
        },
        link: function ($scope, el, atts, ngModel) {

			let input = $(el).find("input")

            ngModel.$render = function () {
				$(el).search({
				    minCharacters : 3,
					searchOnFocus: false,
				    apiSettings   : {
				      url: `${atts.url}?attr=${atts.text}&expression=${input.val()}`
				  	},
				  	fields: {
						results: "rows",
						title: atts.text,
						value: atts.value
					},
					onSelect: (result, response) => {
						$timeout(() => {
		                    $scope.$apply(() => {
		                        //ngModel.$setViewValue(result)
								$scope.change({ item: result })
		                    })
		                })
					}
				  })
            }
        }
    }
}])
