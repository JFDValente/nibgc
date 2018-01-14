const queryBuilder = require("node-querybuilder")

module.exports = function(app){
	const settings = {
			host: '50.116.112.120',
			database: 'nibgr876_igreja',
			user: 'nibgr876_panda',
			password: '24062003@nybgc'
	}

	return{
		db: function(){
			let connection

			try{
				connection = queryBuilder.QueryBuilder(settings, 'mysql')
			}
			catch(err){
				console.error("err connection", err)
			}

			return connection
		},
		tabelas:{
			TABELA_MEMBRO : 'membro',
			TABELA_MINISTERIO : 'ministerio',
			TABELA_GRUPO : 'grupo',
			TABELA_ATUAEM: 'atuaem'
		}
	}
}
