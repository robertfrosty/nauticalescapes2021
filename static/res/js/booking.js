function nextBook(e) {
	console.log(e);
	if (parseInt(e) + 1 > 2) {
		console.log(checkFields());
		if (checkFields()) {
			textReplace();
		}
		else {
			return;
		}
	}
	document.getElementById(e).classList.add("nonactive");
	document.getElementById(parseInt(e) + 1).classList.remove("nonactive");
}

function backBook(e) {
	document.getElementById(e).classList.add("nonactive");
	document.getElementById(parseInt(e) - 1).classList.remove("nonactive");
}

function checkFields() {
	var nl = document.getElementsByClassName("content")[0].getElementsByTagName('input');
	for (i=0; i < nl.length; i++) {
		console.log(nl[i].value);
		if (nl[i].value == "") {
			return false;
		}
	}
	return true;
}

function textReplace() {
	var book = document.getElementsByClassName("confirm_book")[0];

	book.children[1].innerHTML = document.getElementById("date").value;
	book.children[2].innerHTML = document.getElementById("date").value;
	book.children[3].innerHTML = document.getElementById("occupants").value;
	book.children[4].innerHTML = document.getElementById("ammenities").value;

	var contact = document.getElementsByClassName("confirm_contact")[0];

	contact.children[1].innerHTML = document.getElementById("name").value;
	contact.children[2].innerHTML = document.getElementById("mobile").value;
	contact.children[3].innerHTML = document.getElementById("email").value;
	contact.children[4].innerHTML = document.getElementById("descr").value;
}
