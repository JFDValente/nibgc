module.exports = function(app){
	const db = app.config.database.db()

	return{
		get: () =>{
			return new Promise((resolve,reject) =>{
				db.get("ministerio",(err,response) =>{
					if(err) reject(err)
					else resolve(response)
				})
			})
		}
	}
}