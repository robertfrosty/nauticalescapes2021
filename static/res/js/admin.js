var count = 0;
function loadCreate(e) {
	var name = "file" + count.toString(10);
	var elmnt = document.createElement("INPUT");
	elmnt.setAttribute("type", "file");
	elmnt.setAttribute("class", "nonactive");
	elmnt.setAttribute("name", name);
	elmnt.addEventListener("change", function(event) {
		document.getElementById(name).src = window.URL.createObjectURL(event.target.files[0]);
	});
	e.parentElement.append(elmnt);
	var elmnt2 = document.createElement("IMG");
	elmnt2.setAttribute("id", name);
	e.parentElement.prepend(elmnt2);
	elmnt.click();
	count++;
	document.getElementsByClassName("form_title")[0].setAttribute("class", "nonactive");
}
