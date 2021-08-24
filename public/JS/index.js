class Card {
	constructor() {
		this.id = Date.now()
		this.question
		this.reponse
		this._stack = 1
		this._tally = 0
	}

	get tally() {
		return this._tally
	}
	get stack() {
		return this._stack
	}

	set tally(x) {
		this._tally += x
		if (this.tally > 3) {
			this._tally = 0
			this.stack = 1
		}
		if (this.tally < 0) {
			this._tally = 2
			this.stack = -1
		}
	}
	set stack(x) {
		this._stack += x
		if (this.stack >= 3) this._stack = 3
		if (this.stack < 1) this._stack = 1
	}

	check_answer(x) {
		if (x == this.reponse) {
			this.tally = 1
			return true
		} else {
			this.tally = -1
			return false
		}
	}
}

const Cards = []

$.ajax({
	type: "GET",
	url: "/data/all",
}).done(res => {
	for (i of JSON.parse(res)) {
		console.log(i)
		if (typeof i == "object" && i.id) {
			carte = new Card()
			Object.assign(carte, i)
			Cards.push(carte)
		}
	}
})

$("form#ask").submit(e => {
	e.preventDefault()
	const carte = new Card()
	for (i of ["question", "reponse"]) {
		if (!$(`#ask_${i}`).val().trim().length) {
			alert("Une " + i + " doit être founie")
			return
		}
		carte[i] = $(`#ask_${i}`).val().trim()
	}

	Cards.push(carte)

	$.ajax({
		type: "POST",
		url: "/data/new",
		data: {
			test: JSON.stringify([carte]),
		},
	})
})

$("form#give").submit(e => {
	e.preventDefault()

	const reponse = document.querySelector("#give_question"),
		carte = Cards.find(x => x.id == reponse.className)
	console.log(carte.reponse)
	if (carte.check_answer($("#give_reponse").val())) alert("bonne réponse")
	else alert("Faux. La bonne réponse était: " + carte.reponse)
})

good_test = () => {
	Cards[0].check_answer(42)
	console.log("tally: ", Cards[0].tally)
	console.log("stack: ", Cards[0].stack)
}
bad_test = () => {
	Cards[0].check_answer(4)
	console.log("tally: ", Cards[0].tally)
	console.log("stack: ", Cards[0].stack)
}

$("#serge").click(e => {
	const index = Math.floor(Math.random() * Cards.length),
		carte = Cards[index]
	console.log(index)
	console.log(Cards[index].id)
	console.log(Cards[index].question)

	document.querySelector("#give_question").className = Cards[index].id
	document.querySelector("#give_question").innerHTML = Cards[index].question
})
