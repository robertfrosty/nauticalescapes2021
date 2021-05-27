function hamburganim(x) {
	x.classList.toggle("change");
	x.parentElement.parentElement.classList.toggle("chngclr");

	document.getElementsByClassName("anc_cont")[0].classList.toggle("nonactive");
}
