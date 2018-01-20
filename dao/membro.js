module.exports = function(app){

	const TABELA_MEMBRO = app.config.database.tabelas.TABELA_MEMBRO
	const TABELA_GRUPO = app.config.database.tabelas.TABELA_GRUPO
	const TABELA_ATUAEM = app.config.database.tabelas.TABELA_ATUAEM
	let connection = app.config.database.db()

	return {

		create: function(data) {
			return new Promise((resolve, reject) =>{
				connection(db => {
					db.insert(TABELA_MEMBRO, data, function(err, res){
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
					db.update(TABELA_MEMBRO, data, { id: id }, function(err, res){
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
					db.delete(TABELA_MEMBRO, { id: id }, function(err, res) {
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
					db.limit(10)
					.select(['m.id','m.nome','m.contato','l.id as idLider','l.nome as nomeLider'])
					.from(TABELA_MEMBRO + ' m')
					.join(TABELA_GRUPO + ' g','m.idGrupo=g.id')
					.join(TABELA_MEMBRO + ' l','g.idLider=l.id')
					.order_by('m.id','desc')
					.get(function(err, res){
						db.release()
						if(err) reject(err)
						else resolve(res)
					})
				})
			})
		},
		
		search: function(attr,expression) {
			return new Promise((resolve, reject) =>{
				connection(db => {
					db.limit(10)
					.select(['m.id','m.nome','m.contato','l.id as idLider','l.nome as nomeLider'])
					.from(TABELA_MEMBRO + ' m')
					.join(TABELA_GRUPO + ' g','m.idGrupo=g.id')
					.join(TABELA_MEMBRO + ' l','g.idLider=l.id')
					.like('m.'+attr,expression)
					.order_by('m.id','desc')
					.get(function(err, res){
						db.release()
						if(err) reject(err)
						else resolve(res)
					})
				})
			})
		},

		searchMatricula: function(attr,expression,idMinisterio,ano) {
			return new Promise((resolve, reject) =>{
				connection(db => {
					let sql= `
						select m.id as idMembro,m.nome,m.contato,l.id as idLider,
								l.nome as nomeLider, a.status, a.prioridade 
						from Membro m 
						left join Grupo g on(m.idGrupo=g.id) 
						left join Membro l on(g.idLider=l.id)
						left join AtuaEm a on(m.id=a.idMembro and a.idMinisterio=${idMinisterio} 
											  and a.ano=${ano}) 
						where m.${attr} like \'%${expression}%\' 
						order by m.nome desc`
					//console.log(sql)
					db.query(sql,function(err, res){
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
					.get(TABELA_MEMBRO, function(err, res){
						db.release()
						if(err) reject(err)
						else resolve(res[0])
					})
				})
			})
		},

		//retornar todos os membros que participaram da feira, mas não foram selecionados 
		//para estar em nenhum ministério
		getMembrosInscritosSemMinisterio: function(attr,expression,ano){
			//console.log(status)
			return new Promise((resolve, reject) => {
				connection(db => {
					let sql= `
						select m.id as idMembro,m.nome,m.contato,l.id as idLider,
								l.nome as nomeLider, null as status, null as prioridade 
						from Membro m 
						left join Grupo g on(m.idGrupo=g.id) 
						left join Membro l on(g.idLider=l.id)
						left join AtuaEm a on(m.id=a.idMembro and a.idMinisterio=${idMinisterio} 
											  and a.ano=${ano}) 
						where m.${attr} like \'%${expression}%\' and m.id in
						(select idMembro from AtuaEm where ano=${ano} and status=0) 
						and m.id not in
						(select idMembro from AtuaEm where ano=${ano} and status=1)
						order by m.nome desc`
					db.query(sql, function(err, res){
						db.release()
						if(err) reject(err)
						else resolve(res)
					})
				})
			})
		},

		//retornar todos os membros que não se inscreveram em nenhum ministério na feira
		getMembrosNaoInscritos: function(attr,expression,ano){
			//console.log(status)
			return new Promise((resolve, reject) => {
				connection(db => {
					let sql= `
						select m.id as idMembro,m.nome,m.contato,l.id as idLider,
								l.nome as nomeLider, null as status, null as prioridade 
						from Membro m 
						left join Grupo g on(m.idGrupo=g.id) 
						left join Membro l on(g.idLider=l.id)
						left join AtuaEm a on(m.id=a.idMembro and a.idMinisterio=${idMinisterio} 
											  and a.ano=${ano}) 
						where m.${attr} like \'%${expression}%\' and m.id not in
						(select id from AtuaEm where ano=${ano})
						order by m.nome desc`
					
					db.query(sql, function(err, res){
						db.release()
						if(err) reject(err)
						else resolve(res)
					})
				})
			})
		},
	}
}
