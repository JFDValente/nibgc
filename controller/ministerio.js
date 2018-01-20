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

	//retonar os ministerios de acordo com um parâmetro qualquer, definido pelo frontend
	app.get("/api/ministerios/search/query", function(request, response){

		let attr = request.query.attr
		let expression = request.query.expression

		ministerioDAO.search(attr,expression)
		.then(
			res => {
				response.json(res)
			},
			err => {
				console.error("get /api/ministerios/search/query\n")
				console.error(err)
				response.status(500).send({ erro: err })
			}
		)
	})

	//retornar todos os membros de um determinado ministério, cujo id é passado como parâmetro
	app.get("/api/ministerios/membros/query", function(request, response){

		let idMinisterio = request.query.idMinisterio
		let ano = request.query.ano || new Date().getFullYear()
		let prioridade = request.query.prioridade
		let status = request.query.status

		ministerioDAO.getMembros(idMinisterio,ano,prioridade,status)
		.then(
			res => {
				response.send(res)
			},
			err => {
				console.error("get /api/ministerios/membros/query\n")
				console.error(err)
				response.status(500).send({ erro: err })
			}
		)
	})

	//retornar todos os membros de um determinado ministério, cujo id é passado como parâmetro
	app.get("/api/ministerios/membros/query", function(request, response){

		let id = request.query.id
		let ano = request.query.ano || new Date().getFullYear()
		let status = request.query.status
		let prioridade = request.query.prioridade

		ministerioDAO.getMembros(id,ano,prioridade,status)
		.then(
			res => {
				response.send(res)
			},
			err => {
				console.error("get /api/ministerios/membros/query\n")
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
				response.status(500).send({ message: "Ocorreu um erro" })
			}
		)
	})

	//matricular membro recebendo um JSON com idMembro e idMinisterio
	app.post("/api/ministerios/matricula", function(request, response){

		let body = request.body
		let hoje = new Date()

		body.status = false
		body.ano = hoje.getFullYear()

		console.log(body) //teste

		ministerioDAO.matricula(body)
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
				console.error("post /api/ministerios/matricula\n")
				console.error(err)
				response.status(500).send({ message: "Ocorreu um erro" })
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
				response.status(500).send({ message: "Ocorreu um erro" })
			}
		)
	}),

	app.put("/api/ministerios/matricula", function(request, response){

		let body = request.body

		ministerioDAO.updateMatricula(body)
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
				response.status(500).send({ message: "Ocorreu um erro" })
			}
		)
	}),

	app.put("/api/ministerios/matricula/prioridade", function(request, response){

		let body = request.body

		function erro(){
			console.error("put /api/ministerios\n")
			console.error(err)
			response.status(500).send({ message: "Ocorreu um erro" })

		}

		function atualiza(){
			ministerioDAO.updateMatricula(body)
			.then(
				res => {
					response.send({
						success:true,
						message: "dados atualizados com sucesso"
					})
				},
				err => erro()
			)
		}


		if (body.prioridade) {
			ministerioDAO.eliminaPrioridade(body).then(
				res => atualiza(),
				err => erro()
			)
		}
		else atualiza()
	}),

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
	}),

	app.delete("/api/ministerios/matricula", function(request, response){

		let idMinisterio = request.body.idMinisterio
		let idMembro = request.body.idMembro
		let ano = request.body.ano || new Date().getFullYear()
		
		ministerioDAO.deleteMatricula(idMinisterio,idMembro,ano)
		.then(
			res => {
				//app.get("socket").broadcast.emit("delete ministerio", id)

				response.send({
					success:true,
					message: "cadastro excluído com sucesso"
				})
			},
			err => {
				console.error("delete /api/ministerios/matricula\n")
				console.error(err)
				response.status(500).send({ message: "Ocorreu um erro" })
			}
		)
	})
}
