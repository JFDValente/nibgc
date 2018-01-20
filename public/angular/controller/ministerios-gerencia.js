app.controller("ministeriosGerencia", function(
	$scope, Membros, Ministerios, Feira, Dialog, $routeParams){

	$scope.search = ""
	$scope.loading = true

	$scope.tipos = [
		{ nome: "Todos", valor: 0 },
		{ nome: "Somente Não Confirmados", valor: 1 },
		{ nome: "Somente Confirmados", valor: 2 },
		{ nome: "Não Confirmados em nada", valor: 3 },
		{ nome: "Não se inscreveu em nada", valor: 4 }
	]

	$scope.pesquisa = {
		nome: "",
		tipo: 0,
		prioridade: false
	}

	function render(data) {
		$scope.membros = data
		$scope.loading = false
		$scope.$apply()
	}

	function getMinisterio() {
		Ministerios.find($routeParams.id).then(
			res => {
				$scope.ministerio = res
				getMembros()
			}
		)
	}

	function getMembros() {
		$scope.loading = true
		if($scope.pesquisa.tipo == 0) {
			Feira.pesquisaTodos($scope.ministerio.id)
			.then(
				res => render(res),
				err => Dialog.error()
			)
		}
		else if($scope.pesquisa.tipo == 3) {
			Feira.pesquisaNaoDefinidos()
			.then(
				res => render(res),
				err => Dialog.error()
			)
		}
		else if($scope.pesquisa.tipo == 4) {
			Feira.pesquisaNaoInscritos()
			.then(
				res => render(res),
				err => Dialog.error()
			)
		}
	}

	$scope.onSubmit = function() {
		if($scope.pesquisa.tipo != 1 && $scope.pesquisa.tipo != 2) {
			$scope.membros = []
			$scope.message = ""
			$scope.loading = true
			getMembros()
		}
	}

	$scope.atualiza = function($event, matricula) {
		$($event.target).addClass("loading disabled")

		let data = {
			idMembro: matricula.idMembro,
			idMinisterio: $scope.ministerio.id,
			ano: new Date().getFullYear(),
			status: !matricula.status
		}

		Ministerios.atualizaPrioridade(data).then(
			res => {
				matricula.status = !matricula.status
				$scope.$apply()
				$($event.target).removeClass("loading disabled")
			},
			err => {
				Dialog.error("Não foi possível atualizar a matrícula. Informe o  suporte!")
				$($event.target).removeClass("loading disabled")
			}
		)
	}

	getMinisterio()
})
