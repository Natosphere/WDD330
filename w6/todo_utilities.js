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

// create a listItem that contains data
function createFilledItem(content, checked) {
	var cardinal = document.getElementById("cardinal");
	var clone = cardinal.cloneNode(true);
	clone.removeAttribute("id");
	clone.style.display = "block";
	clone.firstElementChild.children[2].value = content;
	clone.firstElementChild.children[0].checked = checked;

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

// show only unchecked listItems
function showUnchecked() {
	showAll();
	var checked = getChecked();
	
	// hide all checked
	for (i = 0; i < checked.length; i++) {
		checked[i].classList.add("hiddenItem");
	}
	
	// shows that the specified filter is active
	document.querySelector('#filter div:nth-child(1)').style.border = "none"
	document.querySelector('#filter div:nth-child(2)').style.border = "1px solid"
	document.querySelector('#filter div:nth-child(3)').style.border = "none"
}

// show only checked listItems
function  showChecked() {
	showAll();
	var unChecked = getUnchecked();
	
	// hide all unchecked	
	for (i = 0; i < unChecked.length; i++) {
		unChecked[i].classList.add("hiddenItem");
	}
	
	// shows that the specified filter is active
	document.querySelector('#filter div:nth-child(1)').style.border = "none"
	document.querySelector('#filter div:nth-child(2)').style.border = "none"
	document.querySelector('#filter div:nth-child(3)').style.border = "1px solid"
	
}

// show all listItems
function showAll() {
	var listItems = getListItems();
	for (i = 0; i < listItems.length; i++) {
		listItems[i].classList.remove('hiddenItem');
	}
	
	// shows that the specified filter is active
	document.querySelector('#filter div:nth-child(1)').style.border = "1px solid"
	document.querySelector('#filter div:nth-child(2)').style.border = "none"
	document.querySelector('#filter div:nth-child(3)').style.border = "none"
}

// reapplies the active filter
function updateFilter() {
	if (document.querySelector('#filter div:nth-child(1)').style.border == "1px solid") {
		showAll();
	} else if (document.querySelector('#filter div:nth-child(2)').style.border == "1px solid") {
		showUnchecked();
	} else if (document.querySelector('#filter div:nth-child(3)').style.border == "1px solid") {
		showChecked();
	}
}

// toggles the visibility of the save/load menu
function toggleMenu() {
	document.getElementById('menu').classList.toggle("hiddenItem");
	
	if (!document.getElementById('menu').classList.contains("hiddenItem")) {
		document.getElementById('menuButton').style.transform = "rotate(-90deg)";
	} else {
		document.getElementById('menuButton').style.transform = "";
	}
}

// update the visible counter of unchecked listItems
function updateCount(amt) {
	//updateFilter();
	var total = getListItems().length - getChecked().length;
	document.getElementById("taskCounter").innerHTML = `${total} Tasks Left`;
}

// returns all checked listItemContainers
function getChecked() {
	var a = document.querySelectorAll('input[type="checkbox"]:checked')
	var b = []
	for (i = 0; i < a.length; i++) {
		b.push(a[i].parentNode.parentNode);
	}
	return b;
}

// returns all unchecked listItemContainers
function getUnchecked() {
	var checked = document.querySelectorAll('input[type="checkbox"]:checked')
	var list = document.querySelectorAll('input[type="checkbox"]:not(:checked)')
	var b = []
	for (i = 0; i < list.length; i++) {
		b.push(list[i].parentNode.parentNode);
	}
	return b;
}

// returns all listItemContainers
function getListItems() {
	return document.querySelectorAll('.listItemContainer:not(#cardinal)');	
}