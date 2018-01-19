app.controller("membros", function($scope, Membros, Dialog){

	$scope.membros = []
	$scope.message = ""
	$scope.loading = false

	$scope.onSubmit = function() {
		if($scope.search) {
			$scope.loading = true
			Membros.search("nome", $scope.search).then(
				data => render(data),
				err => {
					console.log(err)
					Dialog.error()
				}
			)
		}
	}

	$scope.onDelete = function(item, $index) {
		Dialog.confirm("Excluir o cadastro do membro", () => {
			Membros.delete(item, function(){
				Membro.remove($index)
			})
		})
	}

	Membros.get().then(
		data => render(data),
		err => {
			console.log(err)
			Dialog.error()
		}
	)

	function render(data) {

		$scope.membros = data

		if(!data.length) {
			$scope.message = "Nenhum resultado encontrado :("
		}

		$scope.loading = false
		$scope.$apply()
	}
})
