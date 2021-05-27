


function createListItem() {
	var cardinal = document.getElementById("cardinal");
	var clone = cardinal.cloneNode(true);
	clone.removeAttribute("id");
	clone.style.display = "flex";
	document.getElementById("list").appendChild(clone);
	updateCount();
}

function removeListItem(e) {
	e.target.parentNode.parentNode.remove();
	updateCount();
	
}

function saveList() {
	
}

function updateCount(amt) {
	updateFilter();
	var total = getListItems().length - getChecked().length;
	document.getElementById("taskCounter").innerHTML = `${total} Tasks Left`;
}


function getChecked() {
	
	var a = document.querySelectorAll('input[type="checkbox"]:checked')
	var b = []
	for (i = 0; i < a.length; i++) {
		// not functional for unknown reasons   
		// a[i] = a[i].parentNode;
		
		b.push(a[i].parentNode);
		
	}
	return b;
}

function getUnchecked() {
	
	var checked = document.querySelectorAll('input[type="checkbox"]:checked')
	var list = document.querySelectorAll('input[type="checkbox"]:not(:checked)')
	var b = []
	for (i = 0; i < list.length; i++) {
		b.push(list[i].parentNode);
	}
	return b;
	
}

function getListItems() {
	return document.querySelectorAll('.listItem:not(#cardinal)');	
}

function showUnchecked() {
	showAll();
	var checked = getChecked();
	
	// hide all checked
	for (i = 0; i < checked.length; i++) {
		checked[i].style.display = "none";
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
		unChecked[i].style.display = "none";
	}
	
	document.querySelector('#filter div:nth-child(1)').style.border = "none"
	document.querySelector('#filter div:nth-child(2)').style.border = "none"
	document.querySelector('#filter div:nth-child(3)').style.border = "1px solid"
	
}

function showAll() {
	var listItems = getListItems();
	for (i = 0; i < listItems.length; i++) {
		listItems[i].style.display = "flex";
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

