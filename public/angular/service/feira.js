app.service("Feira", function($http){

	return {
		pesquisaTodos: (idMinisterio) => {
			return new Promise((resolve, reject) => {
				$http({
					url: "/api/ministerios/membros/query",
					method: "GET",
					params: {
						idMinisterio: idMinisterio
					}
				})
				.then(
					res => resolve(res.data),
					err => reject(err)
				)
			})
		},

		pesquisaNaoDefinidos: () => {
			return new Promise((resolve, reject) => {
				$http({
					url: "/api/membros/search/ministerio/naodefinido/query",
					method: "GET"
				})
				.then(
					res => resolve(res.data),
					err => reject(err)
				)
			})
		},

		pesquisaNaoInscritos: () => {
			return new Promise((resolve, reject) => {
				$http({
					url: "/api/membros/search/ministerio/naoinscrito/query",
					method: "GET"
				})
				.then(
					res => resolve(res.data),
					err => reject(err)
				)
			})
		}
	}
})
