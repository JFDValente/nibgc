app.service("Ministerios", function($http, listener){

	let ministerios = []

	socket.on("create ministerio", function(data) {
		ministerios.unshift(data)
		listener.update()
	})

	socket.on("update ministerio", function(data) {
		for(let i = 0; i < ministerios.length; i++) {
			if(ministerios[i].id == data.id) {

				for(let key of Object.keys(ministerios[i])) {
					if(data[key]) {
						ministerios[i][key] = data[key]
					}
				}

				listener.update()
				break
			}
		}
	})

	socket.on("delete ministerio", function(id) {console.log('id', id)
		for(let i = 0; i < ministerios.length; i++) {
			if(ministerios[i].id == id) {
				ministerios.splice(i, 1)
				listener.update()
				break
			}
		}
	})

	return {

		find: (id) => {
			for(let i = 0; i < ministerios.length; i++) {
				if(id == ministerios[i].id) {
					return ministerios[i]
				}
			}
		},

		get: () => {
			return new Promise((resolve, reject) => {
				if(ministerios.length) {
					resolve(ministerios)
				}
				else {
					$http({
						method: "GET",
						url: `/api/ministerios`
					})
					.then(
						res => {
							ministerios = []
							res.data.forEach(item => ministerios.push(item))
							resolve(ministerios)
						},
						err => reject(err)
					)
				}
			})
		},

		create: data => {
			return new Promise((resolve, reject) => {
				$http({
					method: "POST",
					url: "/api/ministerios",
					data: data
				})
				.then(
					res => resolve(res),
					err => reject(err)
				)
			})
		},

		update: data => {
			return new Promise((resolve, reject) => {
				$http({
					method: "PUT",
					url: "/api/ministerios",
					data: data
				})
				.then(
					res => resolve(res),
					err => reject(err)
				)
			})
		},

		delete: (item) => {
			return new Promise((resolve, reject) => {
				$http({
					method: "DELETE",
					url: "/api/ministerios",
					data: { id: item.id },
				    headers: {
				        'Content-type': 'application/json;charset=utf-8'
				    }
				})
				.then(
					res => resolve(res),
					err => reject(err)
				)
			})
		},

		remove: (index) => {
			ministerios.splice(index, 1)
			listener.update()
		},

		search: (attr, expression) => {
			return new Promise((resolve, reject) => {
				$http({
					method: "GET",
					url: "/api/ministerios/search/query",
					params: { attr: attr, expression: expression }
				})
				.then(
					res => {
						ministerios = []
						res.data.forEach(item => ministerios.push(item))
						resolve(res.data)
					},
					err => reject(err)
				)
			})
		}
	}
})
