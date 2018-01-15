app.controller("ministeriosFeira", function($scope, Membros){

	$scope.search = ""
	$scope.membros = []

	$scope.onSubmit = function() {
		Membros.search("nome", $scope.search)
	}
})
