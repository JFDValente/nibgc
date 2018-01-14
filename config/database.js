const queryBuilder = require("node-querybuilder")

module.exports = {
	settings:{
		host: 'localhost',
		database: 'nibgc',
		user: 'root',
		password: ''
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
