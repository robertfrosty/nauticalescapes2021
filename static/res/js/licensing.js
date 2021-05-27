function swap(e) {
	document.getElementsByClassName("active")[0].setAttribute("class", "lic_display nonactive");
	document.getElementById(e.children[0].innerHTML).setAttribute("class", "lic_display active");
	document.getElementsByClassName("licact")[0].classList.remove("licact");
	e.classList.add("licact");
}
