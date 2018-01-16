 module.exports = function(app){

	const TABELA_MINISTERIO = app.config.database.tabelas.TABELA_MINISTERIO
	const TABELA_MEMBRO = app.config.database.tabelas.TABELA_MEMBRO
	const TABELA_ATUAEM = app.config.database.tabelas.TABELA_ATUAEM
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
				db.select(['mi.id','mi.nome','m.id as idLider','m.nome as nomeLider'])
				.from(TABELA_MINISTERIO + ' mi')
				.join(TABELA_MEMBRO + ' m','mi.idLider=m.id')
				.order_by('mi.id','desc')
				.get(function(err, res){
					if(err) reject(err)
					else resolve(res)
				})
			})
		},

		search: function() {
			return new Promise((resolve, reject) => {
				db.select(['mi.id','mi.nome as nomeMinisterio','m.id as idLider','m.nome as nomeLider'])
				.from(TABELA_MINISTERIO + ' mi')
				.join(TABELA_MEMBRO + ' m','mi.idLider=m.id')
				.like(attr,expression)
				.order_by('mi.id','desc')
				.get(function(err, res){
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
		},

		//funcao incompleta
		findMembros: function(id,ano,status=[1,2,3]) {
			//console.log(status)
			return new Promise((resolve, reject) => {
				db.distinct()
				.select(['m.id','m.nome','m.contato'])
				.from(TABELA_MEMBRO + ' m')
				.join(TABELA_ATUAEM + ' a','m.id=a.idMembro')
				.where({'idMinisterio': id,'ano': ano})
				.where_in('a.status',status)
				.get(function(err, res){
					if(err) reject(err)
					else resolve(res)
				})
			})
		},

		matricula: function(data) {
			return new Promise((resolve, reject) => {
				db.insert(TABELA_ATUAEM, data, function(err, res){
					if(err) reject(err)
					else resolve(res)
				})
			})
		},

		deleteMatricula: function(idMinisterio,idMembro,ano) {
			return new Promise((resolve, reject) =>{
				db.delete(TABELA_ATUAEM, {'idMinisterio': idMinisterio,
						  'idMembro': idMembro, 'ano': ano}, function(err, res) {
					if(err) reject(err)
					else resolve(res)
				})
			})
		},

		updateMatricula: function(data) {
			return new Promise((resolve, reject) =>{
				db.update(TABELA_ATUAEM, data, {'idMinisterio': data.idMinisterio,
						  'idMembro': data.idMembro, 'ano': data.ano}, function(err, res){
					if(err) reject(err)
					else resolve(res)
				})
			})
		},
	}
}
