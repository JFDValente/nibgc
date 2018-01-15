app.controller("grupos", function($scope, Grupos, Dialog){

	$scope.grupos = []
	$scope.pesquisa = ""
	$scope.message = ""
	$scope.loading = true

	$scope.onDelete = function(item, $index) {
		Dialog.confirm("Excluir o grupo?", () => {
			Grupos.delete(item, function(){
				Grupos.remove($index)
			})
		})
	}

	Grupos.get().then(
		data => render(data),
		err => {
			console.log(err)
			Dialog.error()
		}
	)

	function render(data) {

		$scope.grupos = data

		if(!data.length) {
			$scope.message = "Nenhum resultado encontrado :("
		}

		$scope.loading = false
		$scope.$apply()
	}
})
