// save the current data to specified list
function saveList() {
	var listName = document.getElementById("menu").firstElementChild.value;
	
	localStorage[listName] = JSON.stringify(getData());
	findLists();
	
	document.querySelector('#menu input').placeholder = document.querySelector('#menu input').value;	
	document.querySelector('#menu input').value = '';
}

//load the specified list
function loadList() {
	var listName = document.getElementById("menu").firstElementChild.value;
	
	// error handle invalid listName
	try {
		var stored_data = JSON.parse(localStorage[listName]);
		removeAllListItems();
	
		for (d = 0; d < stored_data.length; d++) {
			var content = stored_data[d][1];
			var completed = stored_data[d][2];
			createFilledItem(content, completed);
		}
		document.querySelector('#menu input').placeholder = document.querySelector('#menu input').value;	
		document.querySelector('#menu input').value = '';
		showAll();
	} catch(SyntaxError) {
		alert('No list was found with that name. Select a valid list.')
	}

}

// delete the specified list
function deleteList() {
	var listName = document.getElementById("menu").firstElementChild.value;
	localStorage.removeItem(listName);
	findLists();
	
	document.querySelector('#menu input').placeholder = 'Choose or create list name';	
	document.querySelector('#menu input').value = '';
	removeAllListItems();
}

// retrieve the data of the items currently displayed
function getData() {
	var list = getListItems();
	var totalData = [];
	
	for (i = 0; i < list.length; i++) {
		var id = Date.now();
		var content = list[i].firstElementChild.children[2].value;
		var completed = list[i].firstElementChild.children[0].checked;
		
		var data = [id, content, completed];
		totalData.push(data);
	}
	return totalData;	
}

// look through localStorage and create options for then in the datalist dropdown
function findLists() {
	storedLists = Object.keys(localStorage)
	listDropdown = document.getElementById('lists')
	var count = listDropdown.childElementCount;
	
	for (i = 0; i < count; i++) {
		listDropdown.children[0].remove();
	}
	
	for (h = 0; h < storedLists.length; h++) {
		el = document.createElement('option')
		el.value = storedLists[h];
		listDropdown.appendChild(el);
	}
}