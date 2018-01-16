app.controller("ministeriosFeira", function(
	$scope, Membros, Ministerios, Dialog, $routeParams){

	const STATUS_INSCRITO = 3 //definição no banco de dados
	$scope.search = ""
	$scope.membros = []
	$scope.loading = true
	Ministerios.find($routeParams.id).then(
		res => {
			$scope.ministerio = res
			$scope.loading = false
			$scope.$apply()
		}
	)

	$scope.onSubmit = function() {

		$scope.message = ""
		$scope.loading = true

		Membros.searchMinisterio("nome", $scope.search, $scope.ministerio.id).then(
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

	$scope.matricula = function(membro, $event) {
		$($event.target).addClass("loading disabled")
		Ministerios.matricula(membro.id, $scope.ministerio.id).then(
			res => {
				membro.status = STATUS_INSCRITO
				$scope.$apply()
				$($event.target).removeClass("loading disabled")
			},
			err => {
				Dialog.error("Não foi posível concluir a inscrição. Informe o  suporte!")
				$($event.target).removeClass("loading disabled")
			}
		)
	}

	$scope.cancelaMatricula = function(membro, $event) {
		$($event.target).addClass("loading disabled")
		Ministerios.cancelaMatricula(membro.id, $scope.ministerio.id).then(
			res => {
				membro.status = null
				$scope.$apply()
				$($event.target).removeClass("loading disabled")
			},
			err => {
				Dialog.error("Não foi posível cancelar a inscrição")
				$($event.target).removeClass("loading disabled")
			}
		)
	}

	$scope.alteraPrioridade = function(matricula, $event, prioridade) {
		$($event.target).addClass("loading disabled")
		matricula.prioridade = prioridade

		let data = {
			idMembro: matricula.idMembro,
			idMinisterio: $scope.ministerio.id,
			ano: new Date().getFullYear(),
			prioridade: prioridade
		}

		Ministerios.atualizaPrioridade(data).then(
			res => {
				matricula.prioridade = prioridade
				$scope.$apply()
				$($event.target).removeClass("loading disabled")
			},
			err => {
				Dialog.error("Não foi possível atualizar a prioridade")
			}
		)
	}
})
