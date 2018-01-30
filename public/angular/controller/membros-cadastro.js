app.controller("membrosForm", function($scope, Membros, Dialog, $routeParams){

	$scope.loading = false
	$scope.membro = {}
	$scope.lider = {}

	if($routeParams.id) {
		Membros.find($routeParams.id).then(
			res => {
				$scope.membro = res

				if($scope.membro.idGrupo) {
					$scope.lider = {
						id: $scope.membro.idLider,
						nome: $scope.membro.nomeLider
					}
				}

				$scope.$apply()
			},
			err => Dialog.error()
		)
	}

	$scope.onChange = function(item) {
		$scope.lider = item
	}

	$scope.onSubmit = function($event) {
		$event.preventDefault()

		$scope.loading = true

		let data = {
			nome: $scope.membro.nome,
			contato: $scope.membro.contato,
			idGrupo: $scope.lider.id
		}

		if($routeParams.id) {
			Membros.update(data).then(
				res => {
					Dialog.success("Dados atualizados")
					$scope.loading = false
				},
				err => Dialog.error()
			)
		}
		else {console.log(data);
			Membros.create(data).then(
				res => {
					$scope.membro = {}
					$scope.lider = {}
					$scope.loading = false
					$scope.$apply()
					Dialog.success("Cadastro concluído")
				},
				err => Dialog.error()
			)
		}
	}
})
