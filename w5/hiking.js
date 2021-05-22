const imgBasePath = "//byui-cit.github.io/cit261/examples/";

hikeList.forEach(hike => {	
	let hike1 = document.createElement('section');
	let h2 = document.createElement('h2');
	let img = document.createElement('img');
	let distance = document.createElement('p');
	let difficulty = document.createElement('p');
	let div = document.createElement('div');
	let description = document.createElement('p');
	let directions = document.createElement('p');
	
	div.classList.add("hikeItem");
	
	h2.innerHTML =  `${hike.name}`;
	h2.classList.add('titleCard');
	
	
	img.setAttribute("src", imgBasePath + `${hike.imgSrc}`);
	
	distance.innerHTML = `Distance: ${hike.distance}`;
	difficulty.innerHTML = `Difficulty: ${hike.difficulty}`;
	
	description.innerHTML = `Description: ${hike.description}`;
	directions.innerHTML = `Directions: ${hike.directions}`;
	description.classList.add("titleCardDetail")
	directions.classList.add("titleCardDetail")
	description.classList.add('hidden');
	directions.classList.add('hidden');
	
	hikes.appendChild(div);
	div.appendChild(h2);
	div.appendChild(hike1);
	div.appendChild(img);
	div.appendChild(distance);
	div.appendChild(difficulty);
	

	div.appendChild(description);
	div.appendChild(directions);
	
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
			
			backButton = document.createElement('div');
			backButton.innerHTML = "view all";
			backButton.setAttribute('id', 'backButton');
			
			x.appendChild(backButton);
			backButton.addEventListener("click", function(e) {resetPage(e)})
			
			for (j = 0; j < details.length; ++j) {
				details[j].classList.remove('hidden');
			}
			hikeItemList[i].classList.remove('hidden');

		} else {
			hikeItemList[i].classList.add('hidden');
		}
	}
/* 	
	for (var k = 0; k < hikeItemList.length; k++) {
		hikeItemList[k]
	}
 */
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





