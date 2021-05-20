const links = [
	{
		week: 1,
		label: "Reading Exercises",
		filename: "readingExercise.html"
	},
	{
		week: 2,
		label: "Reading Exercises",
		filename: "quizNinja_index.html"
	},
	{
		week: 2,
		label: "Group Work",
		filename: "teamAssignment1.html"
	},
	{
		week: 3,
		label: "Reading Exercises",
		filename: "quizNinja_index.html"
	},
	{
		week: 3,
		label: "Group Work",
		filename: "teamAssignment.html"
	},
	{
		week: 4,
		label: "Reading Excercises",
		filename: "quizNinja_index.html"
	},
	{
		week: 4,
		label: "Group Work",
		filename: "teamTicTacToeAssignment.html"
	},
	{
		week: 5,
		label: "Group Work",
		filename: "hiking.html"
	}
]




//------------------------------------------------------




var j = 0;
var i;
for (i = 0; i < getWeekNumber(); i++) {        // create the week sections
	var btn;

	btn = document.createElement("ul");
	btn.classList.add("dropDownList");
	btn.style.height = "43px";
	document.body.appendChild(btn);
	
	var li = document.createElement("li");
	li.classList.add("label1");
	btn.appendChild(li);
	
	var a = document.createElement("a");
	a.href = "#"
	a.innerHTML = "Week " + (i + 1);
	li.appendChild(a);


	for (j; links[j].week - 1 == i; j++) {        // create the assignment sections
		var li = document.createElement("li");
		btn.appendChild(li);
		
		var a = document.createElement("a");
		a.href = "w" + (i+1) + "/" + links[j].filename;
		a.innerHTML = links[j].label;
		a.setAttribute("tabindex", "0")
		li.appendChild(a);
		
		if (j + 1 >= links.length) {
			break;
		}
	}
}

const dropDowns = document.querySelectorAll(".dropDownList");

var k;
for (k = 0; k < dropDowns.length; k++) {
	dropDowns[k].addEventListener('click', function() {
		if (this.style.height == "43px") {
			this.style.height = (this.childElementCount * (38 + 5)) + "px";
		} else {
			this.style.height = 38 + 5 + "px";
		}
	});
	
	dropDowns[k].addEventListener('focusout', function() {
		setTimeout(() => {this.style.height = 38 + 5 + "px"}, 100)   // slight delay so that you can actually use the link before the menu closes
	});
}

function getWeekNumber() {
	var weekNumber;
	var i;
	for (i = 0; i < links.length; i++) {
		weekNumber = links[i].week;
	}
	return weekNumber;
}



