const rootUrl = 'https://pokeapi.co/api/v2/';
var massPokeDetails = [];

async function displayGenerations() {
	var data = await apiCall("https://pokeapi.co/api/v2/generation");
	var generationsList = data["results"];
	var genEl = document.getElementById('generations')
	
	
	for (i = 0; i < generationsList.length; i++) {
		var newButton = document.createElement('button')
		var newUrl = rootUrl + "generation/" + (i + 1);
		newButton.setAttribute('onclick', `displayPokeList('${newUrl}')`)
		newButton.innerHTML = 'Generation' + (i + 1);
		genEl.appendChild(newButton)
	}
	
	displayPage(genEl);
	
}

function displayTypes() {
	
}

async function displayPokeList(url) {
	var data = await apiCall(url);
	pokeListData = data['pokemon_species']
	console.log(pokeListData);
}

function displayPokeDetail() {
	
}



function clearAll() {
	
}

function clearCurrent() {
	var current = document.querySelector('.current');
	current.classList.remove('current');
	current.classList.add('hidden');
}

function displayPage(page) {
	clearCurrent();
	page.classList.add('current');
	page.classList.remove('hidden');
}

async function apiCall(url) {
	let response = await fetch(url)
	return await response.json();
}