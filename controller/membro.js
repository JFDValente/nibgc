module.exports = function(app) {

	let membroDAO = app.dao.membro

	app.get("/api/membros", function(request, response){
		membroDAO.get()
		.then(
			res => {
				response.send(res)
			},
			err => {
				console.error("get /api/membros\n")
				console.error(err)
				response.status(500).send({ erro: err })
			}
		)
	})

	app.post("/api/membros", function(request, response){

		let body = request.body

		membroDAO.create(body)
		.then(
			res => {
				body.id = res.insertId
				//app.get("socket").emit("create membro", body)

				response.send({
					success:true,
					message: "cadastro realizado com sucesso"
				})
			},
			err => {
				console.error("post /api/membros\n")
				console.error(err)
				response.send({ message: "Ocorreu um erro" })
			}
		)
	})

	app.put("/api/membros", function(request, response){

		let body = request.body
		let id = request.body.id

		membroDAO.update(body, id)
		.then(
			res => {
				//app.get("socket").emit("update membro", body)

				response.send({
					success:true,
					message: "dados atualizados com sucesso"
				})
			},
			err => {
				console.error("put /api/membros\n")
				console.error(err)
				response.send({ message: "Ocorreu um erro" })
			}
		)
	})

	app.delete("/api/membros", function(request, response){

		let id = request.body.id

		membroDAO.delete(id)
		.then(
			res => {
				//app.get("socket").broadcast.emit("delete membro", id)

				response.send({
					success:true,
					message: "cadastro excluído com sucesso"
				})
			},
			err => {
				console.error("delete /api/membros\n")
				console.error(err)
				response.status(500).send({ message: "Ocorreu um erro" })
			}
		)
	})
}