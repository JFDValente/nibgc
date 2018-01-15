app.controller("ministeriosFeira", function($scope, Membros){

	$scope.search = ""
	$scope.membros = []
	$scope.loading = false

	$scope.onSubmit = function() {

		$scope.message = ""
		$scope.loading = true

		Membros.search("nome", $scope.search).then(
			data => {
				if(!data.length) {
					$scope.message = "Nenhum resultado encontrado :("
				}
				else {
					$scope.membros = data
				}

				$scope.loading = false
				$scope.$apply()
			}
		)
	}
})
