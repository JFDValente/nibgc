const queryBuilder = require("node-querybuilder")

//50.116.112.120
//nibgr876_panda
//24062003@nybgc

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
			TABELA_MEMBRO : 'Membro',
			TABELA_MINISTERIO : 'Ministerio',
			TABELA_GRUPO : 'Grupo',
			TABELA_ATUAEM: 'AtuaEm'
		}
	}
}
