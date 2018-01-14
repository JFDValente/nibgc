app.controller("membros", function($scope, Membros, Dialog){

	$scope.membros = []
	$scope.pesquisa = ""
	$scope.message = ""
	$scope.loading = true

	$scope.onSearch = function(value) {
		if(value.length) {
			Membros.search("nome", value).then(
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
