module.exports = function(app){

	const TABELA_GRUPO = app.config.database.tabelas.TABELA_GRUPO
	const TABELA_MEMBRO = app.config.database.tabelas.TABELA_MEMBRO
	let connection = app.config.database.db()

	return {

		create: function(data) {
			return new Promise((resolve, reject) =>{
				connection(db => {
					db.insert(TABELA_GRUPO, data, function(err, res){
						db.release()
						if(err) reject(err)
						else resolve(res)
					})
				})
			})
		},

		update: function(data, id) {
			return new Promise((resolve, reject) =>{
				connection(db => {
					db.update(TABELA_GRUPO, data, { id: id }, function(err, res){
						db.release()
						if(err) reject(err)
						else resolve(res)
					})
				})
			})
		},

		delete: function(id) {
			return new Promise((resolve, reject) =>{
				connection(db => {
					db.delete(TABELA_GRUPO, { id: id }, function(err, res) {
						db.release()
						if(err) reject(err)
						else resolve(res)
					})
				})
			})
		},

		get: function() {
			return new Promise((resolve, reject) =>{
				connection(db => {
					db.select(['g.id','m.id as idLider','m.nome as nomeLider','g.localDeReuniao'])
					.join(TABELA_MEMBRO + ' m','g.idLider=m.id')
					.order_by('g.id','desc')
					.get(TABELA_GRUPO + ' g',function(err, res){
						db.release()
						if(err) reject(err)
						else resolve(res)
					})
				})	
			})
		},

		search: function() {
			return new Promise((resolve, reject) =>{
				connection(db => {
					db.select(['g.id','m.id as idLider','m.nome as nomeLider','g.localDeReuniao'])
					.from(TABELA_GRUPO + ' g')
					.join(TABELA_MEMBRO + ' m','g.idLider=m.id')
					.like(attr,expression)
					.order_by('m.id','desc')
					.get(function(err, res){
						db.release()
						if(err) reject(err)
						else resolve(res)
					})
				})
			})
		},

		find: function(id) {
			return new Promise((resolve, reject) =>{
				connection(db => {
					db.where({ 'id =': id})
					.get(TABELA_GRUPO, function(err, res){
						db.release()
						if(err) reject(err)
						else resolve(res[0])
					})
				})	
			})
		},

		findMembros: function(id) {
			return new Promise((resolve, reject) =>{
				connection(db => {
					db.select(['m.id','m.nome','m.contato'])
					.from(TABELA_MEMBRO + ' m')
					.where({'m.idGrupo =': id})
					.get(function(err, res){
						db.release()
						if(err) reject(err)
						else resolve(res)
					})
				})
			})
		}
	}
}
