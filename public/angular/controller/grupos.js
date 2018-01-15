app.controller("grupos", function($scope, Grupos, Dialog){

	$scope.grupos = []
	$scope.pesquisa = ""
	$scope.message = ""
	$scope.loading = true

	$scope.onDelete = function(item, $index) {
		Dialog.confirm("Excluir o grupo?", () => {
			Grupos.delete(item).then(
				res => Grupos.remove($index),
				err => Dialog.error()
			)
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

app.controller("gruposForm", function($scope, Grupos, Dialog, $routeParams){

	$scope.lider = {}
	$scope.grupo = {}

	if($routeParams.id) {
		$scope.grupo = Grupos.find(parseInt($routeParams.id)) || {}
		$scope.lider = { id: $scope.grupo.idLider, nome: $scope.grupo.nomeLider }
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
			$scope.grupo.idLider = $scope.lider.id

			Grupos.create($scope.grupo).then(
				res => {
					Dialog.success("Cadastro concluído")
					$scope.grupo = {}
				}
			)
		}
	}
})
