
document.addEventListener("DOMContentLoaded", function(){
    
	findLists();
	


	
});


function createListItem(e) {
	e.stopPropagation();
	var cardinal = document.getElementById("cardinal");
	var clone = cardinal.cloneNode(true);
	clone.removeAttribute("id");
	clone.style.display = "block";
	document.getElementById("itemList").appendChild(clone);
	
	if (document.querySelector('#filter div:nth-child(3)').style.border != "1px solid") {
		window.setTimeout(function() {clone.classList.remove('hiddenItem')}, 1);
	}
	updateCount();
}

function createFilledItem(content, checked) {
	var cardinal = document.getElementById("cardinal");
	var clone = cardinal.cloneNode(true);
	clone.removeAttribute("id");
	clone.style.display = "block";
	clone.firstElementChild.children[2].value = content;
	clone.firstElementChild.children[0].checked = checked;
	
	if (checked) {
		//clone.firstElementChild.children[1].querySelector('svg').style.transform = "scale(1)";
	}
	
	document.getElementById("itemList").appendChild(clone);
	
	updateCount();
}

function removeListItem(e) {
	e.target.parentNode.parentNode.classList.add('deleteItem');
	
	setTimeout(() => {
		e.target.parentNode.parentNode.remove(); 
		updateCount();
		}, 200);
}

function removeAllListItems() {
	var list = getListItems();
	for (i = 0; i < list.length; i++) {
		list[i].remove();
	}
}


function toggleMenu() {
	document.getElementById('menu').classList.toggle("hiddenItem");
	
	if (!document.getElementById('menu').classList.contains("hiddenItem")) {
		document.getElementById('menuButton').style.transform = "rotate(-90deg)";
	} else {
		document.getElementById('menuButton').style.transform = "";
	}
}


function saveList() {
	var listName = document.getElementById("menu").firstElementChild.value;
	
	localStorage[listName] = JSON.stringify(getData());
	findLists();
	
	document.querySelector('#menu input').placeholder = document.querySelector('#menu input').value;	
	document.querySelector('#menu input').value = '';
}

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

function deleteList() {
	var listName = document.getElementById("menu").firstElementChild.value;
	localStorage.removeItem(listName);
	findLists();
	
	document.querySelector('#menu input').placeholder = 'Choose or create list name';	
	document.querySelector('#menu input').value = '';
	removeAllListItems();
}

function updateCount(amt) {
	//updateFilter();
	var total = getListItems().length - getChecked().length;
	document.getElementById("taskCounter").innerHTML = `${total} Tasks Left`;
}


function getChecked() {
	var a = document.querySelectorAll('input[type="checkbox"]:checked')
	var b = []
	for (i = 0; i < a.length; i++) {
		b.push(a[i].parentNode.parentNode);
	}
	return b;
}

function getUnchecked() {
	var checked = document.querySelectorAll('input[type="checkbox"]:checked')
	var list = document.querySelectorAll('input[type="checkbox"]:not(:checked)')
	var b = []
	for (i = 0; i < list.length; i++) {
		b.push(list[i].parentNode.parentNode);
	}
	return b;
	
}

function getListItems() {
	return document.querySelectorAll('.listItemContainer:not(#cardinal)');	
}

function showUnchecked() {
	showAll();
	var checked = getChecked();
	
	// hide all checked
	for (i = 0; i < checked.length; i++) {
		checked[i].classList.add("hiddenItem");
	}
	document.querySelector('#filter div:nth-child(1)').style.border = "none"
	document.querySelector('#filter div:nth-child(2)').style.border = "1px solid"
	document.querySelector('#filter div:nth-child(3)').style.border = "none"
}

function  showChecked() {
	showAll();
	var unChecked = getUnchecked();
	
	// hide all unchecked	
	for (i = 0; i < unChecked.length; i++) {
		unChecked[i].classList.add("hiddenItem");
	}
	
	document.querySelector('#filter div:nth-child(1)').style.border = "none"
	document.querySelector('#filter div:nth-child(2)').style.border = "none"
	document.querySelector('#filter div:nth-child(3)').style.border = "1px solid"
	
}

function showAll() {
	var listItems = getListItems();
	for (i = 0; i < listItems.length; i++) {
		listItems[i].classList.remove('hiddenItem');
	}
	document.querySelector('#filter div:nth-child(1)').style.border = "1px solid"
	document.querySelector('#filter div:nth-child(2)').style.border = "none"
	document.querySelector('#filter div:nth-child(3)').style.border = "none"
}

function updateFilter() {
	if (document.querySelector('#filter div:nth-child(1)').style.border == "1px solid") {
		showAll();
	} else if (document.querySelector('#filter div:nth-child(2)').style.border == "1px solid") {
		showUnchecked();
	} else if (document.querySelector('#filter div:nth-child(3)').style.border == "1px solid") {
		showChecked();
	}
	
}


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



