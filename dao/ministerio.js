const TABELA_MINISTERIO = app.config.database.tabelas.TABELA_MINISTERIO
const TABELA_MEMBRO = app.config.database.tabelas.TABELA_MEMBRO
const TABELA_ATUAEM = app.config.database.tabelas.TABELA_ATUAEM

module.exports = function(app){

	let db = app.config.database.db()

	return {

		create: function(data) {
			return new Promise((resolve, reject) =>{
				db.insert(TABELA_MINISTERIO, data, function(err, res){
					if(err) reject(err)
					else resolve(res)
				})
			})
		},

		update: function(data, id) {
			return new Promise((resolve, reject) =>{
				db.update(TABELA_MINISTERIO, data, { id: id }, function(err, res){
					if(err) reject(err)
					else resolve(res)
				})
			})
		},

		delete: function(id) {
			return new Promise((resolve, reject) =>{
				db.delete(TABELA_MINISTERIO, { id: id }, function(err, res) {
					if(err) reject(err)
					else resolve(res)
				})
			})
		},

		get: function() {
			return new Promise((resolve, reject) => {
				db.from(TABELA_MINISTERIO).get(function(err, res){
					if(err) reject(err)
					else resolve(res)
				})
			})
		},

		find: function(id) {
			return new Promise((resolve, reject) => {
				db.where({ 'id =': id})
				.get(TABELA_MINISTERIO, function(err, res){
					if(err) reject(err)
					else resolve(res[0])
				})
			})
		}

		findMembros: function(id) {
			return new Promise((resolve, reject) => {
				db.where({ 'idMinisterio =': id})
				.get(TABELA_MEMBRO, function(err, res){
					if(err) reject(err)
					else resolve(res[0])
				})
			})
		}
	}
}
