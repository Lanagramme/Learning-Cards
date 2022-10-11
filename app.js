const express = require("express"),
	path = require("path"),
	fs = require("fs"),
	app = express(),
	port = 8000,
	bodyParser = require("body-parser"),
	// FILE = "nouveauFichier.txt",
	// FILE = path.join(__dirname, "data/nouveauFichier.txt")
	// FILE = path.join(__dirname, "data/data.json")
	FILE = path.join(__dirname, "data/coreen.json")

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
	const SentData = req.body.test
	// fs.readFile(FILE, "utf8", function (err, data) {
	// 	const content = data,
	// 		file_data = JSON.parse(content),
	// 		sent_data = JSON.parse(req.body.test),
	// 		new_data = file_data.concat(sent_data)
	// 	console.log(sent_data)
	// 	writeData(new_data)
	// })

	read_data(FILE)
		.then(data => data.concat(SentData) )
		.then(new_data => write_data(new_data))
		.then(success => {
			success == "success" ? res.send("written") : res.send( { error : success } )
		})

})

function writeData(data) {
	fs.writeFile(FILE, JSON.stringify(data), function (err) {
		if (err) throw err
	})
}

async function read_data(filePath) {
	return new Promise(resolve => {
		fs.readFile(filePath, "utf8", (err, data) => {
			console.log('www')
			resolve(JSON.parse(data))
		})
	})
}

async function write_data(filePage) {
	return new promise(resove => {
		fs.writeFile(FILE, JSON.stringify(data), (err) => {
			if (err) resolve( err )
			resolve(  "success" )
		})
	})
}

app.get("/data/all", (req, res) => {
	// fs.readFile(FILE, "utf8", function (err, data) {
	// 	console.log("contenu ", data)
	// 	res.send(data)
	// })

	console.log("all")
	read_data(FILE)
		.then(data => {
			console.log('send')
			console.log("contenu ", data)
			res.send(JSON.stringify( data ))
		})
})
