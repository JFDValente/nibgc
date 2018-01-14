app.directive('dropdown', ['$timeout', function($timeout) {
    return {
        restrict: 'E',
        require: 'ngModel',
        replace: true,
        transclude: true,
        scope: {
            ngModel: "=", 
            onSelect: "&", 
            items: "=", 
            text: "@", 
            value: "@" ,
            class: "@"          
        },
        template: function (el, atts) {
            return ` 
                <div class='ui floating search labeled dropdown icon button {{ class }}'>
                    <i class="dropdown icon"></i>               
                    <span class="text">Selecione</span>
                    <div class="menu">
                        <div ng-repeat="p in items" 
                            class="item" ng-click='go(p)'>{{ p.nome }}</div>
                    </div>
                </div>
            `
        },
        link: function ($scope, el, atts, ngModel) {

            $(el).dropdown()

            $scope.getValue = function(item) {
                return item[$scope.value]
            }
            $scope.getText = function(item) {
                return item[$scope.text]
            }
            $scope.go = function(item) {                
                $timeout(() => {
                    $scope.$apply(() => {
                        ngModel.$setViewValue(item)
                        $scope.onSelect({ item: item })
                    })
                })
            }

            ngModel.$render = function () {                
                $timeout(() => $(el).dropdown())                
            }
        }
    }
}])