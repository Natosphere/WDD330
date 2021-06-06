const imgBasePath = "//byui-cit.github.io/cit261/examples/";




hikeList.forEach((hike, i) => {	
	
	// main container
	let div = document.createElement('div');
	div.classList.add("hikeItem");
	div.setAttribute('id', 'hike' + i);
	hikes.appendChild(div);
	
	// title card
	let h2 = document.createElement('h2');
	h2.innerHTML =  `${hike.name}`;
	h2.classList.add('titleCard');
	div.appendChild(h2);
	
	let hike1 = document.createElement('section');
	div.appendChild(hike1);
	
	let img = document.createElement('img');
	img.setAttribute("src", imgBasePath + `${hike.imgSrc}`);
	div.appendChild(img);
	
	let distance = document.createElement('p');
	distance.innerHTML = `Distance: ${hike.distance}`;
	div.appendChild(distance);
	
	let difficulty = document.createElement('p');
	difficulty.innerHTML = `Difficulty: ${hike.difficulty}`;
	div.appendChild(difficulty);
	
	let description = document.createElement('p');
	description.innerHTML = `Description: ${hike.description}`;
	description.classList.add("titleCardDetail")
	description.classList.add('hidden');
	div.appendChild(description);
	
	let directions = document.createElement('p');
	directions.innerHTML = `Directions: ${hike.directions}`;
	directions.classList.add("titleCardDetail")
	directions.classList.add('hidden');
	div.appendChild(directions);
	
	
	// comment container
	let commentSection = document.createElement('div');
	commentSection.classList.add('hidden');
	commentSection.classList.add("titleCardDetail");
	commentSection.classList.add("commentSection");
	div.appendChild(commentSection);
	
	// comment name input
	let nameInput = document.createElement('input');
	nameInput.setAttribute('type', 'text');
	nameInput.setAttribute('placeholder', 'Please enter your name');
	nameInput.classList.add('hidden');
	nameInput.classList.add("titleCardDetail");
	commentSection.appendChild(nameInput);
	
	// comment input
	let commentInput = document.createElement('textarea');
	commentInput.classList.add('hidden');
	commentInput.classList.add("titleCardDetail");
	commentSection.appendChild(commentInput);
	
	// comment submit
	let commentSubmit = document.createElement('button');
	commentSubmit.classList.add('hidden');
	commentSubmit.classList.add("titleCardDetail");
	commentSubmit.innerHTML = "Submit Comment";
	commentSubmit.addEventListener('click', function() {saveComment(event)});
	commentSection.appendChild(commentSubmit);
	
});

const hikeItemList = document.getElementsByClassName("hikeItem");

for (var i = 0; i < hikeItemList.length; i++) {
	hikeItemList[i].addEventListener("click", function() {hikeDetail(this)})
}

function hikeDetail(x) {
	
	
	for (var i = 0; i < hikeItemList.length; i++) {
 		if (document.getElementById('backButton') != null && document.querySelectorAll('.hidden').length == 2) {
			return;
		}

		if (hikeItemList[i] == x) {
			x.removeEventListener("click", function() {hikeDetail(this)})
			x.firstChild.setAttribute('id', 'titleCardFocus')
			details = x.querySelectorAll('.titleCardDetail');
			
			// create and display "view all" button
			backButton = document.createElement('div');
			backButton.innerHTML = "view all";
			backButton.setAttribute('id', 'backButton');
			x.appendChild(backButton);
			backButton.addEventListener("click", function(e) {resetPage(e)})
			
			// unhide the relevant info
			for (j = 0; j < details.length; ++j) {
				details[j].classList.remove('hidden');
			}
			hikeItemList[i].classList.remove('hidden');
			
			// get hike comments
			var hikeName = hikeItemList[i].firstElementChild.innerHTML;
			
			var hikeComments = getHikeComments(hikeName);
			displayComments('hike' + i, hikeComments)
			
		// hide the other hikes
		} else {
			hikeItemList[i].classList.add('hidden');
		}
	}
}

function resetPage(e) {
	for (var m = 0; m < hikeItemList.length; m++) {
		hikeItemList[m].classList.remove('hidden');
		e.stopPropagation();
		hikeItemList[m].addEventListener("click", function() {hikeDetail(this)});
		
		var details = document.querySelectorAll('.titleCardDetail');
		for (j = 0; j < details.length; ++j) {
				details[j].classList.add('hidden');
		}
	}
	
	document.querySelectorAll('#backButton').forEach(e => e.remove());
	
}

function saveComment(e) {
	var name = e.target.parentNode.querySelector('input').value;
	var d = new Date();
	var date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
	var content = e.target.parentNode.querySelector('textarea').value;
	var hikeName = e.target.parentNode.parentNode.querySelector('.titleCard').innerHTML;
	var hikeId = e.target.parentNode.parentNode.id;
	var comment = [name, date, content];
	
	hikeComments = getHikeComments(hikeName);
	hikeComments.push(comment);
	
	saveToLocalStorage(hikeName, hikeComments);
}

function createCommentElement(n, d, data) {
	var container = document.createElement('div');
	container.classList.add("titleCardDetail");
	
	var name = document.createElement('a');
	name.innerHTML = n;
	container.appendChild(name);
	
	var date = document.createElement('a');
	date.innerHTML = d;
	date.style = "margin-left: 5px";
	container.appendChild(date);
	
	var commentData = document.createElement('p');
	commentData.innerHTML = data;
	container.appendChild(commentData);
	
	return container;
	
}

function displayComments(hikeId, commentArray) {
	var hike = document.querySelector('#' + hikeId);
	var commentSection = hike.querySelector('.commentSection');
	
	// clear out previous comments
	garbage = commentSection.querySelectorAll('div');
	garbage.forEach(e => e.remove());
	
	// display all comments for current hike
	for (i = 0; i < commentArray.length; i++) {
		commentElement = createCommentElement(commentArray[i][0], commentArray[i][1], commentArray[i][2]);
		commentSection.appendChild(commentElement);
	}
}



function getHikeComments(hikeName) {			

	// error catch for no comments
	try {
		var hikeComments = JSON.parse(localStorage[hikeName]);
		return hikeComments
	
	} catch(SyntaxError) {
		console.log(`No comments yet for ${hikeName}`);
		var hikeComments = [];
		return hikeComments;
	}
}

function saveToLocalStorage(key, data) {
	localStorage[key] = JSON.stringify(data);
}





