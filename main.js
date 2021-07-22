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
		label: "Reading Assignment",
		filename: "quizNinja_index.html"
	},
	{
		week: 5,
		label: "Group Work",
		filename: "hiking.html"
	},
	{
		week: 6,
		label: "ToDo List",
		filename: "NathanWheelwright_TodoAssignment.html"
	},
	{
		week: 7,
		label: "Reading Assignment",
		filename: "quizNinja_index.html"
	},
	{
		week: 7,
		label: "Team Activity",
		filename: "hiking.html"
	},
	{
		week: 8,
		label: "Reading Assignment",
		filename: "WaiAria_cat.html"
	},
	{
		week: 8,
		label: "Team Activity",
		filename: "swapi.html"
	},
	{
		week: 9,
		label: "Reading Assignment",
		filename: "quizNinja_index.html"
	},
	{
		week: 9,
		label: "Team Activity",
		filename: "index-START.html"
	},
	{
		week: 10,
		label: "Reading Assignment",
		filename: "w10_notes.html"
	},
	{
		week: 10,
		label: "Team Activity",
		filename: "quakeApp.html"
	},
	{
		week: 12,
		label: "Font Previewer",
		filename: "fontPreviewer.html"
	}
]




//------------------------------------------------------




var j = 0;
var i;
var weekNumber;
var tabNumber = getWeekNumber();
for (i = 0; i < tabNumber; i++) {        // create the week sections
	var btn;

	btn = document.createElement("ul");
	btn.classList.add("dropDownList");
	// btn.style.height = "43px";
	document.querySelector('#main').appendChild(btn);
	
	var li = document.createElement("li");
	li.classList.add("label1");
	li.style.height = '43px';
	btn.appendChild(li);
	
	var a = document.createElement("a");
	a.href = "#"
	a.innerHTML = "Week " + weekNumber[i];
	li.appendChild(a);


	for (j; links[j].week == weekNumber[i]; j++) {        // create the assignment sections
		var li2 = document.createElement("li");
		li.appendChild(li2);
		
		var a = document.createElement("a");
		a.href = "w" + weekNumber[i] + "/" + links[j].filename;
		a.innerHTML = links[j].label;
		a.setAttribute("tabindex", "0")
		li2.appendChild(a);
		
		if (j + 1 >= links.length) {
			break;
		}
	}
}

const dropDowns = document.querySelectorAll(".dropDownList");

var k;
for (k = 0; k < dropDowns.length; k++) {
	dropDowns[k].addEventListener('click', function() {
		if (this.querySelector('.label1').style.height == "43px") {
			this.querySelector('.label1').style.height = (this.querySelector('.label1').childElementCount * (38 + 5)) + "px";
			this.querySelector('.label1').style.zIndex = '200';
		} else {
			this.querySelector('.label1').style.height = 38 + 5 + "px";
			this.querySelector('.label1').style.removeProperty('z-index');
		}
	});
	
	dropDowns[k].addEventListener('focusout', function() {
		setTimeout(() => {this.querySelector('.label1').style.height = 38 + 5 + "px"; 
			this.querySelector('.label1').style.removeProperty('z-index')}, 100)   // slight delay so that you can actually use the link before the menu closes
	});
}

function getWeekNumber() {
	weekNumber = [];
	var i;
	for (i = 0; i < links.length; i++) {
		if (!weekNumber.includes(links[i].week)){
			weekNumber.push(links[i].week)
		}
	}
	return weekNumber.length;
}



