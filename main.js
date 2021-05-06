const weekNumber = 3;

const links = [
	{
		week: 1,
		label: "Reading Exercises",
		filename: ""
	},
	{
		week: 2,
		label: "Reading Exercises",
		filename: ""
	},
	{
		week: 2,
		label: "Group Work",
		filename: ""
	},
	{
		week: 3,
		label: "Reading Exercises",
		filename: ""
	},
	{
		week: 3,
		label: "Group Work",
		filename: ""
	}
]

var j = 0;
var i;
for (i = 0; i < weekNumber; i++) {
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


	for (j; links[j].week - 1 == i; j++) {
		var li = document.createElement("li");
		btn.appendChild(li);
		
		var a = document.createElement("a");
		a.href = links[j].filename;
		a.innerHTML = links[j].label;
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
		
		var closedBool = true;
		
		if (this.style.height == "43px") {
			this.style.height = (this.childElementCount * (38 + 5)) + "px";
		} else {
			this.style.height = 38 + 5 + "px";
		}

	});
	
	dropDowns[k].addEventListener('focusout', function() {

		this.style.height = 38 + 5 + "px";

	});
}


