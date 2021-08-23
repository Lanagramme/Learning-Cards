const express = require("express"),
	path = require("path"),
	fs = require("fs"),
	app = express(),
	port = 8000,
	bodyParser = require("body-parser")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//app.get('/', (req,res) => {
//	res.sendFile(path.join(__dirname, './public/index.html'))
//})

app.use("/", express.static(path.join(__dirname, "./public")))

app.listen(port, () => {
	console.log(`port ${port} is open`)
})

app.post("/data/new", (req, res) => {
	fs.readFile("nouveauFichier.txt", "utf8", function (err, data) {
		const content = data,
			file_data = JSON.parse(content),
			sent_data = JSON.parse(req.body.test),
			new_data = file_data.concat(sent_data)
		console.log(sent_data)
		writeData(new_data)
	})
})

function writeData(data) {
	fs.writeFile("nouveauFichier.txt", JSON.stringify(data), function (err) {
		if (err) throw err
	})
}

app.get("/data/all", (req, res) => {
	fs.readFile("nouveauFichier.txt", "utf8", function (err, data) {
		const content = data
		console.log("contenu ", content)
		res.send(content)
	})
})
