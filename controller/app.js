module.exports = function(app) {
	app.get("/", (req, res) => {
		res.sendFile("dashboard.html", { root: __dirname + "/../view/" })
	})
}
