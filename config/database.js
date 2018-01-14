const queryBuilder = require("node-querybuilder")

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

	db: function(){
		let connection

		try{
			connection = queryBuilder.QueryBuilder(this.settings, 'mysql')
		}
		catch(err){
			console.error("err connection", err)
		}

		return connection
	}
}
