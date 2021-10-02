function nextBook(e) {
	if (parseInt(e) + 1 > 2) {
		var checkf = checkFields();
		if (checkf['ret']) {
			textReplace();
		}
		else {
			alert(`Please fill out the following fields : \n${checkf['issues'].map(checkff => `-${checkff}\n`).join("")}`);
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
	var nlret = {'ret':true, 'issues':[]};
	for (i=0; i < nl.length; i++) {
		if (nl[i].value == "") {
			nlret['issues'].push(nl[i].id);
		}
	}
	if(nlret['issues'].length < 1) {
		return nlret;
	} else {
		nlret['ret'] = false;
		return nlret;
	}
}

function textReplace() {
	var book = document.getElementsByClassName("confirm_book")[0];

	book.children[1].innerHTML += document.getElementsByClassName("content")[0].getElementsByClassName("select_selected")[0].innerText.split(/1|2|3|4/)[0];
	book.children[2].innerHTML += document.getElementById("date").value;
	book.children[3].innerHTML += document.getElementById("occupants").value;
	book.children[4].innerHTML += document.getElementById("ammenities").value;

	var contact = document.getElementsByClassName("confirm_contact")[0];

	contact.children[1].innerHTML += document.getElementById("name").value;
	contact.children[2].innerHTML += document.getElementById("mobile").value;
	contact.children[3].innerHTML += document.getElementById("email").value;
	contact.children[4].innerHTML += document.getElementById("descr").value;
}
