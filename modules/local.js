const read_data = async (filePath) => {
	console.log('read ::')
	return new Promise(( resolve, reject ) => {
		fs.readFile(filePath, "utf8", (err, data) => {
			data = JSON.parse(data)
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
