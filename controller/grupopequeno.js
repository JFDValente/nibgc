module.exports = function(app) {

	let grupopequenoDAO = app.dao.grupopequeno

	app.get("/api/grupospequenos", function(request, response){
		grupopequenoDAO.get()
		.then(
			res => {
				response.send(res)
			},
			err => {
				console.error("get /api/grupospequenos\n")
				console.error(err)
				response.status(500).send({ erro: err })
			}
		)
	})

	app.get("/api/grupopequeno/:id", function(request, response){

		let id = request.params.id

		grupopequenoDAO.find(id)
		.then(
			res => {
				response.send(res)
			},
			err => {
				console.error("get /api/grupopequeno/:id\n")
				console.error(err)
				response.status(500).send({ erro: err })
			}
		)
	})

	app.post("/api/grupopequeno", function(request, response){

		let body = request.body

		grupopequenoDAO.create(body)
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
				console.error("post /api/grupopequeno\n")
				console.error(err)
				response.send({ message: "Ocorreu um erro" })
			}
		)
	})

	app.put("/api/grupospequeno", function(request, response){

		let body = request.body
		let id = request.body.id

		grupopequenoDAO.update(body, id)
		.then(
			res => {
				//app.get("socket").emit("update grupospequeno", body)

				response.send({
					success:true,
					message: "dados atualizados com sucesso"
				})
			},
			err => {
				console.error("put /api/grupopequeno\n")
				console.error(err)
				response.send({ message: "Ocorreu um erro" })
			}
		)
	})

	app.delete("/api/grupopequeno", function(request, response){

		let id = request.body.id

		grupopequenoDAO.delete(id)
		.then(
			res => {
				//app.get("socket").broadcast.emit("delete grupospequeno", id)

				response.send({
					success:true,
					message: "cadastro excluído com sucesso"
				})
			},
			err => {
				console.error("delete /api/grupopequeno\n")
				console.error(err)
				response.status(500).send({ message: "Ocorreu um erro" })
			}
		)
	})
}
