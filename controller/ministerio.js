module.exports = function(app) {

	let ministerioDAO = app.dao.ministerio

	app.get("/api/ministerios", function(request, response){
		ministerioDAO.get()
		.then(
			res => {
				response.send(res)
			},
			err => {
				console.error("get /api/ministerios\n")
				console.error(err)
				response.status(500).send({ erro: err })
			}
		)
	})

	app.get("/api/ministerios/:id", function(request, response){

		let id = request.params.id

		ministerioDAO.find(id)
		.then(
			res => {
				response.send(res)
			},
			err => {
				console.error("get /api/ministerios/:id\n")
				console.error(err)
				response.status(500).send({ erro: err })
			}
		)
	})

	app.post("/api/ministerios", function(request, response){

		let body = request.body

		ministerioDAO.create(body)
		.then(
			res => {
				body.id = res.insertId
				//app.get("socket").emit("create ministerio", body)

				response.send({
					success:true,
					message: "cadastro realizado com sucesso"
				})
			},
			err => {
				console.error("post /api/ministerios\n")
				console.error(err)
				response.send({ message: "Ocorreu um erro" })
			}
		)
	})

	app.put("/api/ministerios", function(request, response){

		let body = request.body
		let id = request.body.id

		ministerioDAO.update(body, id)
		.then(
			res => {
				//app.get("socket").emit("update ministerio", body)

				response.send({
					success:true,
					message: "dados atualizados com sucesso"
				})
			},
			err => {
				console.error("put /api/ministerios\n")
				console.error(err)
				response.send({ message: "Ocorreu um erro" })
			}
		)
	})

	app.delete("/api/ministerios", function(request, response){

		let id = request.body.id

		ministerioDAO.delete(id)
		.then(
			res => {
				//app.get("socket").broadcast.emit("delete ministerio", id)

				response.send({
					success:true,
					message: "cadastro excluído com sucesso"
				})
			},
			err => {
				console.error("delete /api/ministerios\n")
				console.error(err)
				response.status(500).send({ message: "Ocorreu um erro" })
			}
		)
	})
}
