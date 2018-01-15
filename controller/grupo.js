module.exports = function(app) {

	let grupoDAO = app.dao.grupo

	app.get("/api/grupos", function(request, response){
		grupoDAO.get()
		.then(
			res => {
				response.send(res)
			},
			err => {
				console.error("get /api/grupos\n")
				console.error(err)
				response.status(500).send({ erro: err })
			}
		)
	})

	app.get("/api/grupos/:id", function(request, response){

		let id = request.params.id

		grupoDAO.find(id)
		.then(
			res => {
				response.send(res)
			},
			err => {
				console.error("get /api/grupos/:id\n")
				console.error(err)
				response.status(500).send({ erro: err })
			}
		)
	})

	//retonar os grupos de acordo com um parâmetro qualquer, definido pelo frontend
	app.get("/api/grupos/search/query", function(request, response){

		let attr = request.query.attr
		let expression = request.query.expression

		grupoDAO.search(attr,expression)
		.then(
			res => {
				response.json(res)
			},
			err => {
				console.error("get /api/grupos/search/query\n")
				console.error(err)
				response.status(500).send({ erro: err })
			}
		)
	})

	//retornar todos os membros de um determinado ministério, cujo id é passado como parâmetro
	app.get("/api/grupos/:id/membros", function(request, response){

		let id = request.params.id

		grupoDAO.findMembros(id)
		.then(
			res => {
				response.send(res)
			},
			err => {
				console.error("get /api/grupo/:id/membros\n")
				console.error(err)
				response.status(500).send({ erro: err })
			}
		)
	})

	app.post("/api/grupos", function(request, response){

		let body = request.body

		grupoDAO.create(body)
		.then(
			res => {
				body.id = res.insertId
				//app.get("socket").emit("create grupospequeno", body)

				response.send({
					success:true,
					message: "cadastro realizado com sucesso"
				})
			},
			err => {
				console.error("post /api/grupos\n")
				console.error(err)
				response.send({ message: "Ocorreu um erro" })
			}
		)
	})

	app.put("/api/grupos", function(request, response){

		let body = request.body
		let id = request.body.id

		grupoDAO.update(body, id)
		.then(
			res => {
				//app.get("socket").emit("update grupospequeno", body)

				response.send({
					success:true,
					message: "dados atualizados com sucesso"
				})
			},
			err => {
				console.error("put /api/grupos\n")
				console.error(err)
				response.send({ message: "Ocorreu um erro" })
			}
		)
	})

	app.delete("/api/grupos", function(request, response){

		let id = request.body.id

		grupoDAO.delete(id)
		.then(
			res => {
				//app.get("socket").broadcast.emit("delete grupospequeno", id)
				response.send({
					success:true,
					message: "cadastro excluído com sucesso"
				})
			},
			err => {
				console.error("delete /api/grupos\n")
				console.error(err)
				response.status(500).send({ message: "Ocorreu um erro" })
			}
		)
	})
}
