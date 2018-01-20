app.service("Feira", function($http){

	return {
		pesquisaPorStatus: (idMinisterio, prioridade) => {
			return new Promise((resolve, reject) => {
				$http({
					url: "/api/ministerios/membros/query",
					method: "GET",
					params: {
						idMinisterio: idMinisterio,
						prioridade: prioridade
					}
				})
				.then(
					res => resolve(res.data),
					err => reject(err)
				)
			})
		}
	}
})
