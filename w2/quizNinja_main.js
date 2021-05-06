




const quiz = [
	{ name: "Superman", realName: "Clark Kent" },
	{ name: "Wonder Woman", realName: "Diana Prince" },
	{ name: "Batman", realName: "Bruce Wayne" }
];


const game = {
	start(quiz) {
		this.questions = [...quiz];
		this.score = 0;
		
		for (const question of this.questions) {
			this.question = question;
			this.ask();
		}
		
		this.gameOver();
	},

ask(){
	const question = `What is ${this.question.name}'s real name?`;
	const response = prompt(question);
	this.check(response);
},

check(response) {
	const answer = this.question.realName;
	if (response === answer) {
		alert("Correct!");
		this.score++;
	} else {
		alert(`Wrong! The correct answer was ${answer}`);
	}
},

gameOver() {
	alert(`Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`)
}
}	
	
window.addEventListener("load", function() {
	alert('Welcome to Quiz Ninja!');
	game.start(quiz);
})
	
	