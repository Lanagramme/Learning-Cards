const fs = require("fs")
fs.writeFile("nouveauFichier.txt", "Mon contenu", function (err) {
	if (err) throw err
	console.log("Fichier créé !")
})
