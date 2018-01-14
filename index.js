const express = require("express")
const load = require('express-load')
const app = express()

app.use(express.static('public'))

load('config')
	.then('dao')
	.then('controller')
	.into(app)

app.listen(3000,()=>{
	console.log('Servidor inicializado na porta 3000')
})
