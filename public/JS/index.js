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
		} else if (this.tally < 0) {
			this._tally = 2
			this.stack = -1
		}
	}
	set stack(x) {
		this._stack += x
		if (this.stack >= 3) this._stack = 3
		else if (this.stack < 1) this._stack = 1
	}

	check_answer(x) {
		if (x == this.reponse.trim().toLowerCase()) {
			this.tally = 1
			return true
		} else {
			this.tally = -1
			return false
		}
	}
	pass() {
		this.check_answer(this.reponse)
	}
}

const Cards = [],
	cl = console.log,
	afficher_toutes_les_cartes = () => {
		const toutes_les_cartes = document.querySelector("#toutes_les_cartes")

		toutes_les_cartes.innerHTML = ""

		for (let carte of Cards) {
			toutes_les_cartes.insertAdjacentHTML(
				"beforeend",
				`<div class="centered border p-3 my-3 mx-auto rounded carte-question-show">
					<div class="card-field m-0">
						<label class="font-weight-bold">Question :</label>
						<p>${carte.question}</p>
						<label class="font-weight-bold">Réponse :</label>
						<p>${carte.reponse}</p>
					</div>
				</div>`
			)
		}
	},
	getStack = (numero_stack, deck = Cards) => {
		return deck.filter(carte => carte.stack == numero_stack)
	},
	poseQuestion = (debug = 0) => {
		// === l'option debug permet de décider du stack à utiliser ===

		// === afficher la taille des stacks ===
		for (let compteur_stack = 1; compteur_stack <= 3; compteur_stack++) {
			$(`#stack_${compteur_stack}`).html(getStack(compteur_stack).length)
		}

		// === choisir le stack approprié en fonction du cycle===
		if (!debug) {
			/*
				* toutes les 5 cycles, si le stack_3 contiens cartes, 
			 		ou n'importe quelle tour où le stack_1 et le stack_2 sont vide :
					==> utiliser le stack_3
				* toutes les 3 cycles, si le stack_2 contiens des cartes;
					ou n'importe quelle tour où le stack_1 est vide :
					==>	utiliser le stack_2
				* toutes les autre cycles, utiliser le stack_1	
			*/
			if (
				(cycle % 5 == 0 && getStack(3).length) ||
				(!getStack(2).length && !getStack(1).length)
			) {
				stack_actuel = getStack(3)
				$(".active").removeClass("active")
				$("#stack_3").closest(".col").addClass("active")
			} else if (
				(cycle % 3 == 0 && getStack(2).length) ||
				!getStack(1).length
			) {
				stack_actuel = getStack(2)
				$(".active").removeClass("active")
				$("#stack_2").closest(".col").addClass("active")
			} else {
				stack_actuel = getStack(1)
				$(".active").removeClass("active")
				$("#stack_1").closest(".col").addClass("active")
			}
		} else stack_actuel = getStack(debug)

		// === choisir une carte random du stack en cours ===
		console.log(stack_actuel)
		carte = stack_actuel[Math.floor(Math.random() * stack_actuel.length)]

		// === Poser la question de la carte en cours ===
		document.querySelector("#repondre_question").className = carte.id
		$("#repondre_question").html(carte.question)
		$("#question_id").html(carte.id)
		$("#deck_length").html(Cards.length)
		$("#carte_tally").html(carte.tally)
		$("#carte_level").html(
			carte.stack == 1 ? "Inconnu" : carte.stack == 2 ? "Peu connu" : "Connu"
		)
		if (cycle < 10) cycle += 1
		else cycle = 1
	},
	pass = () => {
		$("#repondre_reponse").val(carte.reponse)
		$("form#repondre").submit()
		cl(cycle, getStack(1).length, getStack(2).length, getStack(3).length)
	},
	afficher = target => {
		$(".page").addClass("hidden")
		target.removeClass("hidden")
	},
	good_test = () => {
		Cards[0].check_answer(42)
		cl(`tally: ${Cards[0].tally}, stack: ${Cards[0].stack}`)
	},
	bad_test = () => {
		Cards[0].check_answer(4)
		cl(`tally: ${Cards[0].tally}, stack: ${Cards[0].stack}`)
	}

let cycle = 1

// ========================================
//					Executions démarage
// ========================================
$.ajax({
	type: "GET",
	url: "/data/all",
}).done(res => {
	for (i of JSON.parse(res)) {
		if (typeof i == "object" && i.id) {
			carte = new Card()
			Object.assign(carte, i)
			Cards.push(carte)
		}
	}
	// afficher_toutes_les_cartes()
})

// ========================================
//						Event Listeners
// ========================================
$("form#ask").submit(e => {
	e.preventDefault()
	const carte = new Card()
	for (i of ["question", "reponse"]) {
		if (!$(`#ask_${i}`).val().trim().length) {
			alert("Une " + i + " doit être founie")
			return
		}
		carte[i] = $(`#ask_${i}`).val().trim()
		!$(`#ask_${i}`).val("")
	}

	Cards.push(carte)
	// afficher_toutes_les_cartes()

	$.ajax({
		type: "POST",
		url: "/data/new",
		data: {
			test: JSON.stringify([carte]),
		},
	})
})
$("form#repondre").submit(e => {
	e.preventDefault()
	const reponse = document.querySelector("#repondre_question"),
		carte = Cards.find(x => x.id == reponse.className)
	if (carte.check_answer($("#repondre_reponse").val())) alert("Bonne réponse")
	else alert("Faux. La bonne réponse était: " + carte.reponse)
	$("#repondre_reponse").val("")
	$("#serge").click()
})

$("#serge").click(e => {
	poseQuestion()
	afficher($("#page_2"))
})
$("#show").click(e => {
	poseQuestion()
	afficher($("#page_3"))
})
$("#show").click(e => afficher_toutes_les_cartes())
$(".terminer").click(e => afficher($("#page_1")))
