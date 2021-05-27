function swap(e) {
	document.getElementsByClassName("active")[0].setAttribute("class", "img_cont_display nonactive");
	document.getElementById(e.children[0].innerHTML).setAttribute("class", "img_cont_display active");
	document.getElementsByClassName("socact")[0].classList.remove("socact");
	e.classList.add("socact");
}
