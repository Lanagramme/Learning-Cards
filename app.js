const express = require("express"),
	path = require("path"),
	fs = require("fs"),
	app = express(),
	port = 8000,
	bodyParser = require("body-parser"),
	// FILE = path.join(__dirname, "data/data.json")
	FILE = path.join(__dirname, "data/coreen.json")
const Local = require('./modules/local.js')

const read_data = async (filePath) => {
	console.log('read ::')
	return new Promise(( resolve, reject ) => {
		fs.readFile(filePath, "utf8", (err, data) => {
			data = JSON.parse(data)
			if (!data.length) data =[{ data : 0 }] 
			console.log(data)
			Array.isArray(data) 
				?	resolve(data)
				: resolve([{test: "test"}])
		})
	})
}

const write_data = async (data) => {
	console.log('write ::')
	return new Promise(( resolve, reject ) => {
		fs.writeFile(FILE, JSON.stringify(data), (err) => {
			if (err) resolve( err )
			resolve(  "success" )
		})
	})
}

module.export = {
	read_data : read_data,
	write_data : write_data
}
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
	read_data(FILE)
		.then(data => data.concat(JSON.parse( SentData )) )
		.then(new_data => write_data(new_data))
		.then(success => {
			success == "success" ? res.send("written") : res.send( { error : success } )
		})

})

app.get("/data/all", (req, res) => {
	console.log("all")
	read_data(FILE)
		.then(data => {
			console.log('send')
			console.log("contenu ", data)
			res.send(JSON.stringify( data ))
		})
})
