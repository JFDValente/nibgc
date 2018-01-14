const express = require("express")
const load = require('express-load')
const bodyParser = require('body-parser')
const app = express()

app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

load('config')
	.then('dao')
	.then('controller')
	.into(app)

const http = require('http').Server(app)
const io = require('socket.io')(http)

io.on("connection", socket => {
	app.set('socket', socket)
})

// Após ler todas as rotas, se não existir, redireciona para o início
app.get("*", (req, res) => {
	res.redirect("/")
})

http.listen(3000,()=>{
	console.log('Servidor inicializado na porta 3000')
})
