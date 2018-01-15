app.service("Membros", function($http){

	let membros = []

	socket.on("create membro", function(data) {
		membros.unshift(data)
		listener.update()
	})

	socket.on("update membro", function(data) {
		for(let i = 0; i < membros.length; i++) {
			if(membros[i].id == data.id) {

				for(let key of Object.keys(membros[i])) {
					if(data[key]) {
						membros[i][key] = data[key]
					}
				}

				listener.update()
				break
			}
		}
	})

	socket.on("delete membro", function(id) {
		for(let i = 0; i < membros.length; i++) {
			if(membros[i].id == id) {
				membros.splice(i, 1)
				listener.update()
				break
			}
		}
	})

	return {

		get: () => {
			return new Promise((resolve, reject) => {
				if(membros.length) {
					resolve(membros)
				}
				else {
					$http({
						method: "GET",
						url: `/api/membros`
					})
					.then(
						res => {
							membros = []
							res.data.forEach(item => membros.push(item))
							resolve(membros)
						},
						err => reject(err)
					)
				}
			})
		},

		delete: (item, callback) => {
			$http({
				method: "DELETE",
				url: "/api/membros",
				data: { id: item.id },
			    headers: {
			        'Content-type': 'application/json;charset=utf-8'
			    }
			})
			.then(
				response => {
					if(callback) callback()
				},
				err => {
					console.error(err)
				}
			)
		},

		remove: (index) => {
			membros.splice(index, 1)
			listener.update()
		},

		search: (attr, expression) => {
			return new Promise((resolve, reject) => {
				$http({
					method: "GET",
					url: "/api/membros/search/query",
					params: { attr: attr, expression: expression }
				})
				.then(
					res => {
						membros = []
						res.data.rows.forEach(item => membros.push(item))
						resolve(membros)
					},
					err => reject(err)
				)
			})
		}
	}
})
