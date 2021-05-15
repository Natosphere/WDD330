const quiz = [
	{ name: "Superman", realName: "Clark Kent" },
	{ name: "Wonder Woman", realName: "Diana Prince" },
	{ name: "Batman", realName: "Bruce Wayne" }
];



// View Object 
const view = {
	start: document.getElementById('start'),
	score: document.querySelector('#score strong'),
	question: document.getElementById('question'),
	result: document.getElementById('result'),
	info: document.getElementById('info'),
	response: document.querySelector('#response'),
	
	show(element){
			element.style.display = 'block';
		},
	hide(element){
			element.style.display = 'none';
		},

	render(target,content,attributes) {
		for(const key in attributes) {
			target.setAttribute(key, attributes[key]);
		}
		target.innerHTML = content;
	},
	
	
	setup() {
		this.show(this.question);
		this.show(this.response);
		this.show(this.result);
		this.show(this.start);
		this.show(this.score, game.score);
		this.show(this.result, "");
		this.show(this.info, "");
		this.resetForm();
	},
	
	resetForm() {
		this.response.answer.value = "";
		this.response.answer.focus();
	},
	
	teardown() {
		this.hide(this.question);
		this.hide(this.response);
		this.show(this.start);
	}
	
};



const game = {
	start(quiz) {
		this.score = 0;
		this.questions = [...quiz];
		view.setup();
		this.ask();
	},

	ask(){
		if (this.questions.length > 0) {
			this.question = this.questions.pop();
			const question = `What is ${this.question.name}'s real name?`;
			view.render(view.question, question);
		} else {
			this.gameOver();
		}
		
	},

	check(event) {
		event.preventDefault();
		const response = view.response.answer.value;		
		const answer = this.question.realName;

		if (response === answer) {
			view.render(view.result, "Correct!", {"class":"correct"});
			this.score++;
			view.render(view.score, this.score);
		} else {
			view.render(view.result, `Wrong! The correct answer was ${answer}`, {"class": "wrong"});
		}
		view.resetForm();
		this.ask();
	},

	gameOver() {
		view.show(view.start);
		view.render(view.info,`Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
		view.teardown();
	}
}

view.start.addEventListener('click', () => game.start(quiz), false);
view.response.addEventListener('submit', (event) => game.check(event), false);
view.hide(view.response)




	