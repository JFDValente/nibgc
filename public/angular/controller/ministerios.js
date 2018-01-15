app.controller("ministerios", function($scope, Ministerios, Dialog){

	$scope.ministerios = []
	$scope.pesquisa = ""
	$scope.message = ""
	$scope.loading = true

	$scope.onDelete = function(item, $index) {
		Dialog.confirm("Excluir o ministerio?", () => {
			Ministerios.delete(item).then(
				res => Ministerios.remove($index),
				err => Dialog.error()
			)
		})
	}

	Ministerios.get().then(
		data => render(data),
		err => {
			console.log(err)
			Dialog.error()
		}
	)

	function render(data) {

		$scope.ministerios = data

		if(!data.length) {
			$scope.message = "Nenhum resultado encontrado :("
		}

		$scope.loading = false
		$scope.$apply()
	}
})

app.controller("ministeriosForm", function($scope, Ministerios, Dialog, $routeParams){

	$scope.lider = {}
	$scope.ministerio = {}

	if($routeParams.id) {
		$scope.ministerio = Ministerios.find(parseInt($routeParams.id)) || {}
		$scope.lider = { id: $scope.ministerio.idLider, nome: $scope.ministerio.nomeLider }
	}

	$scope.onChange = function(item) {
		$scope.lider = item
	}

	$scope.onSubmit = function($event) {
		$event.preventDefault()
		if(!$scope.form.$valid) {
			$scope.message = "Preencha os campos corretamente"
		}
		else {
			$scope.ministerio.idLider = $scope.lider.id

			Ministerios.create($scope.ministerio).then(
				res => {
					Dialog.success("Cadastro concluído")
					$scope.ministerio = {}
				}
			)
		}
	}
})
