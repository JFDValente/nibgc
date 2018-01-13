module.exports = function(app){
	let ministerioDAO = app.dao.ministerio

	app.get("/ministerios",(req, res) =>{
		
		ministerioDAO.get().then(
			ministerios => {
				res.json(ministerios)
			},
			err =>{
				res.status(500).send(err)
			}
		)

	})
}