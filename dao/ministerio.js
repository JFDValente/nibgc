module.exports = function(app){

	const TABELA_MINISTERIO = app.config.database.tabelas.TABELA_MINISTERIO
	const TABELA_MEMBRO = app.config.database.tabelas.TABELA_MEMBRO
	const TABELA_ATUAEM = app.config.database.tabelas.TABELA_ATUAEM
	const TABELA_GRUPO = app.config.database.tabelas.TABELA_GRUPO

	let connection = app.config.database.db()

	return {

		create: function(data) {
			return new Promise((resolve, reject) =>{
				connection(db => {
					db.insert(TABELA_MINISTERIO, data, function(err, res){
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
					db.update(TABELA_MINISTERIO, data, { id: id }, function(err, res){
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
					db.delete(TABELA_MINISTERIO, { id: id }, function(err, res) {
						db.release()
						if(err) reject(err)
						else resolve(res)
					})
				})
			})
		},

		get: function() {
			return new Promise((resolve, reject) => {
				connection(db => {
					db.select(['mi.id','mi.nome','m.id as idLider','m.nome as nomeLider'])
					.from(TABELA_MINISTERIO + ' mi')
					.join(TABELA_MEMBRO + ' m','mi.idLider=m.id')
					.order_by('mi.id','desc')
					.get(function(err, res){
						db.release()
						if(err) reject(err)
						else resolve(res)
					})
				})
			})
		},

		search: function() {
			return new Promise((resolve, reject) => {
				connection(db => {
					db.select(['mi.id','mi.nome as nomeMinisterio','m.id as idLider','m.nome as nomeLider'])
					.from(TABELA_MINISTERIO + ' mi')
					.join(TABELA_MEMBRO + ' m','mi.idLider=m.id')
					.like(attr,expression)
					.order_by('mi.id','desc')
					.get(function(err, res){
						db.release()
						if(err) reject(err)
						else resolve(res)
					})
				})
			})
		},

		find: function(id) {
			return new Promise((resolve, reject) => {
				connection(db => {
					db.select(['mi.id','mi.nome','mi.dadosReuniao','mi.descricao','mi.idLider','m.nome as nomeLider'])
					.where({ 'mi.id =': id})
					.join(TABELA_MEMBRO + " m","mi.idLider=m.id")
					.get(TABELA_MINISTERIO + " mi", function(err, res){
						db.release()
						if(err) reject(err)
						else resolve(res[0])
					})
				})
			})
		},

		getMembros: function(idMinisterio,ano,prioridade,status) {
			return new Promise((resolve, reject) => {
				connection(db => {
					db.distinct()
					.select(['m.id as idMembro','m.nome','m.contato','a.prioridade',
						'a.status','l.id as idLider','l.nome as nomeLider'])
					.from(TABELA_MEMBRO + ' m')
					.join(TABELA_ATUAEM + ' a','m.id=a.idMembro')
					.join(TABELA_GRUPO + ' g','m.idGrupo=g.id')
					.join(TABELA_MEMBRO + ' l','g.idLider=l.id')
					.where({
						'a.idMinisterio': idMinisterio,
						'a.ano': ano
					})
					.get(function(err, res){
						db.release()
						if(err) reject(err)
						else resolve(res)
					})
				})
			})
		},

		matricula: function(data) {
			return new Promise((resolve, reject) => {
				connection(db => {
					db.insert(TABELA_ATUAEM, data, function(err, res){
						db.release()
						if(err) reject(err)
						else resolve(res)
					})
				})
			})
		},

		deleteMatricula: function(idMinisterio,idMembro,ano) {
			return new Promise((resolve, reject) =>{
				connection(db => {
					db.delete(TABELA_ATUAEM, {'idMinisterio': idMinisterio,
							  'idMembro': idMembro, 'ano': ano}, function(err, res) {
								  db.release()
						if(err) reject(err)
						else resolve(res)
					})
				})
			})
		},

		updateMatricula: function(data) {
			return new Promise((resolve, reject) =>{
				connection(db => {
					db.update(TABELA_ATUAEM, data, {'idMinisterio': data.idMinisterio,
							  'idMembro': data.idMembro, 'ano': data.ano}, function(err, res){
								  db.release()
						if(err) reject(err)
						else resolve(res)
					})
				})
			})
		},

		eliminaPrioridade: function(data) {
			return new Promise((resolve, reject) =>{
				connection(db => {
					db.update(TABELA_ATUAEM, {prioridade: false},
								{
									'idMembro': data.idMembro,
									'ano': data.ano
								},
					function(err, res){
						db.release()
						if(err) reject(err)
						else resolve(res)
					})
				})
			})
		}
	}
}
