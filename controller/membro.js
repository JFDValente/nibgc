module.exports = function(app) {

	let membroDAO = app.dao.membro

	app.get("/api/membros", function(request, response){
		membroDAO.get()
		.then(
			res => {
				response.send(res)
			},
			err => {console.log('err', err)
				console.error("get /api/membros\n")
				console.error(err)
				response.status(500).send({ erro: err })
			}
		)
	})

	app.get("/api/membros/:id", function(request, response){

		let id = request.params.id

		membroDAO.find(id)
		.then(
			res => {
				response.send(res)
			},
			err => {
				console.error("get /api/membros/:id\n")
				console.error(err)
				response.status(500).send({ erro: err })
			}
		)
	})

	//retonar os membros de acordo com um parâmetro qualquer, definido pelo frontend
	app.get("/api/membros/search/query", function(request, response){

		let attr = request.query.attr
		let expression = request.query.expression

		membroDAO.search(attr,expression)
		.then(
			res => {
				response.send({rows:res})
			},
			err => {
				console.error("get /api/membros/search/query\n")
				console.error(err)
				response.status(500).send({ erro: err })
			}
		)
	})

	//retonar os membros de acordo com um parâmetro qualquer, definido pelo frontend, e com o status de inscrição no ministerio
	app.get("/api/membros/search/ministerio/query", function(request, response){

		let attr = request.query.attr
		let expression = request.query.expression
		let idMinisterio = request.query.idMinisterio
		let ano = request.query.ano || new Date().getFullYear()

		membroDAO.searchMatricula(attr,expression,idMinisterio,ano)
		.then(
			res => {
				response.send({rows:res})
			},
			err => {
				console.error("get /api/membros/search/ministerio/query\n")
				console.error(err)
				response.status(500).send({ erro: err })
			}
		)
	})

	//retonar os membros que se inscreveram na feira, mas não foram selecionados para nenhum ministerio
	app.get("/api/membros/search/ministerio/naodefinido/query", function(request, response){

		let ano = request.query.ano || new Date().getFullYear()

		membroDAO.getMembrosInscritosSemMinisterio(ano)
		.then(
			res => response.send(res),
			err => {
				console.error("get /api/membros/search/ministerio/query\n")
				console.error(err)
				response.status(500).send({ erro: err })
			}
		)
	})

	//retonar os membros que se inscreveram na feira, mas não foram selecionados para nenhum ministerio
	app.get("/api/membros/search/ministerio/naoinscrito/query", function(request, response){

		let ano = request.query.ano || new Date().getFullYear()

		membroDAO.getMembrosNaoInscritos(ano)
		.then(
			res => response.send(res),
			err => {
				console.error("get /api/membros/search/ministerio/query\n")
				console.error(err)
				response.status(500).send({ erro: err })
			}
		)
	})

	app.post("/api/membros", function(request, response){

		let body = request.body

		//console.log(body)
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
				response.status(500).send({ message: "Ocorreu um erro" })
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
				response.status(500).send({ message: "Ocorreu um erro" })
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
