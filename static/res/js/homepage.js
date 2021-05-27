function unhide(e) {
	e.nextElementSibling.classList.remove("hidden");

	e.removeEventListener("click", function() { unhide(this) });
	e.addEventListener("click", function() { hide(this) });
}

function hide(e) {
	e.nextElementSibling.classList.add("hidden");

	e.removeEventListener("click", function() { hide(this) });
	e.addEventListener("click", function() { unhide(this) });
}
