class Card {
	constructor() {
		this.id = Date.now()
		this.question
		this.answer
		this.stack = 1
		this.tally
	}
	set tally(x) {
		this.tally += x
		if (this.tally > 3) this.tally = 3
		if (this.tally < 0) this.tally = 0
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
