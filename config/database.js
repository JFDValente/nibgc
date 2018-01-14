const queryBuilder = require("node-querybuilder")

<<<<<<< HEAD
//50.116.112.120
//nibgr876_panda
//24062003@nybgc

module.exports = {
	settings:{
		host: '50.116.112.120',
		database: 'nibgr876_igreja',
		user: 'nibgr876_panda',
		password: '24062003@nybgc'
	},
=======
module.exports = function(app){
	const settings = {
			host: '50.116.112.120',
			database: 'nibgr876_igreja',
			user: 'nibgr876_panda',
			password: '24062003@nybgc'
	}
>>>>>>> 376431914ca8ac78d2a40db248c7666881bb5c9e

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
