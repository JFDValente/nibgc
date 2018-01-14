//const TABELA_MEMBRO = "Membro"
const TABELA_MEMBRO = app.config.database.tabelas.TABELA_MEMBRO

module.exports = function(app){

	let db = app.config.database.db()

	return {

		create: function(data) {
			return new Promise((resolve, reject) =>{
				db.insert(TABELA_MEMBRO, data, function(err, res){
					if(err) reject(err)
					else resolve(res)
				})
			})
		},

		update: function(data, id) {
			return new Promise((resolve, reject) =>{
				db.update(TABELA_MEMBRO, data, { id: id }, function(err, res){
					if(err) reject(err)
					else resolve(res)
				})
			})
		},

		delete: function(id) {
			return new Promise((resolve, reject) =>{
				db.delete(TABELA_MEMBRO, { id: id }, function(err, res) {
					if(err) reject(err)
					else resolve(res)
				})
			})
		},

		get: function() {
			return new Promise((resolve, reject) => {
				db.from(TABELA_MEMBRO).limit(10).get(function(err, res){
					if(err) reject(err)
					else resolve(res)
				})
			})
		},
		
		search: function(attr,expression) {
			return new Promise((resolve, reject) => {
				db.like(attr,expression).from(TABELA_MEMBRO).get(function(err, res){
					if(err) reject(err)
					else resolve(res)
				})
			})
		},

		find: function(id) {
			return new Promise((resolve, reject) => {
				db.where({ 'id =': id})
				.get(TABELA_MEMBRO, function(err, res){
					if(err) reject(err)
					else resolve(res[0])
				})
			})
		}
	}
}
