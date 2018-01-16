//const TABELA_MEMBRO = "Membro"
module.exports = function(app){
	const TABELA_MEMBRO = app.config.database.tabelas.TABELA_MEMBRO
	const TABELA_GRUPO = app.config.database.tabelas.TABELA_GRUPO
	const TABELA_ATUAEM = app.config.database.tabelas.TABELA_ATUAEM
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
				db.limit(10)
				.select(['m.id','m.nome','m.contato','l.id as idLider','l.nome as nomeLider'])
				.from(TABELA_MEMBRO + ' m')
				.join(TABELA_GRUPO + ' g','m.idGrupo=g.id')
				.join(TABELA_MEMBRO + ' l','g.idLider=l.id')
				.order_by('m.id','desc')
				.get(function(err, res){
					if(err) reject(err)
					else resolve(res)
				})
			})
		},
		
		search: function(attr,expression) {
			return new Promise((resolve, reject) => {
				db.limit(10)
				.select(['m.id','m.nome','m.contato','l.id as idLider','l.nome as nomeLider'])
				.from(TABELA_MEMBRO + ' m')
				.join(TABELA_GRUPO + ' g','m.idGrupo=g.id')
				.join(TABELA_MEMBRO + ' l','g.idLider=l.id')
				.like('m.'+attr,expression)
				.order_by('m.id','desc')
				.get(function(err, res){
					if(err) reject(err)
					else resolve(res)
				})
			})
		},

		searchMatricula: function(attr,expression,idMinisterio,ano) {
			return new Promise((resolve, reject) => {
				let sql= `
					select m.id as idMembro,m.nome,m.contato,l.id as idLider,l.nome as nomeLider,
						   (SELECT distinct status from AtuaEm a 
						    where idMinisterio=${idMinisterio} and idMembro=m.id and ano=${ano}) as status,
						    (SELECT distinct prioridade from AtuaEm a 
						    where idMinisterio=${idMinisterio} and idMembro=m.id and ano=${ano}) as prioridade, 
					from Membro m 
					left join Grupo g on(m.idGrupo=g.id) 
					left join Membro l on(g.idLider=l.id)
					where m.${attr} like \'%${expression}%\' 
					order by m.nome desc`
				//console.log(sql)
				db.query(sql,function(err, res){
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
