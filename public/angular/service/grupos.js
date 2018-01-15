app.service("Grupos", function($http){

	let grupos = []

	socket.on("create grupo", function(data) {
		grupos.unshift(data)
		listener.update()
	})

	socket.on("update grupo", function(data) {
		for(let i = 0; i < grupos.length; i++) {
			if(grupos[i].id == data.id) {

				for(let key of Object.keys(grupos[i])) {
					if(data[key]) {
						grupos[i][key] = data[key]
					}
				}

				listener.update()
				break
			}
		}
	})

	socket.on("delete grupo", function(id) {
		for(let i = 0; i < grupos.length; i++) {
			if(grupos[i].id == id) {
				grupos.splice(i, 1)
				listener.update()
				break
			}
		}
	})

	return {

		get: () => {
			return new Promise((resolve, reject) => {
				if(grupos.length) {
					resolve(grupos)
				}
				else {
					$http({
						method: "GET",
						url: `/api/grupos`
					})
					.then(
						res => {
							grupos = []
							res.data.forEach(item => grupos.push(item))
							resolve(grupos)
						},
						err => reject(err)
					)
				}
			})
		},

		delete: (item, callback) => {
			$http({
				method: "DELETE",
				url: "/api/grupos",
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
			grupos.splice(index, 1)
			listener.update()
		},

		search: (attr, expression) => {
			return new Promise((resolve, reject) => {
				$http({
					method: "GET",
					url: "/api/grupos/search/query",
					params: { attr: attr, expression: expression }
				})
				.then(
					res => {
						grupos = []
						res.data.forEach(item => grupos.push(item))
						resolve(res.data)
					},
					err => reject(err)
				)
			})
		}
	}
})
