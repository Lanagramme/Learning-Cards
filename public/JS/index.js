class Card {
	constructor() {
		this.id = Date.now()
		this.question
		this.answer
		this.stack = 1
		this.tally = 0
	}
	set tally(x) {
		this.tally += x
		if (this.tally > 3) {
			this.tally = 0
			this.stack += 1
		}
		if (this.tally < 0) {
			this.tally = 0
			this.stack -= 1
		}
	}

	set stack(x) {
		this.stack += x
		if (this.stack > 3) this.stack = 3
		if (this.stack < 0) this.stack = 0
	}

	check_answer(x) {
		if (x == this.answer) this.tally += 1
		else this.tally -= 1
	}
}

Cards = []

$.ajax({
	type: "POST",
	url: "/data/new",
	data: {
		test: JSON.stringify(["data"]),
	},
})

$.ajax({
	type: "GET",
	url: "/data/all",
}).done(res => {
	alert(res)
})
