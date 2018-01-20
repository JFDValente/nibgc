app.controller("ministeriosGerencia", function(
	$scope, Membros, Ministerios, Feira, Dialog, $routeParams){

	$scope.search = ""
	$scope.loading = true

	$scope.tipos = [
		{ nome: "Todos", valor: 0 },
		{ nome: "Somente inscritos", valor: 1 },
		{ nome: "Somente inscritos com prioridade", valor: 2 },
		{ nome: "Somente definidos", valor: 3 },
		{ nome: "Não definidos em nada", valor: 4 },
		{ nome: "Não se inscreveu em nada", valor: 5 }
	]

	$scope.pesquisa = {
		nome: "",
		tipo: 0,
		prioridade: false
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
		if($scope.pesquisa.tipo == 0) {
			Feira.pesquisaPorStatus($scope.ministerio.id, $scope.pesquisa.prioridade)
			.then(
				res => {console.log(res);
					$scope.membros = res
					$scope.loading = false
					$scope.$apply()
				},
				err => Dialog.error()
			)
		}
	}

	$scope.onSubmit = function($event) {
		$event.preventDefault()
		$scope.membros = []
		$scope.message = ""
		$scope.loading = true
		getMembros()
	}

	$scope.matricula = function(membro, $event) {
		$($event.target).addClass("loading disabled")
		Ministerios.matricula(membro.idMembro, $scope.ministerio.id).then(
			res => {
				membro.status = STATUS_INSCRITO
				$scope.$apply()
				$($event.target).removeClass("loading disabled")
			},
			err => {
				Dialog.error("Não foi possível concluir a inscrição. Informe o  suporte!")
				$($event.target).removeClass("loading disabled")
			}
		)
	}

	getMinisterio()
})
