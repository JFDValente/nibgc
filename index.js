const express = require("express")
const load = require('express-load')
const app = express()

load('config')
	.then('dao')
	.then('controller')
	.into(app)

app.listen(3000,()=>{
	console.log('Servidor inicializado na porta 3000')
})