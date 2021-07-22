var apiKey = "AIzaSyBYe_NPDwfArQ7pdqDD0D-hXZkndmzIjjs";
var baseUrl = "https://www.googleapis.com/webfonts/v1/webfonts?key="

var data;
var page = 1;
var currentFont = 0;
var fontsLoaded = 0;
var fontsToLoad = 30;
var list = document.querySelector('#fontList');
var displayArea = document.querySelector('textarea');


window.onload = function() {
	getData();
	
	setTimeout(() => {constructFontList(); console.log(data);}, 300)
	
	list.addEventListener('scroll', (event) => {
		// console.log('loaded more')
		loadMore()
	}, {passive: true});
	
	let searchBox = document.querySelector('#search');
	searchBox.addEventListener('input', (event) => {
		searchChange()
	}, {passive: true});
	
}


async function getData() {
	console.log(baseUrl + apiKey)
	data = await getJSON(baseUrl + apiKey);
}


function getJSON(url){
    return fetch(url)
        .then(function(response){
            if (!response.ok) {
                throw Error(response.statusText);
            } else {
                return response.json();
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}

function urlConstruct(array) {
	var fullUrl = 'baseUrl'
	
	for(i = 0; i < array.length; i++)  {
		fullUrl += '?' + array[i];
	}
	return fullUrl;
}

function constructFontList() {
	

	
	while (fontsLoaded <= fontsToLoad && currentFont < data['items'].length) {
		
		let query = document.querySelector('#search').value;
		
		if (query == '' || (contains(data['items'][currentFont], query))) {
						
			let fontName = data['items'][currentFont]['family'];
			let fontUrl = data['items'][currentFont]['files']['regular'];
			if (fontUrl == null) {
				// key of the first font file available
				let key = Object.keys(data['items'][162]['files'])[0];
				fontUrl = data['items'][currentFont]['files'][key];
			}
			let item =  createListItem(fontName, fontUrl);

			item.addEventListener('click', (event) => {
				displayArea.style.fontFamily = event.target.style.fontFamily;
			}, {passive: true});

			list.appendChild(item);
			currentFont++;
			fontsLoaded++;
		} else {
			currentFont++;
		}

	}

}

function searchChange() {
	document.querySelectorAll('.listItem').forEach(e => e.remove());
	fontsLoaded = 0;
	currentFont = 0;
	fontsToLoad = 30;
	constructFontList();
}


function loadMore() {
	
	// console.log(list.scrollHeight)
	if (list.scrollTop + list.offsetHeight == list.scrollHeight) {
        // Do load more content here!
	// console.log('loaded more')
	fontsToLoad += 10;
	constructFontList();
	}
}

function contains(dat, query) {
	let str = dat['family'].toLowerCase();
	
	return str.includes(query.toLowerCase())
}


function createListItem(fontName, url) {
	
	let item = document.createElement('div');
	item.innerHTML = fontName;
	item.classList.add('listItem');
	
	// // if the font has already been loaded, don't load it again
	// if (document.fonts.check(fontName)) {
		// item.style.fontFamily = fontName;
	// } else {
		fetch(url)
			.then(resp => resp.arrayBuffer())
			.then(font => {
					const fontFace = new FontFace(fontName, font);
					document.fonts.add(fontFace);
					item.style.fontFamily = fontName;
			})
	// }
	
	

	return item
}