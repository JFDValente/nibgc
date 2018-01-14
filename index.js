const express = require("express")
const load = require('express-load')
const bodyParser = require('body-parser')
const app = express()

app.use(express.static('public'))

app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.urlencoded({ extended: false }))

load('config')
	.then('dao')
	.then('controller')
	.into(app)

app.listen(3000,()=>{
	console.log('Servidor inicializado na porta 3000')
})
